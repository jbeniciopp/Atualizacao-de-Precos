import express from 'express';
import productRouter from './routes/products.router';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => res.status(200).send('OK'));
app.use('/products', productRouter);

export default app;