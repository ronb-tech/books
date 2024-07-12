import React from "react";
import { observer } from "mobx-react-lite";
import { BookListController } from "./BookList.ctrl";

interface BookListFormProps {
  controller: BookListController;
}

export const BookListForm: React.FC<BookListFormProps> = observer(({ controller }) => {
  const handleAddBook = async () => {
    const success = await controller.addBook();
    if (success) {
      alert("Book added successfully");
    }
  };

  return (
    <div className="add-book-form">
      <input
        type="text"
        value={controller.newBookName}
        onChange={(e) => controller.setNewBookName(e.target.value)}
        placeholder="New Book Name"
      />
      <input
        type="text"
        value={controller.newBookAuthor}
        onChange={(e) => controller.setNewBookAuthor(e.target.value)}
        placeholder="New Book Author"
      />
      <button className="add-button" onClick={handleAddBook} disabled={controller.isAddButtonDisabled()}>
        Add
      </button>
    </div>
  );
});
