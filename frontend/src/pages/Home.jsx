import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import validation from "../../validations/validation";
import requestAPI from "../../services/requestAPI";
import axios from "axios";
import './Products.css'


function Home() {
  const [csvData, setCSVData] = useState([]);
  const [validationResult, setValidationResult] = useState([]);
  const [packs, setPacks] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [disabledValidationButton, setDisabledValidationButton] = useState(true);
  const [disabledUpdateButton, setDisabledUpdateButton] = useState(true);
  const [productsList, setProductsList] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n');
        const headers = lines[0].split(',').map((header) => header.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',');
          const rowData = {};

          for (let j = 0; j < headers.length; j++) {
            const value = parseFloat(row[j].trim().replace(/"/g, '').trim());
            rowData[headers[j]] = isNaN(value) ? row[j].trim().replace(/"/g, '').trim() : value;
          }

          data.push(rowData);
        }

        setCSVData(data);
      };

      reader.readAsText(file);
      
    }
    setDisabledValidationButton(false);
  };

  const listProducts = async () => {
    if (!csvData) {
      return;
    }
    const result = await validation(csvData, packs);
    setValidationResult(result);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const packsData = await requestAPI('packs');
        setPacks(packsData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    listProducts();
  }, [csvData]);

  return (
    <>
      <header>
        <Link to={'/products'}><strong>Produtos</strong></Link>
      </header>
      <nav>

        <input
          type="file"
          accept=".csv"
          id="fileInput"
          onChange={ (e) => {
            console.log('mandou');
            setDisabledValidationButton(true);
            setDisabledValidationButton(true);
            setDisabledUpdateButton(true);
            handleFileUpload(e);
          } }
        />
        <label htmlFor="fileInput" className="custom-file-upload"><strong>Escolher Arquivo</strong></label>
        <button
          disabled={ disabledValidationButton }
          onClick={ () => {
            setWaiting(false)
            setProductsList(validationResult);
            if (validationResult.length > 0) {
              if (!validationResult.some(item => item.erroEnabled)) {
                setDisabledUpdateButton(false);              
              }
            }
          } }
        >
          <strong>Validar</strong>
        </button>
        <button
          disabled={ disabledUpdateButton }
          onClick={ () => {
            console.log(validationResult);
            productsList.forEach((e) => {
              const packageForShipping = {
                code: e.product_code,
                name: e.name,
                costPrice: Number(e.costPrice),
                salesPrice: e.new_price
              }
              
              axios.put(`http://localhost:3001/products/${e.product_code}`, packageForShipping);
            })

            setCSVData([]);
            setValidationResult([]);
            setPacks([]);
            setWaiting(true);
            setDisabledValidationButton(true);
            setDisabledUpdateButton(true);
            setProductsList([]);
          } }
        >
          <strong>Atualizar</strong>
        </button>
      </nav>
      { waiting ? (
        <p className="waiting">Envie um arquivo.</p>
      ) : (
        <div>
          { productsList.map((e, i) => (
            <div key={i} className="product">
              <p className="outer">Código: <strong>{e.product_code}</strong></p>
              <p className="name">Nome: <strong>{e.name}</strong></p>
              <p className="outer">Preço Atual: <strong>R$ {e.old_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></p>
              <p className="outer">Novo preço de venda: <strong>R$ {Number(e.new_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></p>
              <p className="erro">{e.erro}</p>
            </div>
          )) }
        </div>
      ) }
    </>
  );
}

export default Home;
