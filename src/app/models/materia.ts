
export interface Inscripcion{
 materia?: string
 idalumno?: string
}
export interface Materia {
    nombre?: string;
    cuatrimestre?: string;
    cupo?: string;
    profesor?: string;
}
export class miMateria implements Materia {
    constructor(public nombre?:string,public cuatrimestre?: string, public cupo?: string, 
        public profesor?: string){

    }
}
