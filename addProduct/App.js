class Product {

    static contador = 0;

    constructor(mark, name, price) {
        Product.contador ++;
        this.mark = mark
        this.name = name;
        this.price = price;
        this.id = Product.contador;
    }
 
}

class UI {
    
  addProduct(product) {
      $("tbody").append(`<tr id="${product.id}">
                            <td>${product.id}</td>
                            <td>${product.mark}</td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <button name="edit" type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </td>
                            <td>
                                <button name="delete" type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                          </tr>`);
  }

  resetForm()
  {
        $("#product-form")[0].reset();
  }

  resetModal()
  {
        $('.modal-title').empty();
        $('.modal-body').empty();
  }

  deleteProduct(e)
  {
        this.resetModal();
        $('.modal-title').append('Delete product');
        $('.modal-body').append('are you sure you want to delete the product?');
        $("#saveChanges").click(()=>{
            $(e).parent().parent().remove();
            this.showMessage("Product deleted successfully", "info");
            $('#exampleModal').modal('show');
        });
  }

  editProduct(e)
  {
        this.resetModal();
        $('.modal-title').append('Edit product');
        $('.modal-body').append(`<form id="product-form" class="card-body">
                                    <div class="form-group">
                                        <input type="text" id="mark" class="form-control" placeholder="Product Mark" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="name" class="form-control" placeholder="Product Name" />
                                    </div>
                                    <div class="form-group">
                                        <input type="number" step="0.01" id="price" min="0" class="form-control" placeholder="Product Price" />
                                    </div>
                                </form>`);
        $('.saveChanges').click(()=>{
            $('#exampleModal').modal('hide');
        });
  }

  showMessage(message, css)
  {
        $(".container").prepend(`<div class="alert alert-${css} mt-2" role="alert">${message}</div>`);
        setTimeout(function(){
            $(".alert").slideUp(1000, ()=>{
                $(".alert").remove();
            })
        }, 2500);
  }
}

/*
    Create product
*/
$("#product-form").submit(function(e) {
    e.preventDefault();

    const mark = $("#mark").val();
    const name = $("#name").val();
    const price = $("#price").val();

    const product = new Product(mark, name, price);

    const ui = new UI();
    if(mark === '' || name === '' || price === "")
    {
        return ui.showMessage("Complete fields please", "danger");
    }
    ui.addProduct(product);
    ui.showMessage("Product added successfully", "success");
    ui.resetForm();


});

/*
    Delete product
    Esta mal el evento click
*/
$('#product-list').click((e)=>{
    e.preventDefault();

    const ui = new UI();
    
    if(e.target.name === "delete")
    {
        console.log($(e).parent().parent().attr('id'));
        ui.deleteProduct(e.target);
    }
    if(e.target.name === "edit")
    {
        console.log($(e).parent().parent().attr('id'));
        ui.editProduct(e.target);
    }

});