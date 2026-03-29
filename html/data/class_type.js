class Type {

    static all_types = {};

    constructor(n) {
        this.nom = n;
        this.efficiency = type_effectiveness[nom];
    }

    //retourne l'efficacité de ce type d'attaque contre le type fourni en paramètre
    getEfficiency(defenderType){
        return this.efficiency[defenderType];
    }
    
    //renvoie une chaine contenant le nom du type et son efficacité face à chaque autre type
    toString(){
        const groups = {};

        //groupe les types par leur efficacité 
        for (const name in this.efficiency){
            const effic = this.efficiency[name];
            if (!groups[effic]){
                groups[effic] = [];
            }

            groups[effic].push(name);
        }

        //trie les groupes par ordre décroissant
        const sorted_groups = Object.keys(groups).map(Number).sort((a, b) => a - b); 

        //construit la chaine puis la renvoie
        const defending_type = sorted_groups.map(effic => {
            const types = groups[effic];
            return `${effic} = [${types.join(", ")}]`;
        })

        return `${this.name} : ${sorted_groups.join(", ")}`;
    }



    /**
     * Ajoute un nouveau type à la liste statique all_types
     * @param {string} nom - Le nom du type Pokémon à ajouter
     */
    fill_types(nom) {
        let nType = new Type(nom);
        Type.all_types.push(nType);
    }
}