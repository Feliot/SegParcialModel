import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routingComponents , AppRoutingModule } from '../app-routing.module';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
/* import { UsuariosService } from '../services/usuarios.service'; */
import { MaterialModule } from '../material';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: []
})
export class PagesModule { }
