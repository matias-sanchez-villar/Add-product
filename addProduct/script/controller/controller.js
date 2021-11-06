import {User} from '../entities/user.js';
import {Product} from '../entities/product.js';
import {UserModel} from '../model/model.js';
import {UserView} from '../view/view.js';

class Controller{
    constructor(userModel, userView)
    {
        this.userModel = userModel;
        this.userView = userView;
        this.clickLogin();

    }

    clickLogin()
    {
        $("#logIn").click((e)=>{
            e.preventDefault();

            if($("#email").val() == "")
            {
                this.userView.alert("Complete Email", "danger");
                return;
            }
            if($("#password").val() === "") 
            {
                this.userView.alert("Complete Password", "danger");
                return;
            }


            const email =  $("#email").val();
            const password =  $("#password").val();

            let user =this.userModel.listUser();

            if(user == null) return;

            user.forEach(x => {
                if(x.email == email && x.password == password){
                    window.location.replace("http://127.0.0.1:5500/public/product.html");
                    sessionStorage.setItem("session", x);
                }
            });

            this.userView.alert("Non existent user", "warning");
            return;

        });
    }

}

const controller = new Controller(new UserModel(), new UserView());

/*
const u1 = new User();
u1.add("admin","admin",false);
const u2  = new User();
u2.add("root","root",false);
const u3  = new User();
u3.add("pepe","1234",false);
const u4 = new User();
u4.add("lalo","4321",false);

const user = [];
user.push(u1, u2, u3, u4);
localStorage.setItem('user', JSON.stringify(user));
console.log(JSON.parse(localStorage.getItem('user')));
*/