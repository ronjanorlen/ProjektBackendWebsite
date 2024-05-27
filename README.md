# DT207G - Backend-baserad webbutveckling, Moment 5.2 - Projektuppgift

Detta repository innehåller koden för frontend-sidan av en webbplats som konsumerar webbtjänsten från 
moment 5.1. Applikationen ger besökare möjlighet att se menyn samt läsa och lämna recensioner. 
Det finns även ett administrationsgränssnitt som kräver att användaren är inloggad. I inloggat läge ges möjlighet 
att hantera menyn och skapa nya användarkonton. 

## Funktioner

### För publika besökare
* Se menyn.
* Se recensioner.
* Lämna recensioner.

### För inloggade användare
* Lägga till maträtt i menyn.
* Ta bort maträtt från menyn.
* Redigera befintlig maträtt i menyn.
* Skapa nya användarkonton.

# Säkerhet

Applikationen använder JSON Web Tokens för hantering av autentisering och säkerställer att endast 
behöriga användare har tillgång till de administrativa sidorna. JSON Web Token sparas 1 timme i 
localStorage.

# Arbetsgång

Webbplatsen är byggd med Parcel för en automatiserad utvecklingsmiljö och är publicerad till Netlify. 
HTML, CSS(SCSS), och JavaScript används för struktur, layout och interaktion. Dessa filer är strukturerade i separata kataloger.
API:et som används är byggt med Node.js och Express och är publicerat till Render. Kommunikation med 
webbtjänsten sker med Fetch API. 

## Skapad:
Av: Ronja Norlén  
Kurs: DT207G Backend-baserad webbutveckling  
Program: Webbutveckling  
Skola: Mittuniversitetet  
År: 2024
