import { rl } from "../utils/readline"
import { menuCliente } from "./menuCliente"
import { menuProducto } from "./menuProducto"

export function menu() {
    console.log("\n|***--------  MENU PRINCIPAL  ---------***|")
    console.log("|------------------------------------------|")
    console.log("|***- 1. menu cliente               ----***|")
    console.log("|***- 2. menu producto              ----***|")
    console.log("|***- 0. salir                      ----***|")
    console.log("|------------------------------------------|")

    rl.question("ingrese una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                menuCliente();
                break;

            case "2":
                menuProducto();
                break;

            case "0":
                console.log("adios");
                rl.close();
                break;

            default:
                console.log("La opcion no existe.");
                menu();
        }
    });
}
