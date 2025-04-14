import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { refreshTokens, verifyJWTToken } from "../services/auth.services.js";

export const protectedRoute = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    req.user = null;

    try {
        if (!accessToken && !refreshToken) {
            return res.status(401).json({ success: false, error: 'Not logged in!' });
        }

        if (accessToken) {
            try {
                const decodedToken = verifyJWTToken(accessToken);
                req.user = decodedToken;
                return next();
            } catch (error) {
                // If the error is related to token expiration, we will handle it below
                if (error.message === 'jwt expired') {
                    console.log('jwt access_token expired proceding with refresh token');
                } else {
                    // For other errors, we can return a 401 Unauthorized
                    return res.status(401).json({ success: false, error: error.message });
                }
            }
        }

        // If we reach here, it means the access token is expired but we have a refresh token
        if (refreshToken) {
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
