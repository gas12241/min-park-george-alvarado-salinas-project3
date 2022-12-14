const express = require("express");
const PokemonRoute = require("./api/pokemon");
const OwnerRoute = require("./api/owner");
const HelperFunctions = require("./helper");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const obj = {
  banana: "yellow",
  apple: "red",
};

// const banana = obj.banana;
// const apple = obj.apple;
const { banana, apple } = obj;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pokemon", PokemonRoute);
app.use("/api/owner", OwnerRoute);

app.get("/api/goodbye", (req, res) => {
  res.send("Goodbye, Web Dev");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let mongoEndpoint =
  "mongodb+srv://gas12241:Imawesome12241$@gcluster.fwv7u01.mongodb.net/?retryWrites=true&w=majority";
if (process.env.MONGO) {
  mongoEndpoint = process.env.MONGO;
}
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

app.listen(process.env.PORT || 8000, () => {
  console.log("Starting server...?");
});
