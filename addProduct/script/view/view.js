import {User} from '../entities/user.js';
import {Product} from '../entities/product.js';

export class UserView{

    alert(message, css)
    {
        $("body").prepend(`<div class="alert alert-${css} mt-2" role="alert">${message}</div>`);
        setTimeout(function(){
            $(".alert").slideUp(1000, ()=>{
                $(".alert").remove();
            })
        }, 3000);
    }

    signUp()
    {
        $("#exampleModalLabel").prepend("Register");
        $(".modal-body").prepend(`<form>
                                       <div class="mb-4">
                                       <label for="email" class="form-label">Email</label>
                                           <input id="emailModal" type="email" class="form-control" name="email">
                                       </div>
                                       <div class="mb-4">
                                           <label for="password" class="form-label">Password</label>
                                           <input id="passwordModal" type="password" class="form-control" name="password">
                                       </div>
                                   </form>`);
    }

    recoverPassword()
    {
        $("#exampleModalLabel").prepend("Remember Password");
        $(".modal-body").prepend(`<form>
                                       <div class="mb-4">
                                       <label for="email" class="form-label">Email</label>
                                           <input id="emailModal" type="emil" class="form-control" name="email">
                                       </div>
                                   </form>`);
    }

    removeModalElements()
    {
        $("#exampleModalLabel").empty();
        $(".modal-body").empty();
    }

}
