import { authenticateUser, createUser, getUserByEmail, hashPassword } from "../services/auth.services.js";
import { registerUserSchema } from "../validators/auth-validator.js";

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
        console.log('catch')
        return res.status(500).json({ success: false, error: error.message });
    }
}


export const login = async (req, res) => {
    return res.status(200).json({ msg: 'signup' });
}

export const logout = async (req, res) => {
    return res.status(200).json({ msg: 'signup' });
}