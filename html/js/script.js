// On attend que le DOM soit chargé avant de charger le script
$(document).ready(function() {
    // on remplit les données
    fill_types();
    fill_attacks();
    fill_pokemons();
    
    console.log("Nombre de Pokémons chargés:", Object.keys(Pokemon.all_pokemons).length);
    
    // Configuration de la pagination
    const POKEMON_PAR_PAGE = 25;
    let currentPage = 1;
    
    // Récupérer tous les Pokémons dans un tableau
    let pokemonList = Object.values(Pokemon.all_pokemons);
    let totalPages = Math.ceil(pokemonList.length / POKEMON_PAR_PAGE);
    
    // Fonction pour afficher une page
    function displayPage(pageNumber) {
        // Calculer les indices de début et fin
        let start = (pageNumber - 1) * POKEMON_PAR_PAGE;
        let end = start + POKEMON_PAR_PAGE;
        
        // Récupérer les Pokémons pour cette page
        let pokemonsPage = pokemonList.slice(start, end);
        
        // Vider le tableau
        $("tbody").empty();
        
        // Remplir le tableau avec les Pokémons de cette page
        for (let pokemon of pokemonsPage) {
            let types = pokemon.types.map(type => type.name).join(", ");
            let path_image = `webp/images/${pokemon.id_pokemon}.webp`;
            
            let row = `<tr>
                <td>${pokemon.id_pokemon}</td>
                <td>${pokemon.name}</td>
                <td>${types}</td>
                <td>${pokemon.stat_stamina}</td>
                <td>${pokemon.stat_attack}</td>
                <td>${pokemon.stat_defense}</td>
                <td><img src="${path_image}" alt="${pokemon.name}" width="50"></td>
            </tr>`;
            
            $("tbody").append(row);
        }
        
        // Mettre à jour le texte du numéro de page
        $("#page-info").text(`Page ${pageNumber} sur ${totalPages}`);
        
        // Afficher/masquer les boutons selon la page
        if (pageNumber === 1) {
            $("#prev-btn").hide();
        } else {
            $("#prev-btn").show();
        }
        
        if (pageNumber === totalPages) {
            $("#next-btn").hide();
        } else {
            $("#next-btn").show();
        }
        
        // Mettre à jour la page actuelle
        currentPage = pageNumber;
    }
    
    // Afficher la première page
    displayPage(1);
    
    // Événement du bouton PREC
    $("#prev-btn").click(function() {
        if (currentPage > 1) {
            displayPage(currentPage - 1);
        }
    });
    
    // Événement du bouton SUIV
    $("#next-btn").click(function() {
        if (currentPage < totalPages) {
            displayPage(currentPage + 1);
        }
    });
    
    console.log("Pagination chargée!");
});