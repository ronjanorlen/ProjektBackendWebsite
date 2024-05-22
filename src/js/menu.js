"use strict";

import { url } from "./main"; // Importera API
import { menuContainer } from "./main"; // Importera meny-container

const updateMealForm = document.getElementById("update-meal"); // Uppdateringsformulär

/* Exporterad async-funktion för att hämta maträtter från databasen */
export async function getMenu() {
    try {
        const response = await fetch(`${url}meals`);
        let menu = await response.json();

        // Ta med data till ny funktion
        displayMenu(menu);

    } catch (e) {
        console.log(e);
    }
}

/* Funktion för att visa meny */
function displayMenu(menu) {
    if (menuContainer) {
        menuContainer.innerHTML = ""; // Rensa innehåll

        // Skapa en lista med kategorierna
        const categories = [...new Set(menu.map(meal => meal.category))];
        // Loopa igenom
        categories.forEach(category => {
            const categoryHeader = document.createElement("h2");
            // Ersätter kategorinamnen med egna namn
            switch (category) {
                case "mainmenu":
                    categoryHeader.textContent = "Huvudmeny";
                    break;
                case "dessert":
                    categoryHeader.textContent = "Dessert";
                    break;
                case "kidsmenu":
                    categoryHeader.textContent = "Barnmeny";
                    break;
                default:
                    categoryHeader.textContent = category;
            }
            menuContainer.appendChild(categoryHeader);

            // Skapa ul-lista
            const categoryList = document.createElement("ul");
            categoryList.classList.add("meal-list"); // Sätt klass på ul-lista

            menu.filter(meal => meal.category === category).forEach(meal => {
                const mealItem = document.createElement("li"); // Skapa li-element
                mealItem.classList.add("meal-item"); // Sätt klass på li-element

                const mealName = document.createElement("span");
                mealName.textContent = `${meal.name} - ${meal.price} kr`;
                mealName.classList.add("meal-name");

                const mealDesc = document.createElement("p");
                mealDesc.textContent = meal.description;
                mealDesc.classList.add("meal-desc");

                mealItem.appendChild(mealName);
                mealItem.appendChild(mealDesc);

                // Skapa knappar för att redigera och ta bort maträtt
                const adminMenu = menuContainer.classList.contains("admin-menu");
                if (adminMenu) {
                    const updateBtn = document.createElement("button");
                    updateBtn.textContent = "Redigera";
                    updateBtn.dataset.mealId = meal._id; // Sätt maträttens ID som ett dataset på knappen
                    updateBtn.addEventListener("click", () => {
                        // Anropa funktion för att visa redigeringsformuläret
                        showUpdateForm(meal);
                    });
                    mealItem.appendChild(updateBtn);

                    // Dölj formulär för att redigera maträtten
                    updateMealForm.style.display = "none";

                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Ta bort";
                    deleteBtn.dataset.mealId = meal._id; // Sätt maträttens ID som ett dataset på knappen
                    deleteBtn.addEventListener("click", () => {
                        // Anropa funktion för att ta bort maträtten
                        deleteMeal(meal._id);
                    });
                    // Lägg ihop allt
                    mealItem.appendChild(deleteBtn);
                }

                categoryList.appendChild(mealItem);
            });

            menuContainer.appendChild(categoryList);
        });
    }
}

/* Funktion för att visa formuläret för att redigera en maträtt */
function showUpdateForm(meal) {
    const editName = document.getElementById("edit-name");
    const editDesc = document.getElementById("edit-desc");
    const editPrice = document.getElementById("edit-price");
    const updateBtn = document.getElementById("editMeal");

    // Fyll formuläret med befintlig info om maträtten
    editName.value = meal.name;
    editDesc.value = meal.description;
    editPrice.value = meal.price;

    // Sätt id för maträtten som en dataattribut på redigera-knappen
    updateBtn.dataset.id = meal._id;

    // Visa formuläret för att redigera maträtten
    updateMealForm.style.display = "block";
    
    // Scrolla ned till fomruläret
    updateMealForm.scrollIntoView({ behavior: 'smooth' });
}

/* Exporterad async-funktion för att redigera maträtt */
export async function updateMeal() {
    const id = document.getElementById("editMeal").dataset.id;
    const editName = document.getElementById("edit-name");
    const editDesc = document.getElementById("edit-desc");
    const editPrice = document.getElementById("edit-price");


    try {
        const response = await fetch(`${url}meals/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("JWT")}`
            },
            body: JSON.stringify({
                name: editName.value,
                description: editDesc.value,
                price: editPrice.value
            })
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Något gick fel vid uppdatering av maträtt: ", result);
            return;
        } else {
            console.log("Maträtt uppdaterad:", result);

            // Dölj formuläret för att redigera maträtten efter uppdatering
            updateMealForm.style.display = "none";

            // Uppdatera menyn efter redigering
            getMenu();
        }
    } catch (error) {
        console.error("Något gick fel vid uppdatering av maträtt: ", error);
    }
}

/* Exportad async-funktion för att lägga till maträtt */
export async function addNewMeal() {
    const name = document.getElementById("new-name").value;
    const description = document.getElementById("meal-desc").value;
    const category = document.getElementById("meal-category").value;
    const price = document.getElementById("new-price").value;
    const addMealForm = document.getElementById("new-meal");

    // Objekt med formulärets inputvärden
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
            console.log("Maträtt tillagd");
            addMealForm.reset(); // Återställ formulär

            getMenu(); // Hämta menyn

        }
    } catch (error) {
        console.error("Något gick fel vid tillägg av ny maträtt: ", error);
    }
}

/* Exporterad async-funktion för att ta bort maträtt */
export async function deleteMeal(id) { // Ta med id
    try {
        const response = await fetch(`${url}meals/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("JWT")}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Något gick fel vid borttagning av maträtt: ", result);
            return;
        } else {
            console.log("Maträtt borttagen:", result);

            // Uppdatera menyn efter borttagning
            getMenu();
        }
    } catch (error) {
        console.error("Något gick fel vid borttagning av maträtt: ", error);
    }
}