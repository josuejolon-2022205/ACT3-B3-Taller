import { Producto } from "../models/producto";
import { categoria_producto } from "../types/categoriaProducto";
import { Cliente } from "../models/clientes";
import { listarCliente } from "./clientesService";
import { leerProductos } from "../utils/reader";
import { escribirClientes, escribirProductos } from "../utils/writer";


export async function listarProducto(): Promise<Cliente[] | string> {
    return listarCliente();
}

export async function buscarProducto(id: number): Promise<Producto | null>{
    const productos: Producto[] = await leerProductos();
    return productos.find(p => p.id_producto === id) || null;
}

export async function crearProducto(nuevoProducto: Producto): Promise<void>  {
    const productos: Producto[] = await leerProductos();
    productos.push(nuevoProducto);
    await escribirProductos(productos);
}

export async function actualizarProducto(id: number, ActualizarDatos: Promise<Producto | null>) {
      const productos: Producto[] = await leerProductos();
      if(id <= 0 ) return false;
      
      const index = productos.findIndex(p => p.id_producto === id);
      if(index === -1){
        return false;
      }
    
      productos[index] = { ...productos[index], ...actualizarProducto};
      await escribirProductos;
      return true;
}

export async function eliminarProductoPorId(id: number): Promise<boolean> {
      const productos: Producto[] = await leerProductos();
      if(id <= 0 ) return false;
      
      const index = productos.findIndex(p => p.id_producto === id);
      if(index === -1){
        return false;
      }
    
      productos.splice(index, 1)
      await escribirProductos;
      return true;
}

export const calcularSubtotal = (montos: number[]): number =>
    montos.reduce((acumulado, monto) => acumulado + monto, 0);


export const calcularIVA = (subtotal: number, tasaIVA: number): number =>
    subtotal * tasaIVA;


export const calcularTotalFinal = (subtotal: number, iva: number): number =>
    subtotal + iva;


export async function calcularVentaProducto(id: number, IVA: number = 0.12): Promise<void> {
    
    const data = await leerProductos();
    const productos: Producto[] = typeof data === "string" ? [] : data;
    const producto = productos.find(p => p.id_producto === id);

    if (!producto) {
        console.log("El producto no existe.");
        return;
    }

    const subtotal = calcularSubtotal([producto.precio]);
    const iva = calcularIVA(subtotal, IVA);
    const total = calcularTotalFinal(subtotal, iva);

    console.log("|----- resumen de venta ------|");
    console.log("|-- ID: " + producto.id_producto);
    console.log("|-- subtotal: " + subtotal);
    console.log("|-- iva: " + iva);
    console.log("|-- total: " + total);
}



