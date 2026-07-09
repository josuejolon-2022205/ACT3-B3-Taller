import { tipo_cliente } from "./tipo_cliente"

export interface Cliente{
    id_cliente:number,
    nombre_cliente : string,
    apellido_cliente : string,
    direccion_cliente: string,
    telefono_cliente : number,
    tipo_cliente : tipo_cliente,
    dpi_cliente: number,
    correo_cliente: string


}