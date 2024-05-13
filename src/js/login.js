"use strict";

import { url } from "./main"; // Importera API
import { errorMsg } from "./main"; // Importera felmeddelande

export async function loginUser() {
    const username = document.getElementById("username").value; // Hämtar användarnamn från formulär
    const password = document.getElementById("password").value; // Hämtar lösenord från formulär

    try {

        // Skapa nytt objekt för användare
        const loginData = {
            username: username,
            password: password
        }

        // POST-anrop med fetch API till webbtjänsten, ta med objekt som skapats för användare
        const response = await fetch(`${url}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        });
        
        const data = await response.json(); // Invänta svar och konvertera till json

        // Kontroll om svaret är lyckat eller inte
        if (!response.ok) {
            console.error("Inloggningsfel: ", data.error); 
            errorMsg.style.display = "block"; 
            errorMsg.innerHTML = data.error;
            return;

            // Vid lyckat svar
        } else {
            localStorage.setItem("JWT", data.response.token); // Spara JWT-token i localStorage
            localStorage.setItem("username", username); // Spara användarnamnet i localStorage
            window.location.href = "/admin.html"; // Omdirigera användaren till admin-sida
        }

        // Vid eventuella fel
    } catch (error) {
        console.error("Något gick fel vid inloggning: ", error);
    }
}