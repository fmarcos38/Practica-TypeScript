import { deleteAllCookies, deleteCookie, getCookieValue, setCookie } from "cookies-utils";
import { Lista_Cursos } from "./mock/curss.mock";
import { Curso } from "./models/curso";
import { Estudiante } from "./models/estudiante";
import { Empleado, Jefe } from "./models/persona";
import { ITarea, Nivel } from "./interfaces/ITarea";
import { Programar } from "./models/Programar";

//declaración de variables
var nombre: string = 'Marcos';
var error: boolean = true;
var apellido: any = "lopez"; //por ser any la puedo cambiar a number POR ejm
apellido = 3;
const PI: number = 3.14;
let listaTareas: string[] = ["tarea1", "tarea2"]; //array de string
let listaTipos:  (string | number | boolean)[] = [false, "hola", 2]; //array de elemnt de distintos tipos

//Instacia multiple de variables
let a:string, b:boolean, c:number;
a = "pepe";
b = false;
c = 5;

//enumerados--------------------------------------------------------
enum Estado { //el valor de c/elemnt es creciente -> 
    "completo", //0
    "incoompleto", //1
    "Pendiente" //2
}; //el valor de c/elemnt es creciente -> 
let estadoTarea: Estado = Estado.completo; 
console.log("Estado: ", estadoTarea);//muetra 0

//interfaces --> es como un obj---------------------------------------
interface Tarea {
    nombre: string,
    estado: Estado,
    urgencia: number
};
let tarea1: Tarea = {
    nombre: "pedo",
    estado: Estado.Pendiente,
    urgencia: 2
};

//creo un tipo---------------------------------
type Producto = {
    nombre: string,
    precio: number
};
let coche1: Producto = {
    nombre: "Audi A4",
    precio: 45000
};

// iterar un array/lista ----------------------------------------------
let listaTareasNuevas: Tarea[] = [
    {
        nombre: "Tarea 1",
        estado: Estado.Pendiente,
        urgencia: 2
    },
    {
        nombre: "Tarea 2",
        estado: Estado.Pendiente,
        urgencia: 2
    },
    {
        nombre: "Tarea 3",
        estado: Estado.Pendiente,
        urgencia: 2
    }
];

listaTareasNuevas.forEach((elemnto: Tarea, index: number) =>{
    console.log(`Tarea ${index}: ${elemnto.nombre}`);
});


//------------------------------funciones----------------------------------//
function saludar(nombre:string) {
    console.log(`Hola ${nombre}`);
};
function despedir(nombre:string = 'Pepe') {
    console.log(`Chau ${nombre}`);
};
function despedirOpcional(nombre?:string) {
    if(nombre){
        console.log(`Chau ${nombre}`);
    }else{
        console.log(`Chau`);
    }    
};
//funcion con parametero opcional entre 2 tipos 
function stringOnumber(a: string | number) {
    if(typeof(a) === 'string'){console.log("String")}
    else if(typeof(a) === 'number'){console.log("Number")}
    else{
        console.log("Ni String Ni Number");
        throw Error("No es el tipo esperado");
    }
}
//funcion con return Y especificando el tipo de devolución
function retornaString(b: string): string {//si fuese void en ves de :string la funcion no retorna nada
    return `Hola ${b}`;
}
//invocacion
saludar(nombre);
despedir();
despedir(nombre);
despedirOpcional();
despedirOpcional(nombre);
stringOnumber(nombre);
stringOnumber(PI);
retornaString(nombre);

//---------------FIN FUNC-------------------------------------------------

//---------------Objetos-------------------------------------------------
type Trabajador = {
    nombre: string,
    edad: number
};

let empleado1: Trabajador = {
    nombre: "Jose",
    edad: 22
}; 

//defino una funcion flecha para mostrar el cont del objeto
const muestraEmp = (emp: Trabajador) => {
    console.log(emp);
};
const muestraEmpNombre = (emp: Trabajador): string => {
    return `Nombre: ${emp.nombre}`;
};
muestraEmp(empleado1);
console.log(muestraEmpNombre(empleado1));
//--------------FIN OBJ---------------------------------------------------

//--------------FUNCIONESD ASINCRONAS------------------------------------
//funcion void
async function asyncEjm(): Promise<void>{
    await console.log("Tarea a completar, antes de seguir con otra linea de codigo");
};
//funcion con return
async function asyncEjmString(): Promise<string>{
    await console.log("Tarea a completar, antes de seguir con otra linea de codigo");
    return "completado";
};

//invoco la funcion async
asyncEjm()
.then(resp => {
    console.log("resp:", resp);
}).catch(error => {
    console.log("Error:", error);
}).finally(() => {
    console.log("Fin");
});

//funciones generadoras SE usa --> *
function* ejmGeneradora(){
    //se utiliza la palabra yield -> para emitir valores

    let index = 0;

    while(index < 3){
        yield index ++;
    }
}
//invoco func generadora
let generadora = ejmGeneradora();
console.log(generadora.next().value);
console.log(generadora.next().value);
console.log(generadora.next().value);
//-------------------------------------------------------------------------

//---sobrecarga de funciones-----------------------------------------------
//una unica funcion q recibe un parametro q puede ser de distintos tipos
//y segun el param es lo q hace
function muestraDato(dato: string | number): void  {
    if(typeof(dato) === "string"){console.log("string")}
    if(typeof(dato) === "number"){console.log("number")}
};



/* -----PERSISTENCIA DE DATOS-------------------------------------------- */
/**
 * LocalStorage --> Almacena los datos en el navegador (no se eliminan automaticamnt)
 * SesionStorage --> los datos persisten en la sesión del navegador, se cierra dicha sesión Chau datos
 * Cookies --> tienen una fecha de caducidad y tienen un ambito de URL
 */

//---localstorage---//
//--guardar 
//localStorage.set("nombre", "marcos");
//--leer
//localStorage.get("nombre");

//---Cookies---// ---> depende SI es para Front o Back es la dependencia q se utiliza
const cookieOptions = {
    name: "usuario", // string,
    value: "Marcos", // string,
    maxAge: 10 * 60, // optional number (value in seconds),
    expires: new Date(2099, 10, 1), // optional Date,
    path: "/", // optional string,
    
};
//seteo cookies
setCookie(cookieOptions);
//leo la cookie
let cookieLeida = getCookieValue("usuario");
//elimino cookie
deleteCookie("usuario");
//elim todas las cookies
deleteAllCookies();

/* -----FIN PERSISTENCIA DE DATOS-------------------------------------------- */



/* ----CLASE----------------------------------------------------------------- */
class Temporizador {
    
    public terminar?: (tiempo:number) => void; //defino una variable a la cual le asigno una funcion void

    public empezar(): void {
        setTimeout(() => {

            if(!this.terminar) return;

            //Cuando haya pasado el tiempo, se ejecutará la uncion terminar
            this.terminar(Date.now());

        }, 10000);
    }
};

const miTemp: Temporizador = new Temporizador();
miTemp.terminar = (tiempo:number) => {
    console.log("Fin en", tiempo);
};
miTemp.empezar();//lanzo el temporizador

//ejm de otro evento
//imprimir "tic" cada segundo
setInterval(() => console.log("tic"), 1000);

//eliminar la ejecucion de la funcion
delete miTemp.terminar;

//---------------------------------------------------
//--ejm CLASES

//creo una array/lista para almacenar dichos cursos creados
const listaCursos: Curso[] = Lista_Cursos;

Curso

//creo estudiante
const estudiant1: Estudiante = new Estudiante("Martín", listaCursos, "Lopez");
console.log(`${estudiant1.nombre} ${estudiant1.apellido} estudia: `);
estudiant1.cursos.forEach(c => {
    console.log(`- ${c.nombre} horas del curso (${c.horas})`);
});

//añado un nuevo curso al est1
const curso3: Curso = new Curso("Angular", 40);//creo el curso a agregar
estudiant1.cursos.push(curso3);
//muestro horas estud del alumn1
estudiant1.horasEstudiadas;//return number
/* ----------------------------------------------------------------------------------- */

/* ---Herencia y Polimorfismo--------------------------------------------------------- */
let emp1 = new Empleado("pepe", "lopez", 33, 2000);
let emp2 = new Empleado("jose", "lopez", 33, 2000);
emp1.saludar();//hereda de Persona

let jefe = new Jefe("sole", "lopez", 33);
jefe.empleados.push(emp1, emp2);

/* --Uso de innterfaces---------------------------------------------------------------- */
let programar: ITarea = {
    titulo: "Programar en TS",
    descripcion: "Practicar con katas para aprender TS",
    completada: false,
    urgencia: Nivel.Urgente,
    resumen: function(): string{
        return `${this.titulo} - ${this.completada}`
    }
}
console.log(programar);

//tarea de programación (implementa ITarea)
let programarTS = new Programar("TS", "lnguaje typescript", false, Nivel.Urgente);
console.log(programarTS);

/* -----------------FIN INTERFACES----------------------------------------------------- */


/* -----DECORADORES-------------------------------------------------------------------- */
/*Decoradors exprimentales 
-clases
-parámetros
-Metodos
-Propiedades
 */










//--EVENTTARGET--------------------------------------
//acceder a un elemento html, y a su evento
//por ejm al click de un boton
/* decodeURIComponent.getElementById("boton-login").addEventListener('click', () => {
    console.log("Has hecho click en Login");
}); */
//-----------------------------------------------------------------------------------


//formas de mostrar
/* console.log("hola, " + nombre);
console.log("¿Q tal ", nombre, "?");
console.log(`Hola ${nombre}`); */










