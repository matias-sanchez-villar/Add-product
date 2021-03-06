import {Product} from '../entities/product.js';
import {UserModel} from '../model/userModel.js';
import {ProductModel} from '../model/productModel.js';
import { ProductView } from '../view/productView.js';

class ProductController
{
    constructor(model, view)
    {
        if(localStorage.getItem("session") == null) window.location.replace("http://127.0.0.1:5500/addProduct/public/login.html");
        
        this.model = model;
        this.view = view;
        this.idUser = localStorage.getItem("session");

        this.loadTable();
        this.clickSignOff();
        this.clickAddForm();
        this.clickTable();
        this.clickModal();
        this.keyupFilter();
        this.clickPrevious();
        this.clickNext();

    }

    loadTable()
    {
        const product = this.model.listProduct();
        
        if(product == null) return;

        product.forEach(x => {
            if(x.idUser == this.idUser && x.state == true){
                this.view.table(x);
            }
        });
        Product.contador = product.length;
        this.visibleElements();
        
    }

    visibleElements()
    {
        if($("tr").length < 6) return;
        console.log("DD");
        this.previous = 1;
        this.next = 5;

        for(let x = this.previous; x < this.next; x++)
        {
            $($("tr")[x]).addClass("d-none");
        }
    }


    clickSignOff()
    {
        $("#siginOff").click(()=>{
            localStorage.removeItem('session');
            window.location.replace("http://127.0.0.1:5500/public/login.html");
        });
    }

    clickAddForm()
    {
        $("#addProduct").click((e)=>{
            e.preventDefault();
            
            if(this.validateInputs("mark", "you must add the mark") == false) return;
            if(this.validateInputs("name", "you must add the name") == false) return;

            const mark =  $("#mark").val();
            const name =  $("#name").val();
            const price =  $("#price").val() != null ? $("#price").val() : 0;

            const product = new Product(this.idUser ,mark, name, price);
            
            this.model.newProduct(product);
            this.view.table(product);

            //resetear el formulario
            $("#product-form")[0].reset();

            this.visibleElements();
        });
    }


    clickTable()
    {
        $('#product-list').click((e)=>{
            e.preventDefault();

            this.view.resetModal();
            
            if(e.target.name === "delete")
            {
                this.view.deleteModal(e.target.dataset.id);
            }
            if(e.target.name === "edit")
            {
                this.edit(e.target.dataset.id);
            }
        
        });
    }

    edit(id)
    {
        const product = this.model.listProduct();

        product.forEach(x => {
            if(x.id == id){
                this.view.editModal(x.id, x.mark, x.name, x.price);
            }
        });
    }

    clickModal()
    {
        $(".modal-footer").click((e)=>{

            if(e.target.name === "delete")
            {
                this.deleteModal(e.target.id);
            }
            if(e.target.name === "edit")
            {
                this.editModal(e.target.id);
            }

        });
    }

    deleteModal(id)
    {
        $(`#${id}`).remove();

        const product = this.model.listProduct();
        
        product.forEach(x => {
            if(x.id == id){
                x.state = false;
            }
        });

        this.model.resetProduct(product);
       
    }

    editModal(id)
    {
        let mark;
        let name;
        let price;

        if($("#markModal").val() != ""){
            mark =  $("#markModal").val();
        }else{
            mark = $("#markModal")[0].placeholder;
        }
        
        if($("#nameModal").val() != ""){
            name =  $("#nameModal").val();
        }else{
            name = $("#nameModal")[0].placeholder;
        }

        if($("#priceModal").val() != ""){
            price =  $("#priceModal").val();
        }else{
            price = $("#priceModal")[0].placeholder;
        }

        $($(`#${id}`).children()[1]).text(mark);
        $($(`#${id}`).children()[2]).text(name);
        $($(`#${id}`).children()[3]).text(price);

        const product = this.model.listProduct();
        
        product.forEach(x => {
            if(x.id == id){
                x.mark = mark;
                x.name = name;
                x.price = price;
            }
        });

        this.model.resetProduct(product);

    }

    keyupFilter()
    {
        $("#keyupFilter").keyup((e)=>{
            for(let x = 1; x < $("tr").length; x++)
            {
               const metod = $($("tr")[x]).children()[1];
               const text = $(metod).text();

               text.includes(e.target.value) ? $($("tr")[x]).fadeIn("slow").removeClass("d-none") : $($("tr")[x]).fadeOut("slow").addClass("d-none");

            }
        });
    }

    clickPrevious()
    {
        $("#previous").click(()=>{
            
            if(1 >= this.previous) return;
            this.previous -= 5;
            this.next -= 5;

            for(let x = 1; x < $("tr").length; x++)
            {
                if(x >= this.previous+5 && x <= this.next+5)
                {
                    $($("tr")[x]).removeClass("d-none");
                }
                if(x >= this.previous && x <= this.next)
                {
                    $($("tr")[x]).addClass("d-none")
                }
            }
        });
    }

    clickNext()
    {
        $("#next").click(()=>{

            if($("tr").length <= this.next) return;
            this.previous += 5;
            this.next += 5;

            for(let x = 1; x < $("tr").length; x++)
            {
                if(x >= this.previous-5 && x <= this.next-5)
                {
                    $($("tr")[x]).removeClass("d-none");
                }
                if(x >= this.previous && x <= this.next)
                {
                    $($("tr")[x]).addClass("d-none");
                }
            }
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
