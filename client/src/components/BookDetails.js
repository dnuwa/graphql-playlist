import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = (props) => {
  const { data, loading } = useQuery(getBookQuery, {
    variables: { id: props.bookId.bookId },
  });

//   console.log(`this is what is happemning ${data}`);

  if (loading && !data) {
    return <div id="book-details">Loading Book details...</div>;
  }

  if (data.book) {
    console.log(data.book.name);
    return (
      <div id="book-details">
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All books by this author</p>
        <ul className="other-books">
            {
                data.book.author.books.map(item =>{
                return <li key={item.id}>{item.name}</li>
                })
            }
        </ul>
      </div>
    );
  }

  return (
    <div id="book-details">
      <div>No book selected ...</div>
    </div>
  );
};

export default BookDetails;
