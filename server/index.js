import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/usersRoute.js";
import messageRoutes from "./routes/messageRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/app-chat", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connection Successful");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(8808, () => {
    console.log(`Server started on port 8808`);
});
