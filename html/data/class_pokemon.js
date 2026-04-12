    class Pokemon{
        static all_pokemons = {};
        
        constructor(id, n, atk, def, sta){
            this.id_pokemon = Number(id);
            this.name = n;
            this.stat_stamina = sta;
            this.stat_attack = atk;
            this.stat_defense = def;
            this.types = this.getTypes();
            [this.fast_attacks, this.charged_attacks] = this.getAttacks();
        }

        //renvoie la liste des types du pokemon
        getTypes() {
            let types = [];
            for(let pokemon_type of pokemon_types){
                if(pokemon_type.pokemon_id === this.id_pokemon ){
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
                if(pokemon_move.pokemon_id === this.id_pokemon && pokemon_move.form === "Normal"){ //on ne récupère pas les attaques Elite
                    for (let name of pokemon_move.fast_moves){
                        for (let id in Attack.all_attacks){
                            if(Attack.all_attacks[id].name === name){
                                fast_attacks.push(Attack.all_attacks[id]);
                                break;
                            }
                        }
                    }
                    for (let name of pokemon_move.charged_moves){
                        for (let id in Attack.all_attacks){
                            if(Attack.all_attacks[id].name === name){
                                charged_attacks.push(Attack.all_attacks[id]);
                                break;
                            }
                        }
                    }
                    break;
                }
            }
            return [fast_attacks, charged_attacks];
        }

        //renvoie une chaine contenant les infos du pokemons formatées 
        toString() {

                const types_str = `[${this.types.map(type => type.name).join(", ")}]`;
                const fast_str = `[${this.fast_attacks.map(atk => atk.name).join(", ")}]`;
                const charged_str = `[${this.charged_attacks.map(atk => atk.name).join(", ")}]`;
                return `${this.name} : #${this.id_pokemon}, ${types_str}, [STA: ${this.stat_stamina}, ATK: ${this.stat_attack}, DEF: ${this.stat_defense}], Rapides = ${fast_str}, Chargées = ${charged_str}`;
            }

        //méthode de classe affichant la liste des pokémons pour lesquels l'attaque choisie est la plus efficace
        static getWeakestEnemies(attackName){
            // Trouver l'attaque par son nom
            let attack = null;
            for (let id in Attack.all_attacks) {
                if (Attack.all_attacks[id].name === attackName) {
                    attack = Attack.all_attacks[id];
                    break;
                }
            }
            
            if (!attack) {
                console.log(`Attaque "${attackName}" non trouvée`);
                return;
            }
            
            // Obtenir le type de l'attaque
            let attackType = Type.all_types[attack.type];
            
            // Calculer l'efficacité pour chaque pokémon
            let pokemonEffectiveness = [];
            for (let pokemon of Object.values(Pokemon.all_pokemons)) {
                // Multiplier l'efficacité contre chaque type du pokémon
                let totalEffectiveness = 1;
                for (let defenderType of pokemon.types) {
                    let eff = attackType.getEfficiency(defenderType.name);
                    totalEffectiveness *= eff;
                }
                pokemonEffectiveness.push({ pokemon: pokemon, effectiveness: totalEffectiveness });
            }
            
            // Trouver l'efficacité maximale
            let maxEffectiveness = Math.max(...pokemonEffectiveness.map(p => p.effectiveness));
            
            // Filtrer les pokémons avec l'efficacité maximale
            let weakestEnemies = pokemonEffectiveness.filter(p => p.effectiveness === maxEffectiveness).map(p => p.pokemon);
            
            // Afficher la liste
            console.log(`Pokémons les plus faibles contre l'attaque "${attackName}" (efficacité: ${maxEffectiveness}):`);
            for (let pokemon of weakestEnemies) {
                console.log(`- ${pokemon.toString()}`);
            }
        }
    }

//remplit all_pokemons avec tout les Pokemons indexées par leur id et leur forme
function fill_pokemons(){
    for (let pokemon of pokemons){
        //condition pour ne pas avoir de pokémons vides
        if (pokemon.form !== "Normal"){
            continue;
        }
        let poke = new Pokemon(pokemon.pokemon_id, pokemon.pokemon_name, pokemon.base_attack, pokemon.base_defense, pokemon.base_stamina);
        Pokemon.all_pokemons[pokemon.pokemon_id] = poke;
    }
}

// TEST
// fill_pokemons();
// let Bulbizarre = new Pokemon(1, "Bulbasaur", 5, 10, 17, "Normal");
// console.log(Bulbizarre.toString());
// console.table(Pokemon.all_pokemons);
