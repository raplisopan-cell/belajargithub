import express from "express";

const app = express();


const books = [
    {
        id: "b01",
        judul: "Laskar Pelangi",
        penulis: "Andrea Hirata"
    },
    {
        id: "b02",
        judul: "Bumi",
        penulis: "Tere Liye"
    },
    {
        id: "b03",
        judul: "Negeri 5 Menara",
        penulis: "Ahmad Fuadi"
    }
];


app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/:id", (req, res) => {
    const id = req.params.id;

    const book = books.find((item) => item.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Buku tidak ditemukan"
        });
    }

    res.json(book);
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});