class Type {

    static all_types = {};

    constructor(n) {
        this.name = n;
        this.efficiency = type_effectiveness[n];
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
        const sorted_groups = Object.keys(groups).map(Number).sort((a, b) => b - a); 

        //construit la chaine puis la renvoie
        const defending_type = sorted_groups.map(effic => {
            const types = groups[effic];
            return `${effic} = [${types.join(", ")}]`;
        })

        return `${this.name} : ${defending_type.join(", ")}`;
    }



}
//remplit all_types avec tout les types dans type_effectiveness indeés par leur nom
function fill_types() {
    for (const name in type_effectiveness){
        Type.all_types[name] = new Type(name);
    }
}