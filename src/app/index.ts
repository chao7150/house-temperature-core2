import express from "express";
import { insert } from "./middlewares/post";
import { select } from "./middlewares/get";

const app = express();

app.use(express.urlencoded());

app.get("/status", (req, res) => res.send("Hello, World!"));
app.post("/api/temperature/:year/:month/:date", insert);
app.get("/api/temperature/:year/:month/:date", select);

app.listen(3000, () => console.log("Example app listening on port 3000"));
