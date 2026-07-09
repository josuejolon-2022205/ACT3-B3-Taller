import { Producto } from "../models/producto";
import { producto } from "../data/producto";
import { estado_venta } from "../models/estado_venta";
import { categoria_producto } from "../models/categoriaProducto";
const estadosValidos: estado_venta[] = ["pagado", "pendiente", "cancelada"];
const categoriasValidas: categoria_producto[] = ["Electrico", "electronico", "de hogar", "comida", "informatico", "escolar"];

export function listarProducto(): Producto[] {
    return producto;
}

export function buscarProducto(id: number): Producto | undefined {
    return producto.find(p => p.id_producto === id);
}

export function crearProducto(nuevoProducto: Producto): Producto | string  {
    if(!nuevoProducto.id_producto) {
        nuevoProducto.id_producto = producto.length + 1;
    }

    if(nuevoProducto.precio <= 0)
        return "el precio no puede ser menor o igual a cero"

    if(nuevoProducto.cantidad < 0)
        return "la cantidad no puede ser negativa "

    if (!estadosValidos.includes(nuevoProducto.estado_venta))
        return "el estado de venta no es valido";

    if(!categoriasValidas.includes(nuevoProducto.categoria))
        return "la categoria no es valida"

    producto.push(nuevoProducto);
    return nuevoProducto;
}

export function actualizarProducto(id: number, ActualizarDatos: Partial<Producto>): Producto | string {
    const producto = buscarProducto(id);

    if(ActualizarDatos.precio !== undefined && ActualizarDatos.precio <= 0)
        return "el precio no puede ser menor o igual a cero"

    if(ActualizarDatos.cantidad !== undefined && ActualizarDatos.cantidad < 0)
        return "la cantidad no puede ser negativa"
    
    if (ActualizarDatos.estado_venta !== undefined && !estadosValidos.includes(ActualizarDatos.estado_venta))
        return "el estado de venta no es valido";

    if(ActualizarDatos.categoria !== undefined && !categoriasValidas.includes(ActualizarDatos.categoria))
        return "la categoria no es valida"

    if (!producto) return "Producto no existe";
    Object.assign(producto, ActualizarDatos);
    return producto;
}

export function eliminarProductoPorId(id: number): void {
    if (producto.length > 0) {
        const nuevosProductos = producto.filter(p => p.id_producto !== id);
        producto.length = 0;
        producto.push(...nuevosProductos);
    }
}

export const calcularSubtotal = (montos: number[]): number =>
    montos.reduce((acumulado, monto) => acumulado + monto, 0);


export const calcularIVA = (subtotal: number, tasaIVA: number): number =>
    subtotal * tasaIVA;


export const calcularTotalFinal = (subtotal: number, iva: number): number =>
    subtotal + iva;


export function calcularVentaProducto(id: number, IVA: number = 0.12): void {
    const productoEncontrado = producto.find(p => p.id_producto === id);

    if (!productoEncontrado) {
        console.log("el producto no existe");
        return;
    }
    const montos = [productoEncontrado.precio];

    const subtotal = calcularSubtotal(montos);
    const iva = calcularIVA(subtotal, IVA);
    const total = calcularTotalFinal(subtotal, iva);

    console.log("|----- resumen de venta ------|")
    console.log("|-- ID:" + productoEncontrado.id_producto)
    console.log("|-- subtotal: " + subtotal)
    console.log("|-- iva: " + iva)
    console.log("|-- total: " + total)
}



