export class Product {

    static contador = 0;

    constructor(mark, name, price) {
        this.mark = mark
        this.name = name;
        this.price = price;

        Product.contador ++;
        this.id = Product.contador;
    }
 
}