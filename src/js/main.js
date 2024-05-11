"use strict";

/* Moduler */
import { getMenu } from "./menu"; // Importera hämta meny
import { loginUser } from "./login"; // Importera logga in-funktion
import { addNewMeal } from "./menu"; // Importera lägga till maträtt-funktion


/* Variabler */
export const url = "https://projektbackendwebservice.onrender.com/api/"; // API, exporteras
export const menuContainer = document.getElementById("menu-container"); // Meny-container, exporteras
export let errorMsg = document.getElementById("error-message"); // Felmeddelande

const loginContainer = document.getElementById("login"); // Logga in-formulär
const loginBtn = document.getElementById("submit-login"); // Logga in-knapp
const addMealForm = document.getElementById("new-meal"); // Lägg till maträtt-formulär
const addMealBtn = document.getElementById("newMeal"); // Lägg till maträtt-knapp


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

        // Kontroll om lägga till maträtt-formulär finns
        if (addMealForm) {
            addMealBtn.addEventListener("click", (e) => {
                e.preventDefault();
                addNewMeal();
            });

            const formInput = addMealForm.querySelectorAll("input");
            formInput.forEach(input => {
                input.addEventListener("input", () => {
                  //  errorMsg.style.display = "none";
                });
            });
        }
        
}


