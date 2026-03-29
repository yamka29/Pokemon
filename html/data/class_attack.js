class Attack{
    static all_attacks = {};

    constructor(id, n, t, p, d){
        this.id_attack = id;
        this.name = n;
        this.type = t;
        this.power = p;
        this.duration = d;
    }

    toString(){
       return `${this.name} : #${this.id_attack}, ${this.type}, ${this.power}, ${this.duration}ms` 
    }

    

}

//remplit all_attacks avec toutes les attaques dans fast_moves et charged_moves indexées par le nom de l'attaque
function fill_attacks(){
    for (let move of fast_moves.concat(charged_moves)){
        let attack = new Attack(move.move_id, move.name, move.type, move.power, move.duration);
        Attack.all_attacks[move.move_id] = attack;
    }
}


// TEST
// fill_attacks();
// let Charge = new Attack(12, "Tackle", "Normal", 5, 50);
// console.table(fast_moves);
// console.table(charged_moves);
// console.table(Object.values(Attack.all_attacks));   
// console.log(Attack.all_attacks[222].toString());