import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import db from "./configs/dbconfig.js";
import router from "./routes/authRoutes.js";

//dotenv config
dotenv.config();

// rest object
const app = express();

// port
let port = process.env.PORT || 8080;

//database connection

// db.connect((err) => {
//   if (err) {
//     console.error(`error connecting: ${err.stack}`.bgMagenta.bold);
//     return;
//   }

//   console.log(`connected as id ${db.threadId}`.bgCyan.bold);
// });

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/v1/auth", router);

app.get("/", (req, res) => {
  db.query(
    "SELECT * FROM tab where user_name='Abhi'",
    function (error, results) {
      // error will be an Error if one occurred during the query
      if (error) {
        console.log(error);
        res.json(error);
      }

      // results will contain the results of the query
      if (results) {
        console.log(results);
        res.json(results);
      }
      // if (fields) {
      //   console.log(fields);
      //   res.json(fields);
      // }

      // fields will contain information about the returned results fields (if any)
    }
  );
});

app.post("/", (req, res) => {
  db.query(
    "insert into `tab` values ('Ak', 2001104069, 25)",
    function (error, results, fields) {
      // error will be an Error if one occurred during the query
      if (error) {
        console.log(error);
        res.json(error);
      }

      // results will contain the results of the query
      if (results) {
        console.log(results);
        res.json(results);
      }

      // fields will contain information about the returned results fields (if any)
    }
  );
});

//listen
app.listen(port, () => {
  console.log(`server started on port ${port}`.bgGreen.bold);
});
