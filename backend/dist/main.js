import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/database.js';
import indexRoute from './routes/index.route.js';
import 'dotenv/config';
// app config
const app = express();
const port = 8000;
// middleware
app.use(express.json());
app.use(cors());
// connect db 
connectDB();
// Api enpoint
app.use('/api/v1', indexRoute);
const uploadDir = process.env.UPLOAD_PATH || 'uploads';
app.use('/images', express.static(uploadDir));
app.get("/", (req, res) => {
    res.send("Server working");
});
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map