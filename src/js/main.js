"use strict";

/* Moduler */
import { getMenu } from "./menu"; // Importera hämta meny
import { loginUser } from "./login"; // Importera logga in-funktion


/* Variabler */
export const url = "https://projektbackendwebservice.onrender.com/api/"; // API, exporteras
export const menuContainer = document.getElementById("menu-container"); // Meny-container, exporteras
export let errorMsg = document.getElementById("error-message"); // Felmeddelande

const loginContainer = document.getElementById("login"); // Logga in-formulär
const loginBtn = document.getElementById("submit-login"); // Logga in-knapp


/* När sidan laddas */
window.onload = init();

function init() {
    // Kontrollera om meny-container finns
    if (menuContainer) {
        getMenu();
    }

    // Kontrollera om logga in-container finns
    if (loginContainer) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loginUser();
        });
    }
        // Kontroll om besökaren står på skyddad sida eller ej
        if (["/admin.html", "/adminmenu.html"].includes(window.location.pathname)) {
            const token = localStorage.getItem("JWT"); // Hämta token från localStorage
            // Kontroll om token saknas
            if (!token) {
                alert("Du är inte inloggad eller din session har gått ut. Vänligen logga in igen."); // Alert-ruta med felmeddelande
                window.location.href = "login.html"; // Omdirigerar till inloggningssidan
            } else {
            
            };
        }
}


