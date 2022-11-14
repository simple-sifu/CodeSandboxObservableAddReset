import HttpGateway from "../Shared/HttpGateway.js";
import Observable from "../Shared/Observable.js";

class BooksRepository {
  httpGateway = null;
  programmersModel = null;
  apiUrl = "https://api.logicroom.co/api/tommy.han.cs@gmail.com/";

  constructor() {
    this.httpGateway = new HttpGateway();
    this.programmersModel = new Observable([]);
  }

  getBooks = async (callback) => {
    this.programmersModel.subscribe(callback);
    await this.loadApiData();
    this.programmersModel.notify();
  };

  addBook = async (requestBodyDto) => {
    const response = await this.httpGateway.post(
      this.apiUrl + "books",
      requestBodyDto
    );
    if (response.success) {
      this.loadApiData();
      this.programmersModel.notify();
    } else {
      console.log("BooksRepository.addBook failed !!!");
    }
  };

  reset = async () => {
    const response = await this.httpGateway.reset(this.apiUrl + "reset");
    if (response.success) {
      await this.loadApiData();
      this.programmersModel.notify();
    } else {
      console.log("BooksRepository reset failed !!!");
    }
  };

  loadApiData = async () => {
    const booksDto = await this.httpGateway.get(this.apiUrl + "books");
    this.programmersModel.value = booksDto.result.map((bookDto) => {
      return bookDto;
    });
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
