export class User
{
    static contador = 0;

    constructor(email, password)
    {
        User.contador ++;
        this.id = User.contador;

        this.email = email;
        this.password = password;
    }

}