import {UserModel} from "src/app/models/home-doctor/user.model";

export class UserUtils {
    static role = "";
    static token = "";
    static user: UserModel = new UserModel();

    constructor() {
    }

    static saveUserData(user: UserModel, token: string) {
        localStorage.setItem('remeber', "true");
        localStorage.setItem('name', user.name!);
        localStorage.setItem('email', user!.email!);
        localStorage.setItem('role', user!.role!);
        localStorage.setItem('phone', user!.phone!);
        localStorage.setItem('specialization', user!.specialization!);
        localStorage.setItem('age', user!.age!.toString()!);
        localStorage.setItem('gender', user!.gender!);
        localStorage.setItem('token', token);
        this.getUserData();
    }

    static getUserData() {

        this.user.name = localStorage.getItem('name') ?? "";
        this.user.email = localStorage.getItem('email') ?? "";
        this.user.phone = localStorage.getItem('phone') ?? "";
        this.user.age = +localStorage.getItem('age')!;
        this.user.gender = localStorage.getItem('gender') ?? "";
        this.user.role = localStorage.getItem('role') ?? "";
        this.user.specialization = localStorage.getItem('specialization') ?? "";
        this.token = localStorage.getItem('token') ?? "";

    }


    static checkIfRemeberMe(): boolean {
        // localStorage.setItem('remeber', "false");

        const s = localStorage.getItem("remeber");

        if (s == null) {
            return false;
        }
        return s == "true";
    }

    static isEmailFormat(email: string) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }


}
