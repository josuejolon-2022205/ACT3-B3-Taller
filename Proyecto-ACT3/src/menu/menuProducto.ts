import { rl } from "../utils/readline"
import { listarProducto, buscarProducto, crearProducto, actualizarProducto, eliminarProductoPorId, calcularVentaProducto } from "../services/productoService"
import { menu } from "./menu"
import { categoria_producto } from "../models/categoriaProducto"
import { estado_venta } from "../models/estado_venta"
import { Producto } from "../models/producto"


export function menuProducto() {
    console.log("|***----------***  MENU PRODUCTO  ***-----------***|")
    console.log("|--------------------------------------------------|")
    console.log("|***---- 1. listar productos                ----***|")
    console.log("|***---- 2. buscar producto por id          ----***|")
    console.log("|***---- 3. agregar producto                ----***|")
    console.log("|***---- 4. actualizar producto             ----***|")
    console.log("|***---- 5. eliminar producto               ----***|")
    console.log("|***---- 6. cacular iva del producto        ----***|")
    console.log("|***---- 0. volver al menu principal        ----***|")
    console.log("|--------------------------------------------------|")

    rl.question("ingrese una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                const lista = listarProducto();
                if (lista.length === 0) {
                    console.log("No hay productos bro");
                } else {
                    console.log("|***=== -------- Lista de Productos -------- ===***|");
                    lista.forEach(producto => console.log(producto));
                }
                menuProducto();
                break;

            case "2":
                rl.question("Ingrese el Id del producto: ", (id) => {
                    const resultado = buscarProducto(Number(id));
                    if (resultado) {
                        console.log("Producto encontrado:");
                        console.log(resultado);
                    } else {
                        console.log("Producto no encontrado.");
                    }
                    menuProducto();
                });
                break;

            case "3":
                console.log("|***=== -------- Agregar Producto -------- ===***|");
                rl.question("Nombre del producto: ", (nombre) => {
                    rl.question("Codigo del producto: ", (codigo) => {
                        rl.question("Cantidad: ", (cantidad) => {
                            rl.question("Precio: ", (precio) => {
                                console.log("Categorias: Electrico | electronico | de hogar | comida | informatico | escolar");
                                rl.question("Categoria: ", (cat) => {
                                    console.log("Estado de venta: pagado | pendiente | cancelada");
                                    rl.question("Estado de venta: ", (estado) => {
                                        rl.question("descuento del producto:", (descuento) => {
                                            const nuevo = crearProducto({
                                            id_producto: 0,
                                            nombre_producto: nombre,
                                            codigo_producto: Number(codigo),
                                            cantidad: Number(cantidad),
                                            precio: Number(precio),
                                            categoria: cat as categoria_producto,
                                            estado_venta: estado as estado_venta,
                                            descuento: Number(descuento)
                                        });
                                        console.log(nuevo);
                                        menuProducto();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
                break;

            case "4":
                rl.question("id del producto a actualizar: ", (id) => {
                    rl.question("Nuevo nombre (enter para omitir): ", (nombre) => {
                        rl.question("Nuevo precio (enter para omitir): ", (precio) => {
                            const datos: Partial<Producto> = {};
                            if (nombre.trim() !== "") datos.nombre_producto = nombre;
                            if (precio.trim() !== "") datos.precio = Number(precio);
                            const resultado = actualizarProducto(Number(id), datos);
                            console.log(resultado);
                            menuProducto();
                        });
                    });
                });
                break;


            case "5":
                rl.question("id del producto a eliminar : ", (id) => {
                    eliminarProductoPorId(Number(id));
                    console.log("Producto eliminado");
                    menuProducto();
                });
                break;

            case "6": 
                rl.question("id del producto", (id) => {
                    calcularVentaProducto(Number(id));

                    menuProducto();
                })
                break;

            case "0":
                menu();
                break;

            default:
                console.log("La opcion no existe.");
                menuProducto();
        }
    });
}
