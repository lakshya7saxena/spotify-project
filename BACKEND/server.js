import app from "./src/app.js";
import 'dotenv/config';
import connectDB from "./src/db/db.js";
connectDB()
app.listen(3000, () => {
    console.log("Server has started");
})
