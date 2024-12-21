import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve the token from cookies or the Authorization header
        const token = req.cookies.token 

        // Check if the token is present
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token not found",
            });
        }

        // Verify the token
        const verifyingUser = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token is valid and contains a user ID
        if (!verifyingUser || !verifyingUser.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        // Attach user ID to the request object for further use
        req.id = verifyingUser.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error.message);
        return res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: error.message,
        });
    }
};
