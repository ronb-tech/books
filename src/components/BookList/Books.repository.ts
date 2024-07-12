import ApiGateway from "../../Shared/ApiGateway";
import { Book } from "./BookList.model";

class BooksRepository {
  httpGateway: ApiGateway;

  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (user: string): Promise<Book[]> => {
    const { data, error } = await this.httpGateway.get<Book[]>(`/v1/books/${user}`);
    if (error) {
      console.error("Failed to fetch books:", error);
      return [];
    }
    return data || [];
  };

  addBook = async (user: string, { name, author }: { name: string; author: string }): Promise<boolean> => {
    const { data, error } = await this.httpGateway.post(`/v1/books/${user}`, { name, author });
    if (error) {
      console.error("Failed to add book:", error);
      return false;
    }
    return data ? true : false;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
