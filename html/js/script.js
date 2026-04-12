// On attend que le DOM soit chargé avant de charger le script
$(document).ready(function() {
    // on remplit les données
    fill_types();
    fill_attacks();
    fill_pokemons();
    
    //console.log("Nombre de pokemon chargés:", Object.keys(Pokemon.all_pokemons).length);
    
    // initialisation de la pagination
    const POKEMON_BY_PAGE = 25;
    let currentPage = 1;
    
    // Récupérer tous les Pokémons dans un tableau
    let listPokemons = Object.values(Pokemon.all_pokemons);
    let totalPages = Math.ceil(listPokemons.length / POKEMON_BY_PAGE);
    
    // Fonction pour afficher une page
    function displayPage(pageNumber) {
        // on calcule les id de début et fin
        let start = (pageNumber - 1) * POKEMON_BY_PAGE;
        let end = start + POKEMON_BY_PAGE;
        
        // on récupère les Pokémons pour cette page
        let pagePokemon = listPokemons.slice(start, end);
        
        // on vide le tableau de son ancien contenu
        $("tbody").empty();
        
        // on remplit le tableau avec les pokémons de cette page
        for (let pokemon of pagePokemon) {
            let types = pokemon.types.map(type => type.name).join(", ");

            let path_image = `webp/images/${pokemon.id_pokemon}.webp`;
            if(pokemon.id_pokemon < 10){
                path_image = `webp/images/00${pokemon.id_pokemon}.webp`;
            }
            else if (pokemon.id_pokemon < 100){
                path_image = `webp/images/0${pokemon.id_pokemon}.webp`;
            }
            
            
            let row = `<tr data-pokemon-id="${pokemon.id_pokemon}">
                <td>${pokemon.id_pokemon}</td>
                <td>${pokemon.name}</td>
                <td>${types}</td>
                <td>${pokemon.stat_stamina}</td>
                <td>${pokemon.stat_attack}</td>
                <td>${pokemon.stat_defense}</td>
                <td><img src="${path_image}" alt="${pokemon.name}" class="pokemon-img" width="50"></td>
            </tr>`;
            
            $("tbody").append(row);
        }
        
        // on met à jour le texte du numéro de page
        $("#page-info").text(`Page ${pageNumber} sur ${totalPages}`);
        
        // On cahce le pouton PREC si on est au début et on cache SUIV si on est à la fin
        if (pageNumber === 1) {
            $("#btn-prec").hide();
        } else {
            $("#btn-prec").show();
        }
        
        if (pageNumber === totalPages) {
            $("#btn-suiv").hide();
        } else {
            $("#btn-suiv").show();
        }
        
        // on met à jour la page actuelle
        currentPage = pageNumber;
        
        // événements click sur les lignes du tableau
        $("tbody tr").click(function() {
            let pokemonId = $(this).attr("data-pokemon-id");
            showPokemonDetails(pokemonId);
        });
        
        // événements de survol sur les images
        $(".pokemon-img").on("mouseover", function() {
            
            let pokemonId = $(this).closest("tr").attr("data-pokemon-id");
            let path_image = `webp/images/${pokemonId}.webp`;
            if(pokemonId < 10){
                path_image = `webp/images/00${pokemonId}.webp`;
            }
            else if (pokemonId < 100){
                path_image = `webp/images/0${pokemonId}.webp`;
            }
            
            $("#bigger-image").attr("src", path_image);
            $("#image-popup").show();
        });
        
        $("#image-popup").on("mouseover", function() {
            $("#image-popup").show();
        });

        $(".pokemon-img").on("mouseout", function() {
            $("#image-popup").hide();
        });

        $("#image-popup").on("mouseout", function() {
            $("#image-popup").hide();
        });
    }
    
    // Fonction pour afficher les détails d'un Pokémon dans la popup
    function showPokemonDetails(pokemonId) {
        let pokemon = Pokemon.all_pokemons[pokemonId];
        
        if (!pokemon) return;
        
        $("#modal-title").text(pokemon.name);
        
        let infos = `
            <strong>ID:</strong> ${pokemon.id_pokemon}<br>
            <strong>Type(s):</strong> ${pokemon.types.map(t => t.name).join(", ")}<br>
            <strong>PV:</strong> ${pokemon.stat_stamina}<br>
            <strong>ATK:</strong> ${pokemon.stat_attack}<br>
            <strong>DEF:</strong> ${pokemon.stat_defense}
        `;
        $("#modal-info").html(infos);
        
        // Afficher les attaques rapides
        let fastAttacksList = $("#fast-attacks-list");
        fastAttacksList.empty();
        for (let attack of pokemon.fast_attacks) {
            fastAttacksList.append(`<li>${attack.name} (${attack.type}) - Puissance: ${attack.power}</li>`);
        }
        
        // Afficher les attaques chargées
        let chargedAttacksList = $("#charged-attacks-list");
        chargedAttacksList.empty();
        for (let attack of pokemon.charged_attacks) {
            chargedAttacksList.append(`<li>${attack.name} (${attack.type}) - Puissance: ${attack.power}</li>`);
        }
        
        // Afficher la modal
        $("#modal-details").show();
    }
    
    // Événement du bouton fermer la modal
    $("#close-btn").click(function() {
        $("#modal-details").hide();
    });
    
    // Fermer la modal en cliquant en dehors du contenu
    $("#modal-details").click(function(e) {
        if (e.target.id === "modal-details") {
            $("#modal-details").hide();
        }
    });
    
    // On affiche la première page par défaut
    displayPage(1);
    
    // Événement du bouton PREC
    $("#btn-prec").click(function() {
        if (currentPage > 1) {
            displayPage(currentPage - 1);
        }
    });
    
    // Événement du bouton SUIV
    $("#btn-suiv").click(function() {
        if (currentPage < totalPages) {
            displayPage(currentPage + 1);
        }
    });
    
});
