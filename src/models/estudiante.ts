import { Curso } from "./curso";

export class Estudiante {
    //propiedades de clase publicas
    nombre: string;
    apellido?:string;//es opcional
    cursos: Curso[];
    //propiedades de clase publicas
    private ID: string = '1234';

    //constructor
    constructor(nombre:string, cursos: Curso[], apellido?:string){//los opcionales van al final
        this.nombre = nombre;
        this.apellido = apellido ? apellido : undefined;
        this.cursos = cursos;
    }

    get horasEstudiadas(): number{
        let horas = 0;

        this.cursos.forEach((c: Curso) => {
            horas += c.horas;
        });

        return horas;
    }

    set Set_ID_Estudiante (id: string){

        this.ID = id;
    };

    get ID_Estudiante (): string{

        return this.ID; //accedo a la propiedad privada SOLO desde acá
    }
};