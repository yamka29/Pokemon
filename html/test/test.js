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
    let pokemonsWithThisAttack = Object.values(Pokemon.all_pokemons).filter(
        pokemon => pokemon.fast_attacks.concat(pokemon.charged_attacks).some(
            attack => attack.name.toLowerCase() === attackName.toLowerCase()
        )
    );

    return displayList(pokemonsWithThisAttack, "Pokémons");
}

console.log("-------------------");
console.log("Pokemons with the move Razor Leaf");
console.log(getPokemonsByAttack('Razor Leaf'))
console.log("-------------------");

//Fonction affichant la liste des attaques pour un type donné en argument
function getAttacksByType(typeName){
    let attacksWithThisType = Object.values(Attack.all_attacks).filter(
        attack => attack.type.toLowerCase() === typeName.toLowerCase()
    );

    return displayList(attacksWithThisType, "Attaques");
} 

console.log("-------------------");
console.log("Attacks with the type Ghost");
console.log(getAttacksByType('Ghost'))
console.log("-------------------");

// console.log(Attack.all_attacks[221].toString());
// console.log(Type.all_types["Bug"].toString());
// console.log(Pokemon.all_pokemons[1].toString());

//Fonction affichant la liste des Pokemons triés par type puis par ordre alphabétique
function sortPokemonsByTypeThenName(){
    let pokemons = Object.values(Pokemon.all_pokemons);
    
    pokemons.sort((a, b) => {
        // Obtenir les types triés alphabétiquement pour chaque Pokémon
        let typesA = a.types.map(type => type.name.toLowerCase()).sort();
        let typesB = b.types.map(type => type.name.toLowerCase()).sort();
        
        // Comparer les types : joindre les noms en chaîne et comparer
        let typeStrA = typesA.join(',');
        let typeStrB = typesB.join(',');
        
        if (typeStrA < typeStrB) return -1;
        if (typeStrA > typeStrB) return 1;
        
        // Si les types sont identiques, comparer par nom
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    
    // Trier les types de chaque Pokémon en ordre alphabétique pour l'affichage (sans ça les pokemons s'affichent correctement triés mais dans leur ordre de type d'origine)
    for (let pokemon of pokemons) {
        pokemon.types.sort((type1, type2) => {
            if (type1.name < type2.name) return -1;
            if (type1.name > type2.name) return 1;
            return 0;
        });
    }
    
    return displayList(pokemons, "Pokémons");
}

console.log("-------------------");
console.log("All the pokemons sorted by type and name");
console.log(sortPokemonsByTypeThenName())
console.log("-------------------");

// Test de la méthode de classe getWeakestEnemies
console.log("-------------------");
console.log("Test de getWeakestEnemies \n");
console.log("-------------------");

// Test 1 : Attaque "Tackle" (type Normal)
console.log("Test 1 - Attaque Tackle (type Normal):\n");
Pokemon.getWeakestEnemies("Tackle");

// Test 2 : Attaque "Razor Leaf" (type Grass)
console.log("Test 2 - Attaque Razor Leaf (type Grass):\n");
Pokemon.getWeakestEnemies("Razor Leaf");

// Test 3 : Attaque non existante
console.log("Test 3 - Attaque inexistante:\n");
Pokemon.getWeakestEnemies("Skibidi67");

console.log("-------------------");

