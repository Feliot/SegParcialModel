import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './componets/nav-bar/nav-bar.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { AltaUsuarioComponent } from './pages/alta-usuario/alta-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilmoduleModule } from './utils/utilmodule.module'
//Firebase
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    routingComponents,
    MateriasComponent,
    AltaUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    PagesModule,
    UtilmoduleModule,
    FormsModule,
     ReactiveFormsModule,
     AngularFireAuthModule,
     AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
