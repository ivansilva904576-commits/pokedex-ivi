const API_URL = "https://pokeapi.co/api/v2/pokemon/";




const pokemonImage =
    document.getElementById("pokemon-image");

const pokemonName =
    document.getElementById("pokemon-name");

const pokemonNumber =
    document.getElementById("pokemon-number");

const pokemonTypes =
    document.getElementById("pokemon-types");

const pokemonHeight =
    document.getElementById("pokemon-height");

const pokemonWeight =
    document.getElementById("pokemon-weight");

const searchInput =
    document.getElementById("search-input");

const searchButton =
    document.getElementById("search-button");

const previousButton =
    document.getElementById("previous-button");

const nextButton =
    document.getElementById("next-button");

const randomButton =
    document.getElementById("random-button");


let currentPokemon = 25;




async function loadPokemon(pokemon) {

    try {

        pokemonName.textContent = "Carregando...";

        const response =
            await fetch(API_URL + pokemon);

        if (!response.ok) {

            throw new Error("Pokémon não encontrado");

        }

        const data =
            await response.json();


        pokemonNumber.textContent =
            `#${String(data.id).padStart(3, "0")}`;



        pokemonName.textContent =
            data.name;


        pokemonImage.src =
            data.sprites.other["official-artwork"].front_default
            || data.sprites.front_default;

        pokemonImage.alt =
            data.name;



        pokemonTypes.innerHTML = "";

        data.types.forEach(typeData => {

            const typeName =
                typeData.type.name;

            const typeElement =
                document.createElement("span");

            typeElement.classList.add(
                "type",
                typeName
            );

            typeElement.textContent =
                translateType(typeName);

            pokemonTypes.appendChild(
                typeElement
            );

        });


        pokemonHeight.textContent =
            `${(data.height / 10).toFixed(1)} m`;


        pokemonWeight.textContent =
            `${(data.weight / 10).toFixed(1)} kg`;


        currentPokemon =
            data.id;

    }

    catch (error) {

        pokemonName.textContent =
            "Pokémon não encontrado";

        pokemonNumber.textContent =
            "#---";

        pokemonImage.src = "";

        pokemonTypes.innerHTML = "";

        pokemonHeight.textContent =
            "--";

        pokemonWeight.textContent =
            "--";

        console.error(error);

    }

}


function translateType(type) {

    const types = {

        normal: "NORMAL",
        fire: "FOGO",
        water: "ÁGUA",
        electric: "ELÉTRICO",
        grass: "GRAMA",
        ice: "GELO",
        fighting: "LUTA",
        poison: "VENENO",
        ground: "TERRA",
        flying: "VOADOR",
        psychic: "PSÍQUICO",
        bug: "INSETO",
        rock: "PEDRA",
        ghost: "FANTASMA",
        dragon: "DRAGÃO",
        dark: "SOMBRIO",
        steel: "AÇO",
        fairy: "FADA"

    };

    return types[type] || type.toUpperCase();

}




function searchPokemon() {

    const value =
        searchInput.value
            .trim()
            .toLowerCase();

    if (!value) {
        return;
    }

    loadPokemon(value);

}




function previousPokemon() {

    if (currentPokemon > 1) {

        currentPokemon--;

        loadPokemon(currentPokemon);

    }

}




function nextPokemon() {

    if (currentPokemon < 1025) {

        currentPokemon++;

        loadPokemon(currentPokemon);

    }

}



function randomPokemon() {

    const random =
        Math.floor(Math.random() * 1025) + 1;

    loadPokemon(random);

}




searchButton.addEventListener(
    "click",
    searchPokemon
);


searchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchPokemon();

        }

    }
);


previousButton.addEventListener(
    "click",
    previousPokemon
);


nextButton.addEventListener(
    "click",
    nextPokemon
);


randomButton.addEventListener(
    "click",
    randomPokemon
);



loadPokemon(currentPokemon);