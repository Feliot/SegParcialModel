import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Usuario, miUsuario } from 'src/app/models/usuario';
import { UsuariosServiceService } from 'src/app/services/usuarios-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  token;
  public myUsuario : Usuario;
  public isLogin : boolean;
  constructor(private miAuth: UserServiceService, private usersS: UsuariosServiceService){
    if (localStorage.getItem('token')) {  
    this.token= localStorage.getItem('token');
    }
  }
  ngOnInit(){
    this.miAuth.getAuth()
    .subscribe(user =>{
      if(user){
    
        this.miAuth.generarToken();
        this.isLogin = true;
        console.log("isLogin = true", user.email);
        this.myUsuario  =new miUsuario(user.uid, user.email);
        /* this.usersS. */
        this.miAuth.cargarUsuario(user.email);
        if(!user.email){
        }else{
          this.myUsuario.email =  user.email;
        }
        this.myUsuario.id = user.uid; 
 
       }else{
        console.log("isLogin = false");
        this.isLogin = false;
      }
    })
  }
  logueado(){
    return this.miAuth.isAutenticated();
  }
  onClickLogout(){
    this.miAuth.logOut();
    this.isLogin= false;
    this.myUsuario = null;
  }

}
