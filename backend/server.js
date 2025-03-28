import express from "express";
import cors from "cors";
import stores from "./routes/store.js";
import reviews from "./routes/review.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/stores", stores);
app.use("/reviews", reviews);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
