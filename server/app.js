const express = require("express");
const { graphqlHTTP } = require("express-graphql");
// console.log(typeof(graphqlHTTP))
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');

const schema = require("./schema/schema");

const app = express();

//allow cross-origin requests
app.use(cors());
app.use(morgan('combined'));

const uri =
  "mongodb+srv://dnuwa:@Microsoft%231@cluster0.czpl5.mongodb.net/graphql-playlist?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log(`listening on PORT 4000`);
});
