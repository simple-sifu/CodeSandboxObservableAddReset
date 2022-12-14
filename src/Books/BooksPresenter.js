import booksRepository from "./BooksRepository.js";

export default class BooksPresenter {
  load = async (callback) => {
    booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name };
      });
      callback(booksVm);
    });
  };

  addBook = async (requestBodyDto) => {
    booksRepository.addBook(requestBodyDto);
  };

  reset = async () => {
    booksRepository.reset();
  };
}
