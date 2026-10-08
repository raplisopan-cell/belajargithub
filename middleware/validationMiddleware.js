export function validateRegister(req, res, next) {
    const {
        username,
        name,
        email,
        password
    } = req.body;

    if (!username || !name || !email || !password) {
        return res.status(400).json({
            message: "Username, name, email, dan password wajib diisi"
        });
    }

    if (username.length < 3) {
        return res.status(400).json({
            message: "Username minimal 3 karakter"
        });
    }

    if (name.length < 2) {
        return res.status(400).json({
            message: "Nama minimal 2 karakter"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Format email tidak valid"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password minimal 6 karakter"
        });
    }

    next();
}