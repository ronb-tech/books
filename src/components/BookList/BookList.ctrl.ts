import { makeAutoObservable, runInAction } from "mobx";
import { BookListModel, Book } from "./BookList.model";
import booksRepository from "./Books.repository";

export class BookListController {
    model: BookListModel;
    user: string;
    newBookName: string = "";
    newBookAuthor: string = "";
    isPrivate: boolean = true;


    constructor(model: BookListModel, user: string) {
        this.model = model;
        this.user = user;
        makeAutoObservable(this);
    }

    async loadBooks() {
        const books = await booksRepository.getBooks(this.user);
        runInAction(() => {
            this.model.setBooks(books);
        });
    }

    setNewBookName(name: string) {
        this.newBookName = name;
    }

    setNewBookAuthor(author: string) {
        this.newBookAuthor = author;
    }

    toggleShowAllBooks(condition: boolean) {
        this.isPrivate = condition;
    }

    isAddButtonDisabled() {
        return !this.newBookName.trim() || !this.newBookAuthor.trim();
    }

    get filteredBooks() {
        return this.isPrivate
            ? this.model.books
            : this.model.books.filter(book => book.author.toLocaleLowerCase() === this.user.toLocaleLowerCase());
    }

    addBook = async () => {
        const newBook: Book = {
            id: this.model.books.length + 1,
            name: this.newBookName,
            author: this.newBookAuthor,
        };
        const success = await booksRepository.addBook(this.user, newBook);
        if (success) {
            runInAction(() => {
                this.model.books.push(newBook);
                this.newBookName = "";
                this.newBookAuthor = "";
            });
        }
        return success;
    };
}
