
export class ProductView
{
    alert(message, css)
    {
        $(".container").prepend(`<div class="alert alert-${css} mt-2" role="alert">${message}</div>`);
        setTimeout(function(){
            $(".alert").slideUp(1000, ()=>{
                $(".alert").remove();
            })
        }, 3000);
    }

    table(product)
    {
        $("tbody").append(`<tr id="${product.id}">
                              <td name="id" data-idProduct="${product.id}">${product.id}</td>
                              <td name="mark">${product.mark}</td>
                              <td name="product">${product.name}</td>
                              <td name="price">${product.price}</td>
                              <td>
                                  <button data-id="${product.id}" name="edit" type="button" class="btn btn-success fas fa-edit" data-toggle="modal" data-target="#exampleModal"></button>
                              </td>
                              <td>
                                  <button data-id="${product.id}" name="delete" type="button" class="btn btn-danger fas fa-trash-alt" data-toggle="modal" data-target="#exampleModal"></button>
                              </td>
                            </tr>`);
    }

    deleteModal(id)
    {
        $("#exampleModalLabel").prepend("Delete");

        $(".modal-body").prepend(`Are you sure you want to delete the product?`);

        $(".modal-footer").prepend(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button id="${id}" name="delete" type="button" class="btn btn-primary" data-dismiss="modal">Delete</button>`);
    }

    editModal(id, mark, name, price)
    {
        $("#exampleModalLabel").prepend("Edit");

        $(".modal-body").prepend(`<form>
                                        <div class="form-group">
                                            <input type="text" id="markModal" class="form-control" placeholder="${mark}" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" id="nameModal" class="form-control" placeholder="${name}" />
                                        </div>
                                        <div class="form-group">
                                            <input type="number" id="priceModal" step="0.01" min="0" class="form-control" placeholder="${price}" />
                                        </div>
                                   </form>`);

        $(".modal-footer").prepend(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button id="${id}" name="edit" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>`);
    }

    resetModal()
    {
        $('.modal-title').empty();
        $('.modal-body').empty();
        $('.modal-footer').empty();
    }

}