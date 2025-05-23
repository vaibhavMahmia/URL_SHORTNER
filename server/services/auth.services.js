import argon2 from "argon2";
import { db } from "../config/db.js";
import { sessionsTable, shortLinksTable, usersTable } from "../drizzle/schema.js";
import { ACCESS_TOKEN_EXPIRY, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const getUserByEmail = async (email) => {
    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

    return user;
};

export const hashPassword = async (password) => await argon2.hash(password);

export const comparePassword = async (password, hash) => await argon2.verify(hash, password);


export const createUser = async ({ name, email, password }) => {
    return await db
        .insert(usersTable)
        .values({ name, email, password })
        .$returningId();
};

export const createSession = async (userId, { ip, userAgent }) => {
    const [session] = await db
        .insert(sessionsTable)
        .values({ userId, ip, userAgent })
        .$returningId();

    return session;
};

export const findSessionById = async (sessionId) => {
    const [session] = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.id, sessionId));

    return session;
};

export const clearUserSession = async (sessionId) => await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
//findUserById
export const findUserById = async (userId) => {
    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));

    return user;
};

export const createAccessToken = ({ id, name, email, sessionId }) => {
    return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //   expiresIn: "15m",
    });
};

export const createRefreshToken = (sessionId) => {
    return jwt.sign({ sessionId }, process.env.JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //   expiresIn: "1w",
    });
};

export const verifyJWTToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

export const refreshTokens = async (refreshToken) => {
    try {
        const decodedToken = verifyJWTToken(refreshToken);
        const currentSession = await findSessionById(decodedToken.sessionId);

        if (!currentSession || !currentSession.valid) {
            throw new Error("Invalid session");
        }

        const user = await findUserById(currentSession.userId);

        if (!user) throw new Error("Invalid User");

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            isEmailValid: user.isEmailValid,
            sessionId: currentSession.id,
        };

        const newAccessToken = createAccessToken(userInfo);
        const newRefreshToken = createRefreshToken(currentSession.id);

        return {
            newAccessToken,
            newRefreshToken,
            user: userInfo,
        };
    } catch (error) {
        console.log(error);
    }
};

export const authenticateUser = async ({ req, res, user, name, email }) => {
    // we need to create a sessions
    const session = await createSession(user.id, {
        ip: req.clientIp,
        userAgent: req.headers["user-agent"],
    });

    const accessToken = createAccessToken({
        id: user.id,
        name: user.name || name,
        email: user.email || email,
        isEmailValid: false,
        sessionId: session.id,
    });

    const refreshToken = createRefreshToken(session.id);

    const baseConfig = { httpOnly: true, secure: true };

    res.cookie("access_token", accessToken, {
        ...baseConfig,
        maxAge: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie("refresh_token", refreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY,
    });
};

export const getAllShortLinks = async (userId) => {
    return await db
        .select()
        .from(shortLinksTable)
        .where(eq(shortLinksTable.userId, userId));
};

export const updateUserByName = async ({ userId, name }) => await db.update(usersTable).set({ name: name }).where(eq(usersTable.id, userId));

export const updateUserPassword = async ({ userId, newPassword }) => {
    const newHashPassword = await hashPassword(newPassword);

    return await db
        .update(usersTable)
        .set({ password: newHashPassword })
        .where(eq(usersTable.id, userId));
};
