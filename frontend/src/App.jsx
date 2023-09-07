import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Home /> } />
      <Route path="/products" element={ <Products /> } />
    </Routes>
  )
}

export default App
