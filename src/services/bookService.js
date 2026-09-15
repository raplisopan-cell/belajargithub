import { readJson } from "../repositories/jsonRepository.js";
import { BookNotFoundError } from "../utils/errors.js";

const booksPath = new URL("../../data/books.json", import.meta.url);
const authorsPath = new URL("../../data/authors.json", import.meta.url);

export async function getAllBooks() {
  return await readJson(booksPath);
}

export async function getAllAuthors() {
  return await readJson(authorsPath);
}

export async function getBookById(id) {
  const books = await getAllBooks();

  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    throw new BookNotFoundError();
  }

  return book;
}

export async function getAvailableBooks() {
  const books = await getAllBooks();

  return books.filter((book) => book.stock > 0);
}
