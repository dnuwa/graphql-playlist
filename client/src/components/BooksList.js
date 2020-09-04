import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries"

//components
import BookDetails from "../components/BookDetails"


const BooksList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  const [bookId, setBookId] = useState("");

  if (loading) {
    return <div>Loading books...</div>;
  } else if (error) {
    return <div>Error...</div>;
  } else {
    return (
      <div>
        <ul id="book-list">
          {data.books.map((book) => (
            <li key={book.id} onClick={(e) =>setBookId({ bookId: book.id })}>{book.name}</li>
          ))}
        </ul>
        <BookDetails bookId={bookId} />
      </div>
    );
  }
};

export default BooksList;
