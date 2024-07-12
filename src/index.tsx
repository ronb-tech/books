import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { BookList } from "./components/BookList/BookList";
import { BookListController } from "./components/BookList/BookList.ctrl";
import { BookListModel } from "./components/BookList/BookList.model";

import "./styles.css";

const model = new BookListModel();
const userName:string="ron";
const controller = new BookListController(model,userName);

const App: React.FC = observer(() => {
  return (
    <div className="container">
      <BookList controller={controller} user={userName} />
    </div>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
