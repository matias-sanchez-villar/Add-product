import {User} from '../entities/user.js';
import {Product} from '../entities/product.js';

export class UserModel{

    newUser(user)
    {
        let userStorage = localStorage.getItem('user');
        if(userStorage != null){
            localStorage.setItem('user', JSON.stringify(userStorage));
        }else{
            let userArray = [];
            userArray = localStorage;
            userArray.push(user);
            localStorage.setItem('user', JSON.stringify(userStorage));
        }

    }

    listUser()
    {
        let userStorage = JSON.parse(localStorage.getItem('user'));
        if(userStorage == null){
            return null;
        }else{
            return userStorage;
        }
    }

}