import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token
    if (token == null) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorised, Please login!'
        }); // Unauthorized
    }
    const secretKey = process.env.JWT_SECRET_KEY || 'defaultSecretKey'
    console.log(secretKey)
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid token'
            }); // Forbidden
        }
        req.user = user;
        next();
    });
}

export default authenticateToken;