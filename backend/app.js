import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import recommendRoute from './routes/recommend.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/recommend', recommendRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
