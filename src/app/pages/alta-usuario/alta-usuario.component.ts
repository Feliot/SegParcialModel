import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from 'src/app/services/usuarios-service.service';
import { miUsuario, Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {
  usuarios:Usuario[];
  tiposdeusuarios=['administrador','alumno', 'profesor'];

  constructor(private sUsers: UsuariosServiceService) { }

  ngOnInit() {
      this.sUsers.GetUsers().subscribe(
        usuarios => this.usuarios =usuarios
      );
  }

}
