import { rl } from "../utils/readline"
import { listarCliente, buscarCliente, crearCliente, actualizarCliente, eliminarClientePorId } from "../services/clientesService"
import { menu } from "./menu"
import { tipo_cliente } from "../models/tipo_cliente"
import { Cliente } from "../models/clientes"

export function menuCliente() {
    console.log("|***----------*  MENU CLIENTE  -----------***|")
    console.log("|--------------------------------------------|")
    console.log("|***- 1. listar clientes              ----***|")
    console.log("|***- 2. buscar cliente por id        ----***|")
    console.log("|***- 3. agregar cliente              ----***|")
    console.log("|***- 4. actualizar cliente           ----***|")
    console.log("|***- 5. eliminar cliente             ----***|")
    console.log("|***- 0. volver al menu principal     ----***|")
    console.log("|--------------------------------------------|")

    rl.question("ingrese una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                const lista = listarCliente();
                if (lista.length === 0) {
                    console.log("No hay clientes registrados.");
                } else {
                    console.log("|***=== ------ Lista de Clientes ------ ===***|");
                    lista.forEach(c => console.log(c));
                }
                menuCliente();
                break;

            case "2":
                rl.question("id del cliente: ", (id) => {
                    const resultado = buscarCliente(Number(id));
                    if (resultado) {
                        console.log("Cliente encontrado:");
                        console.log(resultado);
                    } else {
                        console.log("el cliente no existe.");
                    }
                    menuCliente();
                });
                break;

            case "3":
                console.log("|***=== ------ Agregar Cliente ------ ===***|");
                rl.question("Nombre: ", (nombre) => {
                    rl.question("Apellido: ", (apellido) => {
                        rl.question("Direccion: ", (direccion) => {
                            rl.question("Telefono: ", (telefono) => {
                                rl.question("DPI: ", (dpi) => {
                                    rl.question("Correo: ", (correo) => {
                                        console.log("Tipos de cliente: FRECUENTE, NORMAL, MAYORISTA o NUEVO");
                                        rl.question("Tipo de cliente: ", (tipo) => {
                                            const nuevo = crearCliente({
                                                id_cliente: 0,
                                                nombre_cliente: nombre,
                                                apellido_cliente: apellido,
                                                direccion_cliente: direccion,
                                                telefono_cliente: Number(telefono),
                                                dpi_cliente: Number(dpi),
                                                correo_cliente: correo,
                                                tipo_cliente: tipo as tipo_cliente
                                            });
                                            console.log(nuevo);
                                            menuCliente();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
                break;

            case "4":
                rl.question("id del cliente: ", (id) => {
                    rl.question("nombre nuevo del cliente: ", (nombre) => {
                        rl.question("correo nuevo del cliente: ", (correo) => {
                            const datos: Partial<Cliente> = {};
                            if (nombre.trim() !== "") datos.nombre_cliente = nombre;
                            if (correo.trim() !== "") datos.correo_cliente = correo;
                            const resultado = actualizarCliente(Number(id), datos);
                            console.log(resultado);
                            menuCliente();
                        });
                    });
                });
                break;

            case "5":
                rl.question("id del cliente: ", (id) => {
                    eliminarClientePorId(Number(id));
                    console.log("Cliente eliminado ");
                    menuCliente();
                });
                break;

            case "0":
                menu();
                break;

            default:
                console.log("La opcion no existe.");
                menuCliente();
        }
    });
}
