import {
  getAllBooks,
  getAllAuthors,
  getAvailableBooks
} from "./services/bookService.js";

import {
  getAllLoans,
  createLoan,
  returnBook
} from "./services/loanService.js";

import {
  formatBooks,
  formatLoans
} from "./utils/reportFormatter.js";

async function main() {
  try {
    console.log("=================================");
    console.log("   SISTEM PERPUSTAKAAN MODERN");
    console.log("=================================");

    // ==============================
    // 1. Menampilkan semua buku
    // ==============================

    const books = await getAllBooks();
    const authors = await getAllAuthors();

    console.log(formatBooks(books, authors));

    // ==============================
    // 2. Menampilkan buku tersedia
    // ==============================

    const availableBooks = await getAvailableBooks();

    console.log("======= BUKU TERSEDIA =======");

    availableBooks.forEach((book) => {
      console.log(
        `- ${book.title} | Stok: ${book.stock}`
      );
    });

    console.log("==============================");

    // ==============================
    // 3. Menampilkan peminjaman
    // ==============================

    const loans = await getAllLoans();

    console.log(formatLoans(loans, books));

    // ==============================
    // 4. Contoh peminjaman
    // ==============================

    console.log("\nMembuat contoh peminjaman...");

    const newLoan = await createLoan({
      bookId: 1,
      borrower: "Rapli",
      date: new Date().toISOString().split("T")[0]
    });

    console.log("Peminjaman berhasil:");
    console.log(newLoan);

    // ==============================
    // 5. Menampilkan data terbaru
    // ==============================

    const updatedBooks = await getAllBooks();
    const updatedLoans = await getAllLoans();

    console.log(formatBooks(updatedBooks, authors));
    console.log(formatLoans(updatedLoans, updatedBooks));

  } catch (error) {
    console.error("\n❌ TERJADI ERROR");
    console.error(error.message);
  }
}

main();