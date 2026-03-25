    class Pokemon{
        static all_pokemons = {};
        constructor(id, n, atk, def, sta, f){
            this.id_pokemon = id;
            this.name = n;
            this.stat_stamina = sta;
            this.stat_attack = atk;
            this.stat_defense = def;
            this.types = this.getTypes();
            this.fast_attacks, this.charged_attacks = this.getAttacks();
        }

        //renvoie la liste des types du pokemon
        getTypes() {
            let types = [];
            for(let pokemon_type of pokemon_types){
                if(pokemon_type.id_pokemon === this.id_pokemon && pokemon_type.form === "Normal"){
                    for (let type_name of pokemon_type.type) {
                        types.push(Type.all_types[type_name]); //il faut que all_types soit rempli au préalable
                    }
                    break; //pas besoin de continuer la boucle si on a trouvé le type
                }
                
            } 
            return types;
        }
        //renvoie la liste des attaques rapides et la liste des attaques chargées du pokemon
        getAttacks(){
            let fast_attacks = [];
            let charged_attacks = [];
            for (let pokemon_move of pokemon_moves){
                if(pokemon_move.id_pokemon === this.id_pokemon && pokemon_move.form === "Normal"){
                    for (let id of pokemon_move.fast_moves){
                        fast_attacks.push(Attack.all_attacks[id]); //il faut avoir rempli all_attacks au préalable
                    }

                    for (let id of pokemon_move.charged_moves){ 
                        charged_attacks.push(Attack.all_attacks[id]); //il faut avoir rempli all_attacks au préalable
                    }
                    break;
                }
            }
            return fast_attacks, charged_attacks;
        }

        toString(){
            return `${this.name} : #${this.id_pokemon}, ${this.types}, [STA: ${this.stat_stamina}, ATK: ${this.stat_attack}, DEF: ${this.stat_defense}], Rapides = ${this.fast_attacks}, Chargées = ${this.charged_attacks}`;
        }


    }

//remplit all_pokemons avec tout les Pokemons indexées par leur id et leur forme
function fill_pokemons(){
    for (let pokemon of pokemons){
        let poke = new Pokemon(pokemon.id_pokemon, pokemon.name, pokemon.stat_stamina, pokemon.stat_attack, pokemon.stat_defense);
        Pokemon.all_pokemons[pokemon.id_pokemon] = poke;
    }
}

// TEST
fill_pokemons;
let Bulbizarre = new Pokemon(1, "Bulbasaur", 5, 10, 17, "Normal");
comsole.log(Bulbizarre.toString());
console.table(all_pokemons);
