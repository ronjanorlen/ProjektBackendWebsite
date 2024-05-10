"use strict";

import { url } from "./main"; // Importera API
import { menuContainer } from "./main"; // Importera meny-container

export async function getMenu() {
    try {
        const response = await fetch(`${url}meals`);
        let menu = await response.json();

        console.table(menu);

        displayMenu(menu);

    } catch (e) {
        console.log(e);
    }
}

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