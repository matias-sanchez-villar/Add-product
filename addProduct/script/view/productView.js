
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
                              <td>${product.id}</td>
                              <td>${product.mark}</td>
                              <td>${product.name}</td>
                              <td>${product.price}</td>
                              <td>
                                  <button data-id="${product.id}" name="edit" type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                                      <i class="fas fa-edit"></i>
                                  </button>
                              </td>
                              <td>
                                  <button data-id="${product.id}" name="delete" type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
                                      <i class="fas fa-trash-alt"></i>
                                  </button>
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