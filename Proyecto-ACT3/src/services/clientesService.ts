import { cliente } from "../data/clientes"
import { Cliente } from "../models/clientes"

export function listarCliente(): Cliente[] {
  return cliente;
}


export function buscarCliente(id: number): Cliente | undefined {
  return cliente.find(c => c.id_cliente === id);
}

export function crearCliente(nuevoCliente: Cliente): Cliente | string {
  if(nuevoCliente.telefono_cliente.toString().length > 8 || nuevoCliente.telefono_cliente.toString().length < 8)
    return "el telefono tiene que tener mas de 8 digitos o no tener menos de 8 digitos";

  if(!nuevoCliente.correo_cliente.includes("@gmail.com"))
    return "el correo del cliente tiene que tener el dominio de '@gmail.com' "

  if(nuevoCliente.dpi_cliente.toString().length <8)
    return "el dpi no es valido, tiene que tener mas de 8 caracteres"

  if(!nuevoCliente.id_cliente) {
    nuevoCliente.id_cliente = cliente.length + 1;
  }
  cliente.push(nuevoCliente);
  return nuevoCliente;
}

export function actualizarCliente(id: number, actualizarDatos: Partial<Cliente>): Cliente | string {
  const cliente = buscarCliente(id);
  if(!cliente) return "Cliente no encontrado";

  if(actualizarDatos.telefono_cliente !== undefined && actualizarDatos.telefono_cliente.toString().length < 8)
    return "el teléfono debe tener al menos 8 dígitos.";

    if(actualizarDatos.correo_cliente !== undefined && !actualizarDatos.correo_cliente.includes("@"))
      return "Error: el correo no es válido.";
  
  Object.assign(cliente, actualizarDatos);
  return cliente;
}


export function eliminarClientePorId(id: number): void {
  if(cliente.length > 0) {

    const nuevosClientes = cliente.filter(c => c.id_cliente !== id);
    cliente.length = 0;
    cliente.push(...nuevosClientes);
  }
}