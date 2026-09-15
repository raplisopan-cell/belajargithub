export function formatBooks(books, authors) {
  if (books.length === 0) {
    return "Tidak ada data buku.";
  }

  let output = "";

  output += "\n========== DAFTAR BUKU ==========\n";

  books.forEach((book, index) => {
    const author = authors.find(
      (item) => item.id === book.authorId
    );

    output += `
${index + 1}. ${book.title}
   ID       : ${book.id}
   Penulis  : ${author ? author.name : "Tidak diketahui"}
   Tahun    : ${book.year}
   Stok     : ${book.stock}
`;
  });

  output += "=================================\n";

  return output;
}

export function formatLoans(loans, books) {
  if (loans.length === 0) {
    return "Belum ada data peminjaman.";
  }

  let output = "";

  output += "\n======= DATA PEMINJAMAN =======\n";

  loans.forEach((loan, index) => {
    const book = books.find(
      (item) => item.id === loan.bookId
    );

    output += `
${index + 1}. ${book ? book.title : "Buku tidak ditemukan"}
   Peminjam : ${loan.borrower}
   Tanggal  : ${loan.date}
   Status   : ${loan.returned ? "Dikembalikan" : "Dipinjam"}
`;
  });

  output += "===============================\n";

  return output;
}