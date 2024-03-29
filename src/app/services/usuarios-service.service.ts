import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {
  usuariosCollection : AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;
  usuarioDoc: AngularFirestoreDocument<Usuario>;
  user: Usuario = {id:'1'};
  usuariosAux: Usuario[];
  constructor(public db: AngularFirestore) {
    /* this.usuarios = this.db.collection('usuarios').valueChanges(); */
    this.usuariosCollection = this.db.collection('usuarios');
    
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions=> actions.map(a =>{
        const data= a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    ),);
  }

  GetUsers(){
    /*   console.log(this.usuarios); */
      /* return this.usuarios = this.usuarios */
        return this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(actions=>{
          return actions.map(a =>{
            const data= a.payload.doc.data() as Usuario;
            data.id = a.payload.doc.id;
            return data;
          })
        }),)
    }
    GetUsersFiltro(  filtro: string,  campo:string){
      console.log(filtro, campo);
      //sacado de https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
      this.usuarios = this.db.collection('usuarios', ref => ref.where(campo, '==', filtro))
      .snapshotChanges().pipe(map(actions=>{
        return actions.map(a =>{
          const data= a.payload.doc.data() as Usuario;
          data.id = a.payload.doc.id;
          console.log(data.id);
          return data;
        })
      }),)
      }
   DevolverUsuarioFiltro(filtro: string,  campo:string){
        return new Promise((resolve, reject) => {
      resolve(this.GetUsersFiltro(filtro, campo)), err=> reject(err)})
      }


    getUsuariosSC(){
      return new Promise((resolve, reject) => {
        resolve(this.usuarios.subscribe( usuario=>{this.usuariosAux = usuario
        console.log(usuario, this.usuariosAux );
        } ))
        , err=> reject(err)})
      }
    getAuxUsers(){
      return this.usuariosAux;
    }
      
    deleteUsuario(usuario: Usuario){
      if (confirm("¿Realmente desea eliminar el Usuario?")){
      this.usuarioDoc= this.db.doc(`usuarios/${usuario.id}`);
      console.log(this.usuarioDoc);
      this.usuarioDoc.delete();
      }
    }
    addUsuario(usuario: Usuario){
       /*  this.usuariosCollection.add(usuario); */
        const param = JSON.parse(JSON.stringify(usuario));
        console.log(param);
        this.usuariosCollection.add(param);
    }
    updateUsuario(usuario:Usuario){
      this.usuarioDoc= this.db.doc(`usuarios/${usuario.id}`);
      this.usuarioDoc.update(usuario);
    }

}

