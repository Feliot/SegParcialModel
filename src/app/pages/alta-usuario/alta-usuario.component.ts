import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from 'src/app/services/usuarios-service.service';
import { miUsuario, Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {
  usuarios:Usuario[];
  tiposdeusuarios=['administrador','alumno', 'profesor'];
  public  email: string ;
  public  password: string  ;
  public user = new miUsuario();
  public msjerror: string ;
  urlImage: Observable<string>;
  constructor(private sUsers: UsuariosServiceService, private miAuth: UserServiceService, private authRout: Router, private storage: AngularFireStorage) { }

  ngOnInit() {
      this.sUsers.GetUsers().subscribe(
        usuarios => this.usuarios =usuarios
      );
    /*   this.miAuth.getAuth().subscribe(
        user =>this.user = user
      ) */
  }
  onSubmitRegister(){
/*     this.miAuth.register(this.email, this.password) */

this.miAuth.registrarSinLoguear(this.user.email, this.user.clave) 
    .then(res => {
     
        this.miAuth.getAuth().subscribe(user => {this.user.id = user.uid
          console.log('logueando, yendo a casa', this.urlImage, this.user);
        console.log(this.miAuth.getUser())
        this.sUsers.addUsuario(this.user)
        this.authRout.navigate(['/home']); 
        })
      }
      )


      
   
    .catch( err => this.msjerror = err );
}
onUpload(e){
  console.log('Archivo', e.target.files[0]);
  const file =  e.target.files[0];
  const filePath = "upload/image.jpg";
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  task.snapshotChanges().pipe(finalize( () => this.urlImage = ref.getDownloadURL())).subscribe();//url imagen
  console.log('Uploaded a blob or file!');
}

}

