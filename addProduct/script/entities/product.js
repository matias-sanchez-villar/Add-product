export class Product {

    static contador = 0;

    constructor(idUser, mark, name, price) {
        
        this.idUser = idUser;
        this.mark = mark
        this.name = name;
        this.price = price;
        this.state = true;

        Product.contador ++;
        this.id = Product.contador;
    }
 
}