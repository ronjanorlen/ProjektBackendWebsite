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

// export const reviewContainer = document.getElementById("review-container"); // Recension-container


/* När sidan laddas */
window.onload = init();

function init() {
    // Kontrollera om meny-container finns
    if (menuContainer) {
        getMenu();
    }

    // Kontrollera om recension-container finns
  //  if (reviewContainer) {
    //    getReviews();
   // }

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
                localStorage.clear() // Töm localStorage
                window.location.href = "/index.html"; // Skicka användaren till startsidan igen
            });
        }
        
}


