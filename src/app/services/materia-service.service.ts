import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import { Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observer, Observable} from 'rxjs';
import { Materia, miMateria } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaServiceService {
  materiaCollection : AngularFirestoreCollection<Materia>;
  materias: Observable<Materia[]>;
  materiaDoc: AngularFirestoreDocument<Materia>;
  private user: Materia;
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private mirouter: Router) { 
      this.materiaCollection = this.db.collection('materias');
    }
    GetUsers(){
          return this.materias = this.materiaCollection.snapshotChanges().pipe(map(actions=>{
            return actions.map(a =>{
              const data= a.payload.doc.data() as Materia;
          /*     data.id = a.payload.doc.id; */
              return data;
            })
          }),)
      }
}
