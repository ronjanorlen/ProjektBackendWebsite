"use strict";

/* Moduler */
// Importa funktioner från menu.js
import { getMenu, addNewMeal, updateMeal, deleteMeal } from "./menu"; 
import { showPopupMessage } from "./menu"; //


// Importera logga in, skapa användare
import { loginUser } from "./login"; 
import { createUser } from "./createuser";

// Importera hämta recension-funktion
import { getReviews } from "./review";


/* Variabler */
export const url = "https://projektbackendwebservice.onrender.com/api/"; // API, exporteras
export const menuContainer = document.getElementById("menu-container"); // Meny-container, exporteras
export let errorMsg = document.getElementById("error-message"); // Felmeddelande
export const reviewContainer = document.getElementById("review-container"); // Container för recensioner

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

const messageForm = document.getElementById("messageForm"); // Kontaktformulär
const submitMessageBtn = document.getElementById("submit-message"); // Skicka meddelande-knapp

const menuButton = document.querySelector(".menu-button"); // Meny-knapp
const dropdownMenu = document.querySelector(".dropdown-menu"); // Dropdown-meny

/* När sidan laddas */
window.onload = init;

function init() {
    // Kontrollera om besökaren står på skyddad sida eller ej
    if (["/admin", "/adminmenu", "/createuser"].includes(window.location.pathname)) {
        const token = localStorage.getItem("JWT"); // Hämta token från localStorage
        // Kontroll om token saknas
        if (!token) {
            window.location.href = "login.html"; // Omdirigera till login.html om token saknas
            return; // Avsluta funktionen
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

    // Kontroll om kontaktformulär finns 
    if (messageForm) {
        // Händelselyssnare på knapp
        submitMessageBtn.addEventListener("click", (e) => {
            e.preventDefault();
            messageForm.reset(); // Återställ formulär
            // Visa popup
            showPopupMessage("Tack för ditt meddelande!", "popup-sent-message");
        });
    }

    // Kontroll om recensioncontainer finns 
    if (reviewContainer) {
        getReviews();
    }

    // Kontroll om meny-knappen finns
    if (menuButton) {
        menuButton.addEventListener("click", () => {
            dropdownMenu.classList.toggle("show");
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