let quoteForm = document.querySelector("#quote-generator-form");
let quoteContainer = document.querySelector(".quote-container");
let userInput =document.querySelector("#user-input");
let pokeQuoteContainer = document.querySelector(".pokemon-and-quote-container");
let pokemonImg = document.querySelector(".pokemon-image");

function displayPokeQuote(response) {
    //TYPEWRITER EFFECT FOR QUOTE
    new Typewriter('#quote', {
        strings: response.data.answer,
        autoStart: true, delay: 2, cursor: ""
    });
}

function generateQuote(event) {
    //PREVENTS FORM SUBMISSION
    event.preventDefault();
    //USER INPUT
    let userPokemon = userInput.value.trim().toLowerCase();
    //BUILD POKEMON URL
    let pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${userPokemon}`;
    console.log("User typed:", userPokemon);


    axios.get(pokemonApiUrl).then(function (response) {
    let spriteUrl = response.data.sprites.front_default;
    console.log("Sprite URL:", spriteUrl);
    pokemonImg.src = spriteUrl;
    //let pokemonImg = `<img src="${spriteUrl}" height="300" />`;
    
    //quoteContainer.insertAdjacentHTML("afterend", pokemonImg);
    });

    let aiApiKey = "df0267tdf4o3bfae34b454fb00b472a9";
    let userPrompt = `Pretend you are ${userPokemon} and generate a motivational quote as this Pokemon`;
    console.log(userPrompt);
    let context = `Keep response between 3 to 4 sentences and under 200 characters`;
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${userPrompt}&context=${context}&key=${aiApiKey}`;

    axios.get(apiUrl).then(displayPokeQuote);

    pokeQuoteContainer.style.display = "grid"; 
}

//SUBMIT FORM BUTTON
quoteForm.addEventListener("submit", generateQuote);