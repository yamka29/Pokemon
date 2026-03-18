import "pokemon_moves.js";
import "fast_moves.js";
import "charged_moves.js";


class Attack{
    constructor(id, n, t, p, d){
        this.id_attack = id;
        this.name = n;
        this.type = t;
        this.power = p;
        this.duration = d;
    }

    toString(){
       return `${this.nom} : 
       #${this.id_attack}, 
       ${this.type},
       ${this.power},
       ${this.duration}ms` 
    }
}

let Charge = new Attack(12, "Tackle", Normal, 5, 50);   
console.log(Charge.toString);