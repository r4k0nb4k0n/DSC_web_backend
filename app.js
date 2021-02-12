// A node.js web framework.
import express from "express";
// A middleware module that handles HTTP POST request in Express.js v4 and above.
import bodyParser from "body-parser";
// A middleware module that logs.
import morgan from "morgan";
// The router object that handles all API.
import mainRouter from "./routes";
// A function that connects to MongoDB.
import connectMongo from "./config/mongoConnect";
// State of the art.
import stateOfTheArt from "./state.of.the.art";
import cookieParser from "cookie-parser";

// First connect to MongoDB, and then...
connectMongo().then(() => {
  const app = express();
  // Handle HTTP POST Body with json and url-encoded-form.
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
	app.use(cookieParser());
  // Log everything at dev level.
  app.use(morgan("dev"));
  // Use main router.
  app.use("/", mainRouter);
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(stateOfTheArt, "font-family:monospace");
    setTimeout(() => {
      console.log(`Raccoon Backend is running on ${process.env.NODE_ENV} mode`);
      console.log(`Raccoon Backend is listening on http://localhost:${PORT}`);
    }, 2500);
  });
});
