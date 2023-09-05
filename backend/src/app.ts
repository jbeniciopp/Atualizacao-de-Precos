import express from 'express';
import productRouter from './routes/products.router';
import packRouter from './routes/pack.router';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => res.status(200).send('OK'));
app.use('/products', productRouter);
app.use('/packs', packRouter);

export default app;