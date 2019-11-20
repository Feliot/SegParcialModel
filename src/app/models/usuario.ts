export interface Roles{
    alumno?: boolean;
    profesor?:boolean;
    administrador?:boolean;
}
export interface Usuario {
    id?: string;
    email?: string;
    clave?: string;
    tipo?: string;
}
export class miUsuario implements Usuario {
    constructor(public id?:string,public email?: string, public clave?: string, public tipo?: string){

    }
}
