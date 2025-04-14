let quoteForm = document.querySelector("#quote-generator-form");
let quoteContainer = document.querySelector(".quote-container");
let userInput =document.querySelector("#user-input");
let pokeQuoteContainer = document.querySelector(".pokemon-and-quote-container");
let pokemonImg = document.querySelector(".pokemon-image");
let loader = document.querySelector("#loading");
let pokemonNotFound = document.querySelector(".not-found-error");
let quote = document.querySelector("#quote");

function displayPokeQuote(response) {
    //TYPEWRITER EFFECT FOR QUOTE
    new Typewriter('#quote', {
        strings: response.data.answer,
        autoStart: true, delay: 2, cursor: ""
    });
    loader.style.display = "none";
}

 function showError() {
        pokemonImg.src = ""; 
        quote.innerHTML = "";
        pokemonNotFound.style.display = "block";
        pokeQuoteContainer.style.display = "none";
    }

function generateQuote(event) {
    //PREVENTS FORM SUBMISSION
    event.preventDefault();

    //RESET STATES
    loader.style.display = "block";
    pokemonImg.src = "";
    quote.innerHTML = "";
    pokeQuoteContainer.style.display = "none";
    pokemonNotFound.style.display = "none";

    //USER INPUT
    let userPokemon = userInput.value.trim().toLowerCase();

    //POKEMON URL
    let pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${userPokemon}`;

    //validate pokemon first
    axios.get(pokemonApiUrl).then((response) => {
    let spriteUrl = response.data.sprites.front_default;
    
    //LOADS/FADES IMAGE
    pokemonImg.classList.remove("fade-in");
    pokemonImg.onload = function () {
    pokemonImg.classList.add("fade-in");
    }
    pokemonImg.src = spriteUrl;


    //BUILD SHECODES AI API
    let aiApiKey = "df0267tdf4o3bfae34b454fb00b472a9";
    let userPrompt = `Pretend you are ${userPokemon} and generate a motivational quote as this Pokemon`;
    let context = `Keep response between 3 to 4 sentences and under 200 characters`;
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${userPrompt}&context=${context}&key=${aiApiKey}`;

    //RUNS DISPLAY FUNCTION
    axios.get(apiUrl).then(displayPokeQuote);

    //MAKES CONTAINER VISIBLE
    pokeQuoteContainer.style.display = "grid"; 

    }).catch(() => {
    loader.style.display = "none";
    showError();
  });
    
}

//SUBMIT FORM BUTTON
quoteForm.addEventListener("submit", generateQuote);