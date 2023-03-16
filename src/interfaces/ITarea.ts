export enum Nivel{
    "Innformativa",
    "Urgente",
    "Bloqueante"
}

export interface ITarea{
    titulo: string,
    descripcion: string,
    completada: boolean,
    urgencia?: Nivel,
    resumen: () => string
}