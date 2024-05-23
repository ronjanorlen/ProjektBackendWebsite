"use strict";

import { url } from "./main"; // importera API
import { showLoadingMessage, hideLoadingMessage } from "./main"; // Laddningsmeddelanden
import { showPopupMessage } from "./menu"; // Popup-meddelande funktion

const addReviewForm = document.getElementById("addReview"); // Formulär för att lägga till recension
const reviewContainer = document.getElementById("review-container"); // Recension-container

getReviews();

/* Exporterad funktion för att hämta recensioner */
async function getReviews() {
    try {
        // Visa laddningsmeddelenade om seg laddning
        showLoadingMessage();
        
        const response = await fetch (`${url}reviews`);
        let reviews = await response.json();

        // Dölj laddningsmeddelande när innehållet laddats och visas
        hideLoadingMessage();

        // Ta med data till ny funktion
        displayReviews(reviews);

    } catch (e) {
        console.log(e);
    }
}



/* Funktion för att visa recensioner */
function displayReviews(reviews) {
    if (reviewContainer) {
        reviewContainer.innerHTML = ""; 

        // Loopa igenom och skapa div för varje recension
        reviews.forEach(review => {
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review");

            const nameHeading = document.createElement("h3");
            nameHeading.textContent = review.name;

            const reviewText = document.createElement("p");
            reviewText.textContent = `Kommentar: ${review.comment}`;

            const rating = document.createElement("p");
            rating.textContent = `Rating: ${review.rating}/5`;

            const reviewDate = document.createElement("p");

            // Formatera datum
            const date = new Date(review.date);
            const formattedDate = date.toISOString().split('T')[0]; 

            reviewDate.textContent = `Datum: ${formattedDate}`;

            // Lägg till i reviewDiv
            reviewDiv.appendChild(nameHeading);
            reviewDiv.appendChild(reviewText);
            reviewDiv.appendChild(rating);
            reviewDiv.appendChild(reviewDate);
            
            // Lägg till reviewDiv i container
            reviewContainer.appendChild(reviewDiv);
        });
    }
}

/* Lyssnar på submit för formuläret */
addReviewForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    // Hämta värden från formuläret
    const name = document.getElementById("rev-name").value;
    const comment = document.getElementById("rev-com").value;
    const rating = document.querySelector('input[name="rev-rate"]:checked').value;

    // Kontrollera input, meddela om något saknas
    if (!name || !comment || !rating) {
        alert("Fyll i alla fält.");
        return;
    }

    if (rating < 1 || rating > 5) {
        alert("Rating måste vara mellan 1 och 5.");
        return;
    }

    try {
        const response = await fetch(`${url}reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                comment: comment,
                rating: rating
            })
        });

        if (response.ok) {
            // Ladda om recensioner efter att ha lagt till en ny
            getReviews();

            // Återställ formuläret
            addReviewForm.reset();

            // Visa popup-meddelande
            showPopupMessage("Tack för din kommentar!", "popup-message-rev");
        } else {
            alert("Något gick fel, testa igen senare.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Något gick fel, testa igen senare.");
    }
});