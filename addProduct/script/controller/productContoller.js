import {Product} from '../entities/product.js';
import {UserModel} from '../model/userModel.js';
import {ProductModel} from '../model/productModel.js';
import { ProductView } from '../view/productView.js';

class ProductController
{
    constructor(model, view)
    {
        this.model = model;
        this.view = view;

        if(sessionStorage.getItem("session") == null) window.location.replace("http://127.0.0.1:5500/public/login.html");
        
        this.loadTable();
        this.clickAdd();

    }

    loadTable()
    {
        const product = this.model.listProduct();
        product.forEach(x => {
            this.view.table(x);
        });
    }

    clickAdd()
    {
        $("#addProduct").click((e)=>{
            e.preventDefault();
            
            if(this.validateInputs("mark", "you must add the mark") == false) return;
            if(this.validateInputs("name", "you must add the name") == false) return;

            const mark =  $("#mark").val();
            const name =  $("#name").val();
            const price =  $("#price").val();

            const product = new Product(mark, name, price)
            
            this.model.newProduct(product);
            this.view.table(product);
        });
    }

    validateInputs(id, message)
    {
        if($(`#${id}`).val() == "")
        {
            this.view.alert(message, "danger");
            $(`#${id}`).addClass(" is-invalid");
            return false;
        }
        return true;
    }


}

const controller = new ProductController(new ProductModel(), new ProductView());