
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

}