import { makeAutoObservable } from "mobx";

export class BookListModel {
    books: Book[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setBooks(books: Book[]) {
        this.books = books;
    }
}


export type Book = {
    id: number;
    name: string;
    author: string;
};