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


// Fonction jouant un tour de combat et retournant les données du tour avec les dégâts
function playRound(attacker, defender, tourNumber) {
    //on cherche l'attaque la plus forte contre cet ennemi
    let res = attacker.getBestFastAttacksForEnemy(false, defender.name);
    
    if (!res) {
        return null;
    }
    
    // on renvoie les données du tour pour les insérer dans le tableau
    return {
        Tour: tourNumber,
        Attaquant: attacker.name,
        ATK: attacker.stat_attack,
        Défenseur: defender.name,
        DEF: defender.stat_defense,
        "Nom Attaque": res.atk.name,
        Efficacité: res.eff.toFixed(2),
        Dégâts: res.pts.toFixed(2)
    };
}

//Fonction affichant le déroulement d'un combat entre deux pokémons sous forme de tableau
function fastFight(pokemonNameA, pokemonNameB){
    // on récupère les deux Pokémons
    let pokemonA = null;
    let pokemonB = null;
    
    for (let pokemon of Object.values(Pokemon.all_pokemons)) {
        if (pokemon.name === pokemonNameA) pokemonA = pokemon;
        if (pokemon.name === pokemonNameB) pokemonB = pokemon;
    }
    
    // on vérifie que les deux Pokémons existent
    if (!pokemonA || !pokemonB) {
        console.log("Erreur : un ou les deux Pokémons n'a pas été trouvé ou n'existe pas");
        return null;
    }
    
    // on réinitialise les HP des Pokémons 
    let hpA = pokemonA.stat_stamina;
    let hpB = pokemonB.stat_stamina;
    
    // on initialise les variables du combat
    let tour = 1;
    let combatRound = [];
    
    //on simule le combat :
    while (hpA > 0 && hpB > 0) {
        // Tour de pokemonA ou il attaque pokemonB 
        let round = playRound(pokemonA, pokemonB, tour);
        if (round) {
            hpB = hpB - Number(round.Dégâts);
            round["Reste HP"] = Math.max(0, hpB).toFixed(0);
            combatRound.push(round);
        }
        
        if (hpB <= 0) break;
        
        tour++;
        
        // Tour de pokemonB ou il attaque pokemonA
        round = playRound(pokemonB, pokemonA, tour);
        if (round) {
            hpA = hpA - Number(round.Dégâts);
            round["Reste HP"] = Math.max(0, hpA).toFixed(0);
            combatRound.push(round);
        }
        
        if (hpA <= 0) break;
        
        tour++;
    }
    
    // on affiche le tableau du combat dans la console
    console.log(`\n=== COMBAT: ${pokemonA.name} vs ${pokemonB.name} ===\n`);
    console.table(combatRound);
    
    // et le vainqueur
    if (hpA > 0) {
        console.log(`\n ${pokemonA.name} remporte le combat ! GG`);
    } else {
        console.log(`\n ${pokemonB.name} remporte le combat ! GG`);
    }
    console.log("-------------------\n");
}

console.log("-------------------");
console.log("All the pokemons sorted by type and name");
console.log(sortPokemonsByTypeThenName())
console.log("-------------------");

// Test de la méthode de classe getWeakestEnemies
console.log("-------------------");
console.log("Test de getWeakestEnemies \n");
console.log("-------------------");

// Test 1 : Attaque "Tackle" (type Normal) (devrait renvoyer la quasi totalité des pokémons sauf type Ghost)
console.log("Test 1 - Attaque Tackle (type Normal):\n");
Pokemon.getWeakestEnemies("Tackle");

// Test 2 : Attaque "Razor Leaf" (type Grass) (devrait renvoyer plusieus doubles types)
console.log("Test 2 - Attaque Razor Leaf (type Grass):\n");
Pokemon.getWeakestEnemies("Razor Leaf");

// Test 3 : Attaque non existante
console.log("Test 3 - Attaque inexistante:\n");
Pokemon.getWeakestEnemies("Skibidi67");

console.log("-------------------");

// Test de la méthode getBestFastAttacksForEnemy
console.log("-------------------");
console.log("TEST: getBestFastAttacksForEnemy\n");
console.log("-------------------");

// Test 1 : Bulbizarre contre Dracaufeu(charmander) (print = true) Tackle devrait être la meilleure attaque
console.log("Test 1 - Bulbizarre (Grass/Poison) les meilleures attaques contre Charmander (Fire):");
let bulbizarre = Pokemon.all_pokemons[1];
let res1 = bulbizarre.getBestFastAttacksForEnemy(true, "Charmander");
console.log("Meilleure attaque rapide:");
console.log(`- Attaque: ${res1.atk.toString()}`);
console.log(`- Dégâts: ${res1.pts.toFixed(2)}`);
console.log(`- Efficacité: ${res1.eff.toFixed(2)}\n`);

// Test 2 : Pikachu contre Squirtle (print = true) Quick Attack devrait être la meilleure attaque
console.log("Test 2 - Pikachu (Electric) les meilleures attaques contre Squirtle (Water):");
let pikachu = Pokemon.all_pokemons[25];
let res2 = pikachu.getBestFastAttacksForEnemy(true, "Squirtle");
console.log("Meilleure attaque rapide:");
console.log(`- Attaque: ${res2.atk.toString()}`);
console.log(`- Dégâts: ${res2.pts.toFixed(2)}`);
console.log(`- Efficacité: ${res2.eff.toFixed(2)}\n`);

// Test 3 : Pikachu contre Bulbizarre (print = false)
console.log("Test 3 - Pikachu contre Bulbizarre (pas d'affichage des détails):");
let res3 = pikachu.getBestFastAttacksForEnemy(false, "Bulbasaur");
console.log("Meilleure attaque rapide:");
console.log(`- Attaque: ${res3.atk.toString()}`);
console.log(`- Dégâts: ${res3.pts.toFixed(2)}`);
console.log(`- Efficacité: ${res3.eff.toFixed(2)}\n`);

// Test 4 : Pokemon non existant
console.log("Test 4 - Pokemon défenseur inexistant:");
let res4 = pikachu.getBestFastAttacksForEnemy(true, "Skibidizzler");
console.log("Résultat retourné:", res4);

console.log("-------------------");

// Test de la fonction fastFight
console.log("-------------------");
console.log("TEST: fastFight\n");
console.log("-------------------");

fastFight("Bulbasaur", "Charizard");
fastFight("Pikachu", "Pikachu");
fastFight("Bidoof", "Arceus");

