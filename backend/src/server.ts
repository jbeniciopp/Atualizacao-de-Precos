import app from './app';

const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;