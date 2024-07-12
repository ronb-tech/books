import React from "react";
import { observer } from "mobx-react-lite";
import { BookListController } from "./BookList.ctrl";

interface BookListHeaderProps {
  controller: BookListController;
}

export const BookListHeader: React.FC<BookListHeaderProps> = observer(({ controller }) => {
  return (
    <header className="sticky-header">
    <h1>Books List</h1>
    <p>Your books: {controller.filteredBooks.length}</p>
    <div className="radio-group">
    <label>
      <input
        type="radio"
        value="all"
        checked={controller.isPrivate}
        onChange={() => controller.toggleShowAllBooks(true)}
      />
      All Books
    </label>
    <label>
      <input
        type="radio"
        value="private"
        checked={!controller.isPrivate}
        onChange={() => controller.toggleShowAllBooks(false)}
      />
      Private Books
    </label>
  </div>
  </header>
  );
});
