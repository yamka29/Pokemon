//Fonctions pour remplir les vartiables de classes nécessaires aux tests
fill_types();
fill_attacks();
fill_pokemons();

//fonction utilitaire qui renvoie une liste d'objets (Attaques ou Pokemons) formatée
function displayList(elems, type_elems){
    console.log(`Liste des ${elems.length} ${type_elems} : `);
    for (let elem in elems){
        console.log(`- ${elem.toString()}`);
    }
}

// console.log(Attack.all_attacks[221].toString());
// console.log(Type.all_types["Bug"].toString());
// console.log(Pokemon.all_pokemons[1].toString());