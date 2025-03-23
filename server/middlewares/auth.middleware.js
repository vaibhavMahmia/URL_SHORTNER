import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { refreshTokens, verifyJWTToken } from "../services/auth.services.js";

export const protectedRoute = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    req.user = null;

    try {
        if (!accessToken && !refreshToken)
            return res.status(500).json({ success: false, error: 'Not loggedin !' });

        if (accessToken) {
            const decodedToken = verifyJWTToken(accessToken);

            if (decodedToken) {
                req.user = decodedToken;
                return next();
            }

            const { newAccessToken, newRefreshToken, user } = await refreshTokens(refreshToken);
            req.user = user;

            const baseConfig = { httpOnly: true, secure: true };

            res.cookie("access_token", newAccessToken, {
                ...baseConfig,
                maxAge: ACCESS_TOKEN_EXPIRY,
            });

            res.cookie("refresh_token", newRefreshToken, {
                ...baseConfig,
                maxAge: REFRESH_TOKEN_EXPIRY,
            });

            return next();
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}