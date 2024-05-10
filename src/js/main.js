"use strict";

/* Moduler */
import { getMenu } from "./menu"; // Importera hämta meny

/* Variabler */
export const url = "https://projektbackendwebservice.onrender.com/api/"; // API, exporteras
export const menuContainer = document.getElementById("menu-container"); // Meny-container, exporteras

/* När sidan laddas */
window.onload = init();

function init() {
    // Kontrollera om meny-container finns, isf kör getMenu-funktion
    if (menuContainer) {
        getMenu();
    }
}


