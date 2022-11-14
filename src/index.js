import React, { useState } from "react";
import ReactDOM from "react-dom";
import BooksPresenter from "./Books/BooksPresenter.js";

import "./styles.css";

function App() {
  const booksPresenter = new BooksPresenter();
  const [vm, copyViewModelToStateViewModel] = useState([]);

  React.useEffect(() => {
    async function load() {
      await booksPresenter.load((generatedViewModel) => {
        copyViewModelToStateViewModel(generatedViewModel);
      });
    }
    load();
  }, []);

  return (
    <div>
      {vm.map((bookVm, i) => {
        return <div key={i}>{bookVm.name}</div>;
      })}
      <button
        onClick={() => {
          new BooksPresenter().addBook({
            name: "BFTDD",
            author: "Peter Heard"
          });
        }}
      >
        add books
      </button>
      <button
        onClick={() => {
          new BooksPresenter().reset();
        }}
      >
        reset books
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
