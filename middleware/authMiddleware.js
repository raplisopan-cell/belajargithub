import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token tidak ditemukan"
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Format token harus Bearer <token>"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token tidak ditemukan"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("JWT VALID:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.error("JWT ERROR:", error);

        return res.status(401).json({
            message: "Token tidak valid atau sudah expired"
        });
    }
}

export default verifyToken;