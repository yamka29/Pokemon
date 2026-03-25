export class Type {

    static data = type_effectiveness;
    static all_types = Object.keys(type_effectiveness).map(typeName => new Type(typeName));

    constructor(nom) {
        this.nom = nom;
    }

    toString() {

        if (Type.data[this.nom]) {
            let groupes = {};
            var tab = Type.data[this.nom];
            console.table(tab); 
            
            for (let nomType in tab){
                const value = tab[nomType];
                console.log("nomType : " + nomType + " value : " + value);
                
                if (!groupes[value]) {
                    groupes[value] = [];
                }
                
                groupes[value].push(nomType);
            }
            
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

    fill_types(nom) {
        let nType = new Type(nom);
        Type.all_types.push(nType);
    }
}