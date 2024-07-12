import React, { useEffect,useState } from "react";
import { observer } from "mobx-react-lite";
import { BookListController } from "./BookList.ctrl";
import { BookListForm } from "./BookListForm";
import {BookListHeader} from "./BookListHeader";
import "./BookList.css";

interface BookListProps {
  controller: BookListController;
  user: string;
}

export const BookList: React.FC<BookListProps> = observer(({ controller,user }) => {

  useEffect(() => {
    controller.loadBooks();
  }, [controller]);



  return (
    <div className="book-list">
     <BookListHeader controller={controller} />
      {controller.filteredBooks.length>0 ? (
        <div className="book-list-container">
          {controller.filteredBooks.map((book, i) => (
            <div key={i} className="book-item">
              <p><b>Author:</b> {book.author}</p>
              <p><b>Name:</b>{book.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-books">No books available</div>
      )}

    <BookListForm controller={controller} />

    </div>
  );
});
