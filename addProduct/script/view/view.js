import {User} from '../entities/user.js';
import {Product} from '../entities/product.js';

export class UserView{

    alert(message, css)
    {
        console.log("sss");
        $("body").prepend(`<div class="alert alert-${css} mt-2" role="alert">${message}</div>`);
        setTimeout(function(){
            $(".alert").slideUp(1000, ()=>{
                $(".alert").remove();
            })
        }, 3000);
    }

}
