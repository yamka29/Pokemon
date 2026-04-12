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
    
    // on récupère tous les Pokémons dans un tableau
    let listPokemons = Object.values(Pokemon.all_pokemons);
    let filteredPokemons = listPokemons; // liste filtrée (par défaut tout les pokémons)
    let totalPages = Math.ceil(filteredPokemons.length / POKEMON_BY_PAGE);
    
    // variables pour le tri
    let sortColumn = null;
    let sortAscending = true;
    
    // on remplit le select avec les types disponibles
    let typesList = Object.values(Type.all_types).map(type => type.name).sort();
    //puis les ajoute dans le select
    for (let type of typesList) {
        $("#type-filter").append(`<option value="${type}">${type}</option>`);
    }
    
    // on remplit le select avec les attaques rapides disponibles
    let fastAttacksList = [];
    for (let pokemon of listPokemons) {
        for (let attack of pokemon.fast_attacks) {
            if (!fastAttacksList.includes(attack.name)) {
                fastAttacksList.push(attack.name);
            }
        }
    }
    fastAttacksList.sort();
    for (let attack of fastAttacksList) {
        $("#fast-attack-filter").append(`<option value="${attack}">${attack}</option>`);
    }
    
    // Fonction pour afficher une page
    function displayPage(pageNumber) {
        // on calcule les id de début et fin
        let start = (pageNumber - 1) * POKEMON_BY_PAGE;
        let end = start + POKEMON_BY_PAGE;
        
        // on récupère les Pokémons pour cette page 
        let pagePokemon = filteredPokemons.slice(start, end);
        
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
        
        // Afficher la popup
        $("#modal-details").show();
    }
    
    // événement du bouton fermer la popup
    $("#close-btn").click(function() {
        $("#modal-details").hide();
    });
    
    // fermer la popup en cliquant en dehors du contenu
    $("#modal-details").click(function(e) {
        if (e.target.id === "modal-details") {
            $("#modal-details").hide();
        }
    });
    
    // événement du filtre par type
    $("#type-filter").change(function() {
        applyFilters();
    });
    
    // événement du filtre par attaque rapide
    $("#fast-attack-filter").change(function() {
        applyFilters();
    });
    
    // événement du filtre par nom
    $("#name-filter").on("input", function() {
        applyFilters();
    });
    
    // Fonction pour normaliser les caractères qui renvoie la même chainesans accent et sans majuscule
    function normalizeString(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); 
        //normalize(NFD) permet de décomposer les caractères accentués
        //et le replace() les supprime
    }
    
    // Fonction pour trier les Pokémons
    function sortPokemons(column) {
        // si on clique sur la même colonne, on inverse l'ordre alphabétique du tri
        if (sortColumn === column) {
            sortAscending = !sortAscending;
        } else {
            sortColumn = column;
            sortAscending = true;
        }
        
        applySortToFilteredList();
    }
    
    // Fonction pour appliquer le tri courant à filteredPokemons
    function applySortToFilteredList() {
        if (sortColumn === null) return;
        
        // Tri
        filteredPokemons.sort(function(a, b) {
            let a_val, b_val;
            
            switch(sortColumn) {
                case 'id':
                    a_val = a.id_pokemon;
                    b_val = b.id_pokemon;
                    break;
                case 'name':
                    a_val = a.name;
                    b_val = b.name;
                    break;
                case 'type':
                    a_val = a.types.map(t => t.name).join(", ");
                    b_val = b.types.map(t => t.name).join(", ");
                    break;
                case 'stamina':
                    a_val = a.stat_stamina;
                    b_val = b.stat_stamina;
                    break;
                case 'attack':
                    a_val = a.stat_attack;
                    b_val = b.stat_attack;
                    break;
                case 'defense':
                    a_val = a.stat_defense;
                    b_val = b.stat_defense;
                    break;
            }
            
            // Comparaison
            let comparison = 0;
            if (typeof a_val === 'string') {
                comparison = a_val.localeCompare(b_val);
            } else {
                comparison = a_val - b_val;
            }
            
            // si égalité alors on trie par nom
            if (comparison === 0) {
                comparison = a.name.localeCompare(b.name);
            }
            
            // on applique l'ordre croissant ou décroissant
            return sortAscending ? comparison : -comparison;
        });
        
        // on met à jour le style des entetes sélectionnés ou non
        $("th.sortable").removeClass("active");
        $(`th[data-sort="${sortColumn}"]`).addClass("active");
        
        // on recalcule le nombre total de pages
        totalPages = Math.ceil(filteredPokemons.length / POKEMON_BY_PAGE);
        
        // on met  à jour l'affichage
        currentPage = 1;
        displayPage(1);
    }
    
    // événement sur les entetes de tri
    $("th.sortable").click(function() {
        let column = $(this).data("sort");
        sortPokemons(column);
    });
    
    // Fonction pour appliquer les filtres simultanément
    function applyFilters() {
        let selectedType = $("#type-filter").val();
        let selectedAttack = $("#fast-attack-filter").val();
        let searchName = $("#name-filter").val();
        let normalizedName = normalizeString(searchName);
        
        filteredPokemons = listPokemons.filter(function(pokemon) {
            let hasType = selectedType === "" || pokemon.types.some(type => type.name === selectedType);
            let hasAttack = selectedAttack === "" || pokemon.fast_attacks.some(attack => attack.name === selectedAttack);
            let hasName = normalizedName === "" || normalizeString(pokemon.name).includes(normalizedName);
            
            return hasType && hasAttack && hasName;
        });
        
        // Réappliquer le tri s'il y en a un d'actif
        if (sortColumn !== null) {
            applySortToFilteredList();
        } else {
            // on recalcule le nombre total de pages
            totalPages = Math.ceil(filteredPokemons.length / POKEMON_BY_PAGE);
            
            // on redirige a la page 1
            currentPage = 1;
            displayPage(1);
        }
    }
    
    // on affiche la première page par défaut
    displayPage(1);
    
    // événement du bouton PREC
    $("#btn-prec").click(function() {
        if (currentPage > 1) {
            displayPage(currentPage - 1);
        }
    });
    
    // événement du bouton SUIV
    $("#btn-suiv").click(function() {
        if (currentPage < totalPages) {
            displayPage(currentPage + 1);
        }
    });
    
});
