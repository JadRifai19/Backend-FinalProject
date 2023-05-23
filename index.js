import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import multer from "multer";
import Admin from "./routes/adminroute.js";
import Instructor from './routes/instructorroute.js';
import Product from './routes/productroute.js';
import Shopping from './routes/shoppingroute.js';
import Training from './routes/trainingroute.js';
import User from './routes/userroute.js';
import Usertraining from './routes/usertrainingroute.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 6000;
const app = express();

// Set up multer middleware
const upload = multer({ dest: "uploads/" });

app.use(upload.single("image"));
app.use(express.json());

// Define your routes and middleware here
app.use("/admin", Admin);
app.use("/instructor", Instructor);
app.use("/product", Product);
app.use("/shopping", Shopping);
app.use("/training", Training);
app.use("/User", User);
app.use("/Usertraining", Usertraining);

app.post("/upload", (req, res) => {
  // Handle the file upload here
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
