import express from 'express';
import productRouter from './routes/products.router';
import packRouter from './routes/pack.router';
var cors = require('cors')

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (_req, res) => res.status(200).send('OK'));
app.use('/products', productRouter);
app.use('/packs', packRouter);

export default app;