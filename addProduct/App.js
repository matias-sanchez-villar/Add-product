class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class UI {
  addProduct(product) {
      $("#product-list").append(`<div class="card text-center mb-4">
                                    <div class="card-body">
                                        <strong>Name</strong>: ${product.name}
                                        <strong>Price</strong>: ${product.price}
                                        <strong>Year</strong>: ${product.year}
                                        <a href="#" class="btn btn-danger" name="delete">Delete</a>
                                    </div>
                                </div>`);
  }

  resetForm()
  {
        $("#product-form")[0].reset();
  }

  deleteProduct(e)
  {
        if(e.name === "delete")
        {
            console.log($(e).parent().parent().remove());
            this.showMessage("Product deleted successfully", "info");
        }
    
  }

  showMessage(message, css)
  {
        $(".container").prepend(`<div class="alert alert-${css} mt-2">${message}</div>`);
        setTimeout(function(){
            $(".alert").slideUp(1000, ()=>{
                $(".alert").remove();
            })
        }, 3000);
  }
}

/*
    Create product
*/
$("#product-form").submit(function(e) {
    e.preventDefault();

    const name = $("#name").val();
    const price = $("#price").val();

    const product = new Product(name, price);

    const ui = new UI();
    if(name === '' || price === "")
    {
        return ui.showMessage("Complete fields please", "danger");
    }
    ui.addProduct(product);
    ui.showMessage("Product added successfully", "success");
    ui.resetForm();


});

/*
    Delete product
*/

$('#product-list').click((e)=>{
    e.preventDefault();

    const ui = new UI();
    ui.deleteProduct(e.target);

});