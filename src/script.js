let quoteForm = document.querySelector("#quote-generator-form");
let quoteContainer = document.querySelector(".quote-container");
let userInput =document.querySelector("#user-input");
let pokeQuoteContainer = document.querySelector(".pokemon-and-quote-container");
let pokemonImg = document.querySelector(".pokemon-image");
let loader = document.querySelector("#loading");
let pokemonNotFound = document.querySelector(".not-found-error");
let quote = document.querySelector("#quote");
let currentPokemon = "";

function showLoading() {
    loader.style.display = "block";
} 

function hideLoading() {
    loader.style.display = "none";
}

function showNotFoundError() {
    pokemonImg.src = ""; 
    quote.innerHTML = "";
    pokemonNotFound.style.display = "block";
    pokeQuoteContainer.style.display = "none";
}

function resetForm() {
    loader.style.display = "block";
    pokemonImg.src = "";
    quote.innerHTML = "";
    pokeQuoteContainer.style.display = "none";
    pokemonNotFound.style.display = "none";
}

function showQuoteAndPokemon() {
    pokeQuoteContainer.style.display = "grid";
}

//TYPEWRITER EFFECT FOR QUOTE
function displayPokeQuote(response) {
    let message = `<span class="pokemon-says">${currentPokemon} says:</span> ${response.data.answer}`;

    new Typewriter('#quote', {
        strings: message,
        autoStart: true, delay: 2, cursor: ""
    });
    hideLoading();
}

function getMotivationalQuote(pokemonName) {
    let aiApiKey = "df0267tdf4o3bfae34b454fb00b472a9";
    let context = `Keep response between 2 to 3 sentences and under 200 characters`;

    let userPrompt = `Pretend you are ${pokemonName} and generate a motivational quote as this Pokemon`;
    
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${userPrompt}&context=${context}&key=${aiApiKey}`;

    return axios.get(apiUrl);
}

function getPokemonImage(pokemonName) {
    let pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    return axios.get(pokeApiUrl);
}

//LOADS LIST TO CHECK WHAT POKEMON IS INPUTTED BEFORE SUBMITTING
function loadPokemonList() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000")
    .then((response) => {
      pokemonList = response.data.results.map(p => p.name.toLowerCase());
    })
    .catch((error) => {
      console.error("Failed to load Pokémon list", error);
    });
}

loadPokemonList();

function generateQuote(event) {
    event.preventDefault();

    resetForm();
    showLoading();

    //USER INPUT
    let initialInput = userInput.value.trim().toLowerCase();

    //extracts pokemon name from input
    function extractPokemonName(input) {
        if (!pokemonList.length) return null;

        const words = input.toLowerCase().split(/\W+/);
        return pokemonList.find(name => words.includes(name));
    }

    let userPokemon = extractPokemonName(initialInput);
    currentPokemon = userPokemon;


    if (!userPokemon) {
        showNotFoundError();
        hideLoading();
        return;
    }

    getPokemonImage(userPokemon)
        .then((response) => {
            let spriteUrl = response.data.sprites.front_default;
            //LOADS/FADES IMAGE
            pokemonImg.classList.remove("fade-in");
            pokemonImg.onload = () => {pokemonImg.classList.add("fade-in")};
            pokemonImg.src = spriteUrl;

            showQuoteAndPokemon();

            return getMotivationalQuote(userPokemon);
    }).then(displayPokeQuote).catch(() => {
        hideLoading();
        showNotFoundError();
    });
}

//SUBMIT FORM BUTTON
quoteForm.addEventListener("submit", generateQuote);