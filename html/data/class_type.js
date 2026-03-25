export class Type {

    // Données statiques contenant les informations sur l'efficacité des types
    static data = type_effectiveness;
    
    // Tableau statique contenant toutes les instances de Type
    static all_types = Object.keys(type_effectiveness).map(typeName => new Type(typeName));

    constructor(nom) {
        this.nom = nom;
    }

    toString() {

        if (Type.data[this.nom]) {
            let groupes = {};
            var tab = Type.data[this.nom];
            console.table(tab); 
            
            // Parcourir les données d'efficacité et grouper les types par valeur
            for (let nomType in tab){
                const value = tab[nomType];
                console.log("nomType : " + nomType + " value : " + value);
                
                // Créer une clé dans groupes si elle n'existe pas
                if (!groupes[value]) {
                    groupes[value] = [];
                }
                
                // Ajouter le type au groupe correspondant
                groupes[value].push(nomType);
            }
            
            // Construire la chaîne de résultat
            let str = this.nom + " : ";

            for (let value in groupes) {
                const types = groupes[value];
                str += value + " = [ " + types.join(", ") + " ]\n";
            }

            return str;
        } else {
            return "Le Type indiqué n'a pas pu etre trouvé";
        }
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