import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

const AddBook = () => {
  const { loading, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name: Object.values(name)[0],
        genre: Object.values(genre)[0],
        authorId: Object.values(authorId)[0],
      },

      refetchQueries:[{query: getBooksQuery}]
    });
  };

  if (loading) {
    return <option disabled>Loading Authors...</option>;
  } else {
    return (
      <form id="add-book" onSubmit={submitForm}>
        <div className="field">
          <label>Book name</label>
          <input
            type="text"
            onChange={(e) => setName({ name: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            onChange={(e) => setGenre({ genre: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Author</label>
          <select onChange={(e) => setAuthorId({ authorId: e.target.value })}>
            <option>Select Author</option>
            {data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
};

export default AddBook;
