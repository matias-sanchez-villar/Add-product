import {Product} from '../entities/product.js';

export class ProductModel
{
    newProduct(product)
    {
        let productStorage = JSON.parse(localStorage.getItem('product')) || [];
        this.productStorage = productStorage.map(x => new Product(x.idUser, x.mark, x.name, x.price));
        this.productStorage.push(product);
        localStorage.setItem('product', JSON.stringify(this.productStorage));
    }

    listProduct()
    {
        let productStorage = JSON.parse(localStorage.getItem('product'));
        if(productStorage == null){
            return null;
        }else{
            return productStorage;
        }
    }
}