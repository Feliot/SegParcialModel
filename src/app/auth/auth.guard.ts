import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { UserServiceService } from '../services/user-service.service'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';
import { userInfo } from 'os';
import { UsuariosServiceService } from '../services/usuarios-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private usuarioService: UserServiceService,
     private usersS : UsuariosServiceService,
    private afsAuth: AngularFireAuth) { 
  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if(!auth){
          this.router.navigate(['/login']);
        }
        else{
       /*    this.usuarioService.reCargarusuario(); */
          /* console.log('usuario',this.usuarioService.getUser()); */
          this.usuarioService.recargarYDevolverUsuario().then( e =>
           this.usersS.DevolverUsuarioFiltro(this.usuarioService.getUser().id, 'id')).then( r =>
            this.usersS.getUsuariosSC()).then( rr =>{
              console.log('usuario', this.usersS.getAuxUsers()) 
            }).catch(err => console.log(err))
          
          
        }
      }));

    }

//NO VERIRICADO
/*   try{
    if (this.usuarioService.isAutenticated()){
      console.log("Logueo verificado")
      return true;
    }else{
      console.log("logueo NO verificado")
      this.usuarioService.logOut();
      this.router.navigate(['/login']);
    } */
    //ESTA PARTE VERIFICA EL TOKEN
/*     console.log("verificando..")
    let token: any;
    token = localStorage.getItem('token');
    token= atob(token.split('.')[1]);
    token= JSON.parse(token);
    if(token.exp > Date.now()/1000 ){
      console.log("token verificado")
      return true;
    }else{
      console.log("token NO verificado")
      this.usuarioService.logOut();
      this.router.navigate(['/login']);
    } */

//ESTA PARTE VA CON LAS DOS ANTERIORES
/*   }catch(e){
    console.log(e);
    this.router.navigate(['/login']);
    return false;
  } */

/*   valor= this.usuarioService.isAutenticated();
      if ( valor) {
        console.log("can activate true", valor,'ruta:'+ this.router.url);
        return true;
      } else {
        console.log("can activate false", valor);
        this.router.navigate(['/login']);
        return false;
      } */

    //}
}

