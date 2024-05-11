"use strict";

import { url } from "./main"; // Importera API
import { menuContainer } from "./main"; // Importera meny-container

/* Exporterad async-funktion för att hämta maträtter från databasen */
export async function getMenu() {
    try {
        const response = await fetch(`${url}meals`);
        let menu = await response.json();

        displayMenu(menu);

    } catch (e) {
        console.log(e);
    }
}

/* Funktion för att visa meny */
function displayMenu(menu) {
   
    if (menuContainer) {
        menuContainer.innerHTML = "";

        menu.forEach(meal => {
            const mealItem = document.createElement("div");
            mealItem.classList.add("menu-item");
            mealItem.innerHTML = `
            <h2>Namn: ${meal.name} </h2>
            <p>Beskrivning: ${meal.description}</p>
            <p>Kategori: ${meal.category} </p>
            <p>Pris: ${meal.price} </p>
            `;
            menuContainer.appendChild(mealItem);
        });
    }
}

/* Exportad async-funktion för att lägga till maträtt */
export async function addNewMeal() {
    const name = document.getElementById("new-name").value;
    const description = document.getElementById("meal-desc").value;
    const category = document.getElementById("meal-category").value;
    const price = document.getElementById("new-price").value;
    const addMealForm = document.getElementById("new-meal");
    
    // Objekt med formulärets inputvärdet
    const newMealData = {
        name,
        description,
        category,
        price
    };

    try {
        const response = await fetch(`${url}meals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("JWT")}`
            },
            body: JSON.stringify(newMealData)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Något gick fel vid tillägg av ny maträtt: ", result);
            return;
        } else {
            addMealForm.reset(); // Återställ formulär

            getMenu(); // Hämta menyn

        }
    } catch (error) {
        console.error("Något gick fel vid tillägg av ny maträtt: ", error);
    }
}