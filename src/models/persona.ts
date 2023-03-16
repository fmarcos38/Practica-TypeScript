export class Persona{
    nombre: string;
    apellido: string;
    edad: number;

    constructor(n: string, a: string, e: number){
        this.nombre = n;
        this.apellido = a;
        this.edad = e;
    }

    //metodo
    saludar(): void{
        console.log(`Hola, mi nombre es: ${this.nombre}`);
    }

};

//clase extendida/heredada de Persona
export class Empleado extends Persona{
    sueldo: number;

    constructor(n: string, a: string, e: number, s: number){
        super(n, a, e);//se agrega super
        this.sueldo = s;
    }
    
    //heredo y a su vez extiendo el metodo
    saludar(): void {
        super.saludar();
        console.log(`Mi puto sueldo es de: ${this.sueldo}`);
    }
};

export class Jefe extends Persona{
    empleados: Empleado[] = [];

    constructor(n: string, a: string, e: number ){
        super(n, a, e);

    }
};