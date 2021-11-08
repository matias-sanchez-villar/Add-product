import {User} from '../entities/user.js';
import {Product} from '../entities/product.js';
import {UserModel} from '../model/model.js';
import {UserView} from '../view/view.js';

class ProductController
{
    constructor()
    {
        if(sessionStorage.getItem("session") == null) window.location.replace("http://127.0.0.1:5500/public/login.html");
    }
}

const controller = new ProductController(new UserModel(), new UserView());