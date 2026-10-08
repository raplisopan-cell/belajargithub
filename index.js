import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import verifyToken from "./middleware/authMiddleware.js";
import { validateRegister } from "./middleware/validationMiddleware.js";

dotenv.config();

const app = express();
const port = 3000;


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);


app.use(express.json());

app.use(express.static("public"));


function createSlug(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
}


app.get("/", (req, res) => {
    res.sendFile("landing.html", {
        root: "public"
    });
});


const me = [
    {
        id: 1,
        nama: "Rapli Sopan",
        kelas: "XI RPL",
        umur: 17
    }
];

app.get("/me-lama", (req, res) => {
    res.json(me);
});


app.get("/books", async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("books")
            .select("*");

        if (error) {
            console.error("ERROR BOOKS:", error);

            return res.status(500).json({
                message: "Gagal mengambil data buku",
                error: error.message
            });
        }

        res.json(data);

    } catch (error) {

        console.error("ERROR SERVER BOOKS:", error);

        res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
});



app.get("/books/:slug", async (req, res) => {
    try {

        const slug = req.params.slug;

        const { data, error } = await supabase
            .from("books")
            .select("*");

        if (error) {
            console.error("ERROR DETAIL BOOK:", error);

            return res.status(500).json({
                message: "Gagal mengambil data buku",
                error: error.message
            });
        }

        const book = data.find((item) => {

            // Kalau kolom database bernama title
            if (item.title) {
                return createSlug(item.title) === slug;
            }

            return false;
        });

        if (!book) {
            return res.status(404).json({
                message: "Buku tidak ditemukan"
            });
        }

        res.json({
            message: "Detail buku",
            data: book
        });

    } catch (error) {

        console.error("ERROR DETAIL BOOK:", error);

        res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
});


app.get("/authors", async (req, res) => {

    console.log("ROUTE /authors DIPANGGIL");

    try {

        const { data, error } = await supabase
            .from("authors")
            .select("*");

        if (error) {

            console.error("ERROR AUTHORS:", error);

            return res.status(500).json({
                message: "Gagal mengambil data author",
                error: error.message
            });
        }

        res.json(data);

    } catch (error) {

        console.error("ERROR SERVER AUTHORS:", error);

        res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
});



app.get("/authors/:slug", async (req, res) => {

    try {

        const slug = req.params.slug;

        const { data, error } = await supabase
            .from("authors")
            .select("*");

        if (error) {

            console.error("ERROR DETAIL AUTHOR:", error);

            return res.status(500).json({
                message: "Gagal mengambil data author",
                error: error.message
            });
        }

        const author = data.find((item) => {

            if (item.name) {
                return createSlug(item.name) === slug;
            }

            return false;
        });

        if (!author) {

            return res.status(404).json({
                message: "Author tidak ditemukan"
            });
        }

        res.json({
            message: "Detail author",
            data: author
        });

    } catch (error) {

        console.error("ERROR DETAIL AUTHOR:", error);

        res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
});



app.post(
    "/register",
    validateRegister,
    async (req, res) => {

        try {

            const {
                username,
                name,
                email,
                password
            } = req.body;


            // CEK USERNAME

            const { data: usernameUser } = await supabase
                .from("users")
                .select("id")
                .eq("username", username)
                .maybeSingle();


            if (usernameUser) {

                return res.status(400).json({
                    message: "Username sudah digunakan"
                });
            }


       

            const { data: emailUser } = await supabase
                .from("users")
                .select("id")
                .eq("email", email)
                .maybeSingle();


            if (emailUser) {

                return res.status(400).json({
                    message: "Email sudah digunakan"
                });
            }




            const hashedPassword = await bcrypt.hash(
                password,
                10
            );


            const { data, error } = await supabase
                .from("users")
                .insert([
                    {
                        username: username,
                        name: name,
                        email: email,
                        password: hashedPassword
                    }
                ])
                .select(
                    "id, username, name, email, created_at"
                )
                .single();


            if (error) {

                console.error("ERROR REGISTER:", error);

                return res.status(400).json({
                    message: "Gagal membuat user",
                    error: error.message
                });
            }


            res.status(201).json({

                message: "Register berhasil",

                user: data

            });

        } catch (error) {

            console.error(
                "ERROR REGISTER SERVER:",
                error
            );

            res.status(500).json({
                message: "Terjadi kesalahan pada server"
            });
        }
    }
);



app.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        console.log("================================");
        console.log("LOGIN");
        console.log("EMAIL:", email);
        console.log("================================");


        
        if (!email || !password) {

            return res.status(400).json({
                message: "Email dan password wajib diisi"
            });
        }


        

        const {
            data: user,
            error
        } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();


        console.log(
            "USER DARI SUPABASE:",
            user
        );

        console.log(
            "ERROR SUPABASE:",
            error
        );


        if (error) {

            return res.status(500).json({
                message: "Gagal mengambil data user",
                error: error.message
            });
        }


        if (!user) {

            return res.status(401).json({
                message: "Email atau password salah"
            });
        }


        // CEK PASSWORD

        const passwordBenar = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordBenar) {

            return res.status(401).json({
                message: "Email atau password salah"
            });
        }


    

        const token = jwt.sign(

            {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }
        );


        console.log("JWT BERHASIL DIBUAT");


     

        res.json({

            message: "Login berhasil",

            token: token,

            user: {

                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        console.error("ERROR LOGIN:", error);

        res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
});


app.get(
    "/me",
    verifyToken,
    async (req, res) => {

        try {

            const {
                data: user,
                error
            } = await supabase
                .from("users")
                .select(
                    "id, username, name, email, created_at"
                )
                .eq("id", req.user.id)
                .maybeSingle();


            if (error) {

                return res.status(500).json({
                    message: "Gagal mengambil data user",
                    error: error.message
                });
            }


            if (!user) {

                return res.status(404).json({
                    message: "User tidak ditemukan"
                });
            }


            res.json({

                message:
                    "Berhasil mengakses data user",

                user: user

            });

        } catch (error) {

            console.error("ERROR /ME:", error);

            res.status(500).json({
                message: "Terjadi kesalahan pada server"
            });
        }
    }
);


app.get("/test-middleware", (req, res) => {

    res.json({
        message: "Middleware Express berhasil berjalan"
    });

});



app.listen(port, () => {

    console.log("================================");
    console.log(
        `Server berjalan di http://localhost:${port}`
    );
    console.log("================================");

});