import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import { Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observer, Observable} from 'rxjs';
import { Usuario, miUsuario } from '../models/usuario';
import { promise } from 'protractor';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private miObservable = new BehaviorSubject<string>('');
  miObservable$ = this.miObservable.asObservable();
  private user: Usuario;
  constructor(
    // IMPORETANTE: para poder usar AngularFireAuth hay que importar
    // el modulo AngularFireAuthModule en app.module
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private mirouter: Router) {
  /*     this.getAuth(); */
/*       if (localStorage.getItem('email')) {
        this.cargarUsuario(localStorage.getItem('email').toString());
        console.log('constructor', localStorage.getItem('email').toString());
      } */
  }
buscarLogin(ruta: string) {
return new Promise((resolve, reject) => {
    resolve(this.getAuth()
    .subscribe(user => {
      if (user) {
        this.cargarUsuario(user.email);
        console.log('Usuariocargardo', ruta, this.mirouter.url);
        this.mirouter.navigate([ruta]);
      } else {
        console.log('isLoginLOGUEO = false');
      }
    })),
    err => reject(err);
  });
}

reCargarusuario() {
  this.getAuth()
  .subscribe(user => {
    this.user.id = user.uid;
    this.user.email = user.email;
    console.log(this.user);
  });
}

getUser(): Usuario {
  return this.user;
}
login(email: string , password: string) {
    // VERIFICA usuario y retornar el jwt
    return new Promise((resolve, reject) => {
       this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData) ,
        error => reject(error));
 /*    }).catch(error => {console.log(error) */
  });
  }
register(email: string , password: string) {
    // VERIFICA usuario y retornar el jwt
    return new Promise((resolve, reject) => {
       this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData) ,
        error => reject(error));
  });
  }

  generarToken() {
/*     const email = this.afAuth.auth.currentUser.email;
    const uid = this.afAuth.auth.currentUser.uid ; */
    this.afAuth.auth.currentUser.getIdToken()
    .then(function(jsonwebtoken: string) {
      console.log('jsonwebtoken');
      localStorage.setItem('token', jsonwebtoken);
    } )
    .catch(err => console.log(err));
  }

  logOut() {
    localStorage.removeItem('token');
    this.afAuth.auth.signOut();
    this.user = null;
    this.mirouter.navigate(['login']);
  }

  cargarUsuario(  email: string) {
    this.user = new miUsuario();
    this.user.email = email;
    console.log('cargando usuario', email);
  
  }



ActualizarContraseña( newPassword: string ){
  var user = this.afAuth.auth.currentUser;
user.updatePassword(newPassword).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
}
ActualizarPerfil(){
  var user = this.afAuth.auth.currentUser;
user.updateProfile({
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
}

 getAuth() {
 /*  return this.afAuth.authState; */
   return this.afAuth.authState.pipe(map(auth => auth));
 }
 darPromesaAuth(){
    new Promise (user=> this.afAuth.auth.currentUser)
    .then(function(user) {
      if (user) {
        // User is signed in.
        console.log('Autenticado', user);
        return  true;
      } else {
        // No user is signed in.
        console.log('No autenticado');
        return false;
      }
    } )
    .catch(rr=> {return false});
 }

 isAutenticated() {

var usuarioActual = this.afAuth.auth.currentUser.email;
if (!usuarioActual) {
  /* if (!this.user) {  */
  // User is signed in.
  console.log('No Logueado'), usuarioActual;
  return false;
} else {
  // No user is signed in.
  console.log('logueado', usuarioActual);
  return true;
}
} 

}
