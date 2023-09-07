import requestAPI from "../services/requestAPI"

const validation = async (newPrices, packs) => {
  const oldProduct = await requestAPI('products');

  packs.forEach((e) => {
    oldProduct.forEach((i) => {
      i.newPrice = Number(i.salesPrice);
      newPrices.forEach((f) => {
        if (i.code === f.product_code) {
          i.newPrice = f.new_price;
        }
      });
      if (e.packId === i.code) {
        // eslint-disable-next-line no-prototype-builtins
        if (!i.hasOwnProperty('dependency')) {
          i.dependency = [];
        }

        i.dependency.push({
          productId: e.productId,
          qty: e.qty
        });
      }
    });
  });

  function calculateNewPrice(product, products) {
    if (product.dependency && product.dependency.length > 0) {
      let newPrice = 0;

      for (const dependency of product.dependency) {
        const dependentProduct = products.find((p) => p.code === dependency.productId);
  
        if (dependentProduct) {
          const totalCost = dependentProduct.newPrice * dependency.qty;

          newPrice += totalCost;
        }
      }

      product.newPrice = Number(newPrice.toFixed(2));
    }
  }

  for (const product of oldProduct) {
    calculateNewPrice(product, oldProduct);
  }

  const filterProduct = oldProduct.filter((e) => Number(e.salesPrice) != e.newPrice);
  
  const newArray = filterProduct.map((e) => {

    if (Number(e.costPrice) > e.newPrice) {
      return {
        product_code: e.code,
        name: e.name,
        old_price: Number(e.salesPrice),
        new_price: e.newPrice,
        costPrice: e.costPrice,
        erroEnabled: true,
        erro: 'Novo valor menor que o valor de custo.'
      }
    } if (e.newPrice > (0.1 * Number(e.salesPrice)) + Number(e.salesPrice)) {
      return {
        product_code: e.code,
        name: e.name,
        old_price: Number(e.salesPrice),
        new_price: e.newPrice,
        costPrice: e.costPrice,
        erroEnabled: true,
        erro: 'Novo valor maior do que 10% do preço atual do produto.'
      }
    } if (e.newPrice < Number(e.salesPrice) - (0.1 * Number(e.salesPrice))) {
      return {
        product_code: e.code,
        name: e.name,
        old_price: Number(e.salesPrice),
        new_price: e.newPrice,
        costPrice: e.costPrice,
        erroEnabled: true,
        erro: 'Novo valor menor do que 10% do preço atual do produto.'
      }
    }
    return {
      product_code: e.code,
      name: e.name,
      old_price: Number(e.salesPrice),
      new_price: e.newPrice,
      costPrice: e.costPrice,
      erroEnabled: false,
      erro: ''
    }
  })


  
  return newArray;
};

export default validation;