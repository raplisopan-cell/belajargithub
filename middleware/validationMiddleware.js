export function validateRegister(req, res, next) {

    const {
        username,
        name,
        email,
        password
    } = req.body;

    if (!username || !name || !email || !password) {
        return res.status(400).json({
            message: "Username, nama, email, dan password wajib diisi"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password minimal 6 karakter"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Format email tidak valid"
        });
    }

    next();
}