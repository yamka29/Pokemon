//Fonctions pour remplir les vartiables de classes nécessaires aux tests
fill_types();
fill_attacks();
fill_pokemons();

//fonction utilitaire qui renvoie une liste d'objets (Attaques ou Pokemons) formatée
function displayList(elems, type_elems){
    let list = `Liste des ${elems.length} ${type_elems} : \n`;
    for (let elem of elems){
        list += `- ${elem.toString()} \n`;
    }

    return list;
}

//fonction affichant dans la console, la liste des pokémons pour un type donné en paramètre
function getPokemonsByType(typeName){
    let pokemonsOfThisType = Object.values(Pokemon.all_pokemons).filter(    
        pokemon => pokemon.types.some(
            type => type.name.toLowerCase() === typeName.toLowerCase()
        )
    );

    return displayList(pokemonsOfThisType, "Pokémons");

}
// Fonction affichant la liste des pokémons possédant l'attaque en paramètre
function getPokemonsByAttack(attackName){
    let pokemonWithThisAttack = Object.values(Pokemon.all_pokemons).filter(
        pokemon => pokemon.fast_attacks.concat(pokemon.charged_attacks).some(
            attack => attack.name.toLowerCase() === attackName.toLowerCase()
        )
    )

    return displayList(pokemonWithThisAttack, "Pokémons");
}

function getAttacksByType(typeName){
    let attacksOfType = Object.values(Attack.all_attacks).filter(
        attack => attack.type.toLowerCase() === typeName.toLowerCase()
    )
    return displayList(attacksOfType, "Attaques");
}

function sortPokemonsByTypeThenName() {
    let pokemons = Object.values(Pokemon.all_pokemons);
    pokemons.sort((a, b) => {
        // Compare les types
        if (a.types[0].name < b.types[0].name) return -1;
        if (a.types[0].name > b.types[0].name) return 1;
        // Si les types sont égaux, compare les noms
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0; // Si les types et les noms sont égaux
    })
    return pokemons;
}

console.log("-------------------");
console.log("Pokemons with the move Razor Leaf");
console.log(getPokemonsByAttack('Razor Leaf'))
console.log("-------------------");
// console.log(Attack.all_attacks[221].toString());
// console.log(Type.all_types["Bug"].toString());
// console.log(Pokemon.all_pokemons[1].toString());