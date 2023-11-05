import { SignUpRequestBody } from "src/app/models/auth/sign.up.request.body";
import { SignUpResponseBody } from "src/app/models/auth/sign.up.response.body";
import { UserModel } from "src/app/models/home/user.model";
export class UserUtils {
    static role = "";
    static token = "";

    static user: UserModel = new UserModel();


    constructor() {
        localStorage.setItem('remeber', "false");

    }
    static saveUserData(user: SignUpResponseBody) {
        localStorage.setItem('remeber', "true");
        localStorage.setItem('name', user.result!.name!);
        localStorage.setItem('email', user.result!.email!);
        localStorage.setItem('phone', user.result!.phone!);
        localStorage.setItem('age', user.result!.age!.toString()!);
        localStorage.setItem('gender', user.result!.gender!);
        localStorage.setItem('token', user.token!);
        this.getUserData();
    }

    static getUserData() {

        this.user!.name = localStorage.getItem('name') ?? "";
        this.user!.email = localStorage.getItem('email') ?? "";
        this.user!.phone = localStorage.getItem('phone') ?? "";
        this.user!.age = + localStorage.getItem('age')!;
        this.user!.gender = localStorage.getItem('gender') ?? "";
        this.token = localStorage.getItem('token')!;

    }


    static checkIfRemeberMe(): boolean {
        // localStorage.setItem('remeber', "false");

        var s = localStorage.getItem("remeber");

        if (s == null) {
            return false;
        }
        return s == "true";
    }
}