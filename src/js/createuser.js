"use strict";

import { url, errorMsg } from "./main"; // Importera API och felmeddelande från main
import { showPopupMessage } from "./menu"; // Popup-meddelande funktion

/* Exporterad async-funktion för att skapa ny användare */
export async function createUser() {

    const token = localStorage.getItem("JWT"); // Hämta token från localStorage

    const username = document.getElementById("new-username"); // Hämta användarnamn från formulär
    const password = document.getElementById("new-password"); // Hämta lösenord från formulär

    try {
        // Skapar nytt objekt för användaren
        const loginData = {
            username: username.value,
            password: password.value
        }

         // POST-anrop med fetch API till webbtjänsten, ta med objekt som skapats för användare
        const response = await fetch(`${url}register`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json(); // Invänta svar och konvertera till json


        // Kontroller om token saknas eller är ogiltig
        if (response.status === 401 || response.status === 403) {
            alert(`${result.message}. Du är inte inloggad eller din session har gått ut. Vänligen logga in igen.`); // Alert-ruta med felmeddelande
            window.location.href = "index.html"; // Omdirigerar till startsida
            return;
            // Kontroll om svaret blev lyckat eller inte
        } else if (!response.ok) {
            console.error("Något gick fel vid skapande av konto: ", data.error); 
            errorMsg.style.display = "block"; 
            errorMsg.innerHTML = data.error;
            return;
            
        } else {
            // Töm innehåll i inputfält
            username.value = "";
            password.value = "";

                // Visa popup-meddelande
            showPopupMessage("Konto skapat", "popup-message-adm");
        }

        // Vid eventuella fel
    } catch (error) {
        console.error("Något gick fel vid skapande av konto: ", error);
    }
}