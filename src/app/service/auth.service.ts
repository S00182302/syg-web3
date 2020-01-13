import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  passwordInput: string;
  emailInput: string;
  user: User;
  userLoggedIn: boolean = false;
  newUserUID: string;

  //Subscribing to the Authentication State
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  async GetEmail() {
    return this.afAuth.auth.currentUser.email;
  }

  //Login users with email and password
  async login(emailInput, passwordInput) {
    return await this.afAuth.auth.signInWithEmailAndPassword(
      emailInput,
      passwordInput
    );
  }

  setUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  //Registering Users
  async register(email: string, pass: string) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  //Send a password reset email
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  //Logout User
  async logout() {
    this.user = null;
    return await this.afAuth.auth.signOut();
  }

  //Check if the user is logged in
  isLoggedIn() {
    return JSON.parse(localStorage.getItem("user"));
  }

  //Login With Google
  async loginWithGoogle() {
    return await this.afAuth.auth.signInWithPopup(
      new auth.GoogleAuthProvider()
    );
  }
}
