import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Server Express berhasil jalan!");
});

const me = [
    {
        id: 1,
        nama: "Rapli Sopan",
        kelas: "XI RPL",
        umur: 17
    }
];
app.get("/me", (req, res) => {
    res.json(me);
});

// Route semua buku dari Supabase
app.get("/books", async (req, res) => {
    const { data, error } = await supabase
        .from("books")
        .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        return res.status(500).json({
            message: "Gagal mengambil data buku",
            error: error.message
        });
    }

    res.json(data);
});

app.get("/books/:id", async (req, res) => {
    const id = req.params.id;

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return res.status(404).json({
            message: "Buku tidak ditemukan"
        });
    }

    res.json(data);
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});