import argon2 from "argon2";
import { db } from "../config/db.js";
import { sessionsTable, usersTable } from "../drizzle/schema.js";
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

