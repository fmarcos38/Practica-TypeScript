import { ITarea, Nivel } from "../interfaces/ITarea";

export class Programar implements ITarea{
    titulo: string;
    descripcion: string;
    completada: boolean;
    urgencia?: Nivel | undefined
    
    constructor(t: string, d: string, c: boolean, u: Nivel){
        this.titulo = t;
        this.descripcion = d;
        this.completada = c;
        this.urgencia = u;
    }

    resumen = () => {
        return `Tarea de  programación: ${this.titulo}`
    }
}