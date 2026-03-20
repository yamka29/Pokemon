    class Pokemon{
        static all_pokemons = {};
        constructor(id, n, atk, def, sta, f){
            this.id_pokemon = id;
            this.name = n;
            this.stat = [sta, atk, def];
            this.form = f;
            this.types = this.getTypes();
        }

        //renvoie la liste des types du pokemon
        getTypes() {
            let types = [];
            for(let pokemon_type of pokemon_types){
                if(pokemon_type.id_pokemon === this.id_pokemon && pokemon_type.form === this.form){
                    for (let type_name of pokemon_type.type) {
                        types.push(Type.all_types[type_name]);
                    }
                    break; //pas besoin de continuer la boucle si on a trouvé le type
                }
                
            } 
            return types;
        }
        //renvoie la liste des attaques du pokemon
        getAttacks(){
            let attacks = [];
            for (let pokemon_move of pokemon_moves){
                
            }
        }
    }

