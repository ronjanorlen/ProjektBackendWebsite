"use strict";

/* Moduler */
// Importa funktioner från menu.js
import { getMenu, addNewMeal, updateMeal, deleteMeal } from "./menu"; 


// Importera logga in, skapa användare
import { loginUser } from "./login"; 
import { createUser } from "./createuser";


/* Variabler */
export const url = "https://projektbackendwebservice.onrender.com/api/"; // API, exporteras
export const menuContainer = document.getElementById("menu-container"); // Meny-container, exporteras
export let errorMsg = document.getElementById("error-message"); // Felmeddelande

const loginContainer = document.getElementById("login"); // Logga in-formulär
const loginBtn = document.getElementById("submit-login"); // Logga in-knapp
const logoutBtn = document.getElementById("log-out"); // Logga ut-knapp

const addMealForm = document.getElementById("new-meal"); // Lägg till maträtt-formulär
const addMealBtn = document.getElementById("newMeal"); // Lägg till maträtt-knapp 

const updateMealForm = document.getElementById("update-meal"); // Redigera maträtt-formulär
const updateMealBtn = document.getElementById("editMeal"); // Uppdatera maträtt-knapp
const deleteBtn = document.getElementById("deleteBtn"); // Ta bort maträtt-knapp

const addUserForm = document.getElementById("userForm"); // Skapa ny användare-formulär
const addUserBtn = document.getElementById("submit-user"); // Lägg till ny användare-knapp

const protectedRoute = document.getElementById("protected-route"); // Skyddade routes


/* När sidan laddas */
window.onload = init;

function init() {
    // Kontrollera om besökaren står på skyddad sida eller ej
    if (["/admin.html", "/adminmenu.html", "/createuser.html"].includes(window.location.pathname)) {
        const token = localStorage.getItem("JWT"); // Hämta token från localStorage
        // Kontroll om token saknas
        if (!token) {
           window.location.href = "index.html"; // Omdirigerar till startsidan
        } else {
            // Om token finns, visa skyddad innehåll
            if (protectedRoute) {
                protectedRoute.style.display = 'block';
            }
        }
    }

    // Dölja skyddat innehåll om token saknas
    if (protectedRoute) {
        const token = localStorage.getItem("JWT");
        if (!token) {
            protectedRoute.style.display = 'none';
        }
    }

    // Kontrollera om meny-container finns
    if (menuContainer) {
        showLoadingMessage(); // Visa laddningsmeddelande
        getMenu().then(hideLoadingMessage).catch(hideLoadingMessage); // Hämta meny och dölj laddningsmeddelande
    }

    // Kontrollera om logga in-container finns
    if (loginContainer) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loginUser();
        });
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
                // errorMsg.style.display = "none";
            });
        });
    }

    // Kontroll om redigera maträtt-formulär finns
    if (updateMealForm) {
        updateMealBtn.addEventListener("click", (e) => {
            e.preventDefault();
            updateMeal();
        });
    }

    // Kontroll om ta bort maträtt-knapp finns
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            const id = deleteBtn.dataset._id; // Hämta maträttens ID från knappen
            deleteMeal(id); // Skicka med maträttens ID till deleteMeal-funktionen
        });
    }

    // Kontroll om formulär för att lägga till användare finns
    if (addUserForm) {
        addUserBtn.addEventListener("click", (e) => {
            e.preventDefault();
            createUser();
        });
    }

    // Kontroll om logga ut-knapp finns
    if (logoutBtn) {
        // Händelselyssnare för att logga ut
        logoutBtn.addEventListener("click", () => {
            localStorage.clear(); // Töm localStorage
            window.location.href = "/index.html"; // Skicka användaren till startsidan igen
        });
    }
}

/* Visa laddningsmeddelande */
export function showLoadingMessage() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.style.display = 'block';
    }
}

/* Dölj laddningsmeddelande */
export function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }
}