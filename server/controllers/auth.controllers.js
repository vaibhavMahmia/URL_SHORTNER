import { authenticateUser, clearUserSession, comparePassword, createUser, findUserById, getAllShortLinks, getUserByEmail, hashPassword } from "../services/auth.services.js";
import { loginUserSchema, registerUserSchema } from "../validators/auth-validator.js";

export const signup = async (req, res) => {
    try {
        const { data, error } = registerUserSchema.safeParse(req.body);

        if (error) {
            const errorMessage = error.errors[0].message;
            return res.status(500).json({ success: false, error: errorMessage });
        }

        const { name, email, password } = data;
        const userExists = await getUserByEmail(email);

        if (userExists)
            return res.status(500).json({ success: false, error: 'User already exists !' });
        const hashedPassword = await hashPassword(password);
        const [user] = await createUser({ name, email, password: hashedPassword });
        await authenticateUser({ req, res, user, name, email });

        return res.status(201).json({ success: true, user });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


export const login = async (req, res) => {
    try {
        const { data, error } = loginUserSchema.safeParse(req.body);

        if (error) {
            const errorMessage = error.errors[0].message;
            return res.status(500).json({ success: false, error: errorMessage });
        }

        const { email, password } = data;
        const user = await getUserByEmail(email);

        if (!user)
            return res.status(500).json({ success: false, error: 'Invalid email or password !' });

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid)
            return res.status(500).json({ success: false, error: 'Invalid email or password !' });

        await authenticateUser({ req, res, user });

        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);
        const userShortLinks = await getAllShortLinks(user.id);
        return res.status(200).json({ success: true, user, links: userShortLinks });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        await clearUserSession(req.user.sessionId);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return res.status(200).json({ success: true, message: 'Loggedout !'});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}