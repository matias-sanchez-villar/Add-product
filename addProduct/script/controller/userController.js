import {User} from '../entities/user.js';
import {UserModel} from '../model/userModel.js';
import {UserView} from '../view/userView.js';


class UserController{
    constructor(userModel, userView)
    {
        this.userModel = userModel;
        this.userView = userView;
        this.clickLogin();
        this.clickSignUp();
        this.clickRecoverPassword();
        this.clickSaveChanges();

    }

    clickLogin()
    {
        $("#logIn").click((e)=>{
            e.preventDefault();

            if(this.validateInputs("email", "Enter your email") == false) return;
            if(this.validateInputs("password", "Enter your password") == false) return;

            const email =  $("#email").val();
            const password =  $("#password").val();

            let user = this.userModel.listUser();
            let flag = false;

            if(user == null) return;

            user.forEach(x => {
                if(x.email == email && x.password == password){
                    flag = true;
                    localStorage.setItem("session", x.id);
                    window.location.replace("http://127.0.0.1:5500/public/product.html");
                }
            });
            
            if(flag == false){
                this.userView.alert("Non existent user", "warning");
                return;
            }

        });
    }

    clickSignUp()
    {
        $("#signUp").click((e)=>{
            e.preventDefault();
            this.userView.removeModalElements();
            this.userView.signUp();
        });
    }

    clickRecoverPassword()
    {
        $("#recoverPassword").click((e)=>{
            e.preventDefault();
            this.userView.removeModalElements();
            this.userView.recoverPassword();
            
        });
    }

    clickSaveChanges()
    {
        $("#saveChanges").click((e)=>{

            e.preventDefault()

            if($("#exampleModalLabel").text() == "Register")
            {
                this.register();
            }
            else
            {
                this.recoverPassword();
            }

        });
    }

    register()
    {
        if(this.validateInputs("emailModal", "Enter your email") == false) return;
        if(this.validateInputs("passwordModal", "Enter your password") == false) return;

        const email =  $("#emailModal").val();
        const password =  $("#passwordModal").val();

        this.userModel.newUser(new User(email, password));
        this.userView.alert("New user created successfully", "primary");
    }

    recoverPassword()
    {
        if(this.validateInputs("emailModal", "Enter your email") == false) return;
        const email =  $("#emailModal").val();

        let user = this.userModel.listUser();
        let flag = false;

        if(user == null) return;

        user.forEach(x => {
            if(x.email == email){
                alert(x.password);
                flag = true;
            }
        });

        if(flag == false)
        {
            this.userView.alert("non existent user", "danger");
        }

    }

    validateInputs(id, message)
    {
        if($(`#${id}`).val() == "")
        {
            this.userView.alert(message, "danger");
            $(`#${id}`).addClass(" is-invalid");
            return false;
        }
        return true;
    }

}

const controller = new UserController(new UserModel(), new UserView());