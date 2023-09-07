import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import requestAPI from "../../services/requestAPI";
import './Products.css'

function Products() {
  const [ products, setProducts ] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await requestAPI('products');
      setProducts(data);
    }
    fetchData();
  }, []);

  function listProducts() {
    if (!products) {
      return (<h1>Carregando...</h1>)
    }
    
    return (
      products.map((e, i) => (
        <div key={ i } className="product">
          <p className="outer">Código: <strong>{e.code}</strong></p>
          <p className="name">Nome: <strong>{e.name}</strong></p>
          <p className="outer">Preço de custo: <strong>R$ {Number(e.costPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></p>
          <p className="outer">Preço de venda: <strong>R$ {Number(e.salesPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></p>
        </div>
      ))
    )
  }

  return (
    <>
      <header>
        <Link to={'/'}><strong>Inicio</strong></Link>
        <h1>Produtos</h1>
      </header>
      <main>
      { listProducts() }
      </main>
    </>
  )
}

export default Products;