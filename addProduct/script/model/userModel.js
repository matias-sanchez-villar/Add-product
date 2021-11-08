import {User} from '../entities/user.js';

export class UserModel{

    newUser(user)
    {
        let userStorage = JSON.parse(localStorage.getItem('user')) || [];
        this.userStorage = userStorage.map(x => new User(x.email, x.password));
        this.userStorage.push(user);
        localStorage.setItem('user', JSON.stringify(this.userStorage));
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