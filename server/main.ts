import * as express from "express";
import { join } from "path";

const app = express();
const port = process.env.PORT || 8080;

app.use("/", express.static(join(__dirname, "../rollup-demo")));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
