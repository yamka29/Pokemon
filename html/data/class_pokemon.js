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

        //méthode de classe qui affiche la liste des pokemons pour lesquels l'attaque choisie est la plus efficace
        static getWeakestEnemies(attackName){
            // on cherche l'attaque par son nom
            let attack = null;
            for (let id in Attack.all_attacks) {
                if (Attack.all_attacks[id].name === attackName) {
                    attack = Attack.all_attacks[id];
                    break;
                }
            }
            //Erreur si l'attaque n'existe pas
            if (!attack) {
                console.log(`L'attaque "${attackName}" n'as pas été trouvée`);
                return;
            }
            
            // on récupère le type de l'attaque
            let attackType = Type.all_types[attack.type];
            
            // On calcule l'efficacité de l'attaque contre chaque Pokémon
            let pokemonEffectiveness = [];
            for (let pokemon of Object.values(Pokemon.all_pokemons)) {
                // On multiplie l'efficacité de tout les types du pokemon (1 ou 2 logiquement)
                let totalEffectiveness = 1;
                for (let defenderType of pokemon.types) {
                    let eff = attackType.getEfficiency(defenderType.name);
                    totalEffectiveness = totalEffectiveness * eff;
                }
                pokemonEffectiveness.push({ pokemon: pokemon, effectiveness: totalEffectiveness });
            }
            
            // On cherche la meilleure efficacité
            let bestEffectiveness = 0;
            for (let p of pokemonEffectiveness) {
                if (p.effectiveness > bestEffectiveness) {
                    bestEffectiveness = p.effectiveness;
                }
            }
            
            // on filtre les pokémons avec l'efficacité maximale
            let weakestEnemies = pokemonEffectiveness.filter(p => p.effectiveness === bestEffectiveness).map(p => p.pokemon);
            
            //on affiche la liste dans la console
            console.log(`Les pokémons les plus faibles contre l'attaque "${attackName}" (efficacité: ${bestEffectiveness.toFixed(2)}):`);
            for (let pokemon of weakestEnemies) {
                console.log(`- ${pokemon.toString()}`);
            }
        }

        //méthode retournant la meilleure attack contre un pokémon donné en paramètre, si print vaut true, la liste des attaques possibles et leur dégat contre l'ennemi est affichée
        getBestFastAttacksForEnemy(print, pokemonName){
            // Trouver le Pokémon défenseur par son nom
            let enemy = null;
            for (let pokemon of Object.values(Pokemon.all_pokemons)) {
                if (pokemon.name === pokemonName) {
                    enemy = pokemon;
                    break;
                }
            }
            
            // Vérifier si le Pokémon défenseur existe
            if (!enemy) {
                console.log(`Le Pokémon "${pokemonName}" n'a pas été trouvé`);
                return null;
            }
            
            // Calculer les dégâts pour chaque attaque rapide
            let attacksData = [];
            for (let attack of this.fast_attacks) {
                // Calculer l'efficacité contre chaque type du défenseur
                let totalEffectiveness = 1;
                for (let defenderType of enemy.types) {
                    let eff = Type.all_types[attack.type].getEfficiency(defenderType.name);
                    totalEffectiveness = totalEffectiveness * eff;
                }
                
                // Calculer les dégâts : Power * effectiveness * (Base attack / Base defense)
                let damage = attack.power * totalEffectiveness * (this.stat_attack / enemy.stat_defense);
                
                attacksData.push({
                    attack: attack,
                    damage: damage,
                    effectiveness: totalEffectiveness
                });
            }
            
            // Afficher la liste si print est true
            if (print) {
                console.log(`Attaques rapides de ${this.name} contre ${enemy.name}:`);
                for (let data of attacksData) {
                    console.log(`- ${data.attack.toString()} | Dégâts: ${data.damage.toFixed(2)} | Efficacité: ${data.effectiveness.toFixed(2)}`);
                }
            }
            
            // Trouver la meilleure attaque (plus hauts dégâts, ou première alphabétiquement en cas d'égalité)
            let bestAttackData = attacksData[0];
            for (let data of attacksData) {
                if (data.damage > bestAttackData.damage) {
                    bestAttackData = data;
                } else if (data.damage === bestAttackData.damage) {
                    // En cas d'égalité, prendre la première alphabétiquement
                    if (data.attack.name < bestAttackData.attack.name) {
                        bestAttackData = data;
                    }
                }
            }
            
            // Retourner l'objet littéral avec les informations requises
            return {
                atk: bestAttackData.attack,
                pts: bestAttackData.damage,
                eff: bestAttackData.effectiveness
            };
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
