import {Product} from '../entities/product.js';
import {UserModel} from '../model/userModel.js';
import {ProductModel} from '../model/productModel.js';
import { ProductView } from '../view/productView.js';

class ProductController
{
    constructor(model, view)
    {
        if(localStorage.getItem("session") == null) window.location.replace("http://127.0.0.1:5500/public/login.html");
        
        this.model = model;
        this.view = view;
        this.idUser = localStorage.getItem("session");

        this.loadTable();
        this.clickSignOff();
        this.clickAdd();
        this.clickTable();

    }

    loadTable()
    {
        this.product = this.model.listProduct() || [];

        if(this.product == null) return;
        this.product.forEach(x => {
            if(x.idUser == this.idUser){
                this.view.table(x);
            }
        });
    }

    clickSignOff()
    {
        $("#siginOff").click(()=>{
            localStorage.removeItem('session');
            window.location.replace("http://127.0.0.1:5500/public/login.html");
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

            this.product.push(new Product(this.idUser ,mark, name, price));
            
            this.model.newProduct(this.product);
            this.view.table(this.product);
        });
    }

    clickTable()
    {
        $('#product-list').click((e)=>{
            e.preventDefault();
            
            if(e.target.name === "delete")
            {
                this.delete(e);
            }
            if(e.target.name === "edit")
            {
                this.edit(e);
            }
        
        });
    }

    delete(e)
    {
        
    }

    edit(e)
    {
       
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