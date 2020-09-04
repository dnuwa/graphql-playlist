import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

//components
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook"

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1> Ninja's Reading list</h1>
        <BooksList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
