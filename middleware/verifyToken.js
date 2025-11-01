import jwt from 'jsonwebtoken';

let verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({ status: false, message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ status: false, message: "Invalid or expired token" });
        }

        req.user = decoded; // attach user data to request
        next();
    });
}
export default verifyToken;