import express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import session from "express-session";
import "./controller/databaseConnection";
const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
  })
);

//Routes
import { router as root } from "./routes/root.route";
import { router as userRoute } from "./routes/user.route";
import { router as supplierRoute } from "./routes/supplier.route";
import { router as productRoute } from "./routes/product.route";
app.use("/", root);
app.use("/user", userRoute)
app.use("/supplier", supplierRoute);
app.use("/product", productRoute);

app.listen(PORT, () => {
  console.log(`Server running in localhost:${PORT}...`);
});
