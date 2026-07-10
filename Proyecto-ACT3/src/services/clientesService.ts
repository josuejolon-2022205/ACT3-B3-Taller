import { Cliente } from "../models/clientes";
import { leerClientes } from "../utils/reader";
import { escribirClientes } from "../utils/writer";
import { validarCliente } from "../utils/validaciones"

export async function listarCliente(): Promise<Cliente[] | string> {
  return listarCliente();
}


export async function buscarCliente(id: number): Promise<Cliente | null> {
  const clientes: Cliente[] = await leerClientes();
  return clientes.find(c => c.id_cliente === id) || null;
}

export async function crearCliente(nuevoCliente: Cliente): Promise<void> {
  const clientes: Cliente[] = await leerClientes();
  clientes.push(nuevoCliente);
  await escribirClientes(clientes);

}

export async function actualizarCliente(id: number, actualizarDatos: Cliente): Promise<boolean> {
  validarCliente(actualizarDatos);
  const clientes: Cliente[] = await leerClientes();
  if(id <= 0 ) return false;
  
  const index = clientes.findIndex(c => c.id_cliente === id);
  if(index === -1){
    return false;
  }

  clientes[index] = { ...clientes[index], ...actualizarDatos};
  await escribirClientes(clientes);
  return true;
}


export async function eliminarClientePorId(id: number): Promise<boolean> {
  const clientes: Cliente[] = await leerClientes();
  if(id <= 0 ) return false;
  
  const index = clientes.findIndex(c => c.id_cliente === id);
  if(index === -1){
    return false;
  }

  clientes.splice(index, 1)
  await escribirClientes;
  return true;
}