/// <reference types="cypress" />

// Test suit constants
// -- URLs 
const pokemon_url = 'https://dex.pokemonshowdown.com/';

// constants 
const pokemonsData = require('../../../fixtures/pokemon.json');

// ***********************************************
// Test suit
describe('Buscar Pokemon, verificar stats y habilidades', () => {

    beforeEach(() => {
        // Ir al sitio web
        cy.visit(pokemon_url)
    })

    pokemonsData.forEach(pokemonTest => {

        it('Buscar pokemon ' + pokemonTest.pokemon_name, () => {

            // Verificar que la URL sea la correcta
            cy.url().should('eq', pokemon_url);

            //Datos de prueba
            const pokemon_name = pokemonTest.pokemon_name;

            // Buscar pokemon
            cy.get('button:contains("Pokémon")').click();
            cy.get('div[class="searchboxwrapper"] > input').type(pokemon_name);
            cy.get('.pokemonnamecol > b').contains(pokemon_name).click();

            // Validar el nombre del pokemon es el mismo de la busqueda
            cy.get(`a.subtle:contains(${pokemon_name})`).should('have.text', pokemon_name);


        });

        it('Validación de Stats Base en Web vs API de ' + pokemonTest.pokemon_name, () => {

            // Verificar que la URL sea la correcta
            cy.url().should('eq', pokemon_url);

            //Datos de prueba
            const pokemon_name = pokemonTest.pokemon_name;

            // Buscar pokemon
            cy.get('button:contains("Pokémon")').click();
            cy.get('div[class="searchboxwrapper"] > input').type(pokemon_name);
            cy.get('.pokemonnamecol > b').contains(pokemon_name).click();


            // Realiza la peticion a la API de pokemon
            const pokemon_name_lowercase = pokemon_name.toLowerCase();
            cy.request('GET', `https://pokeapi.co/api/v2/pokemon/${pokemon_name_lowercase}`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    const pokemonStats = response.body.stats;

                    // Itera sobre cada stat y verifica el base_stat y el stat name
                    pokemonStats.forEach((stat) => {
                        const statName = stat.stat.name;
                        const baseStat = stat.base_stat;

                        // Busca el contenedor de stats
                        cy.get('.stats > tbody').within(() => {
                            // Verifica que el nombre y el valor del stat coincidan
                            switch (statName) {
                                case "special-attack":
                                    cy.get('th').contains('Sp. Atk').next('td').should('have.text', `${baseStat}`);
                                    break;
                                case "special-defense":
                                    cy.get('th').contains('Sp. Def').next('td').should('have.text', `${baseStat}`);
                                    break;
                                default:
                                    cy.get('th').contains(statName, { matchCase: false }).next('td').should('have.text', `${baseStat}`);
                                    break;
                            }

                        });


                    });


                });

        });

        it('Validación de Habilidades en Web vs API de ' + pokemonTest.pokemon_name, () => {

            // Verificar que la URL sea la correcta
            cy.url().should('eq', pokemon_url);

            //Datos de prueba
            const pokemon_name = pokemonTest.pokemon_name;

            // Buscar pokemon
            cy.get('button:contains("Pokémon")').click();
            cy.get('div[class="searchboxwrapper"] > input').type(pokemon_name);
            cy.get('.pokemonnamecol > b').contains(pokemon_name).click();


            // Realiza la peticion a la API de pokemon
            const pokemon_name_lowercase = pokemon_name.toLowerCase();
            cy.request('GET', `https://pokeapi.co/api/v2/pokemon/${pokemon_name_lowercase}`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    const abilities = response.body.abilities;

                    // Itera sobre cada habilidad
                    abilities.forEach((abilityInfo) => {
                        const abilityName = abilityInfo.ability.name;

                        // Convierte todo el texto en minúsculas y separa las palabras por guiones bajos
                        const words = abilityName.toLowerCase().split('-');
                        // Capitaliza la primera letra de cada palabra
                        const formattedAbilityName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                        // Verifica el dato de habilidad obtenido con la API contra lo que se muestra en la web
                        cy.get('.abilityentry > .imgentry').contains(formattedAbilityName).should('have.text', `${formattedAbilityName}`);
                    });

                });

        });

    });

    it('Busqueda de un Pokémon Inexistente', () => {

        // Verificar que la URL sea la correcta
        cy.url().should('eq', pokemon_url);

        //Datos de prueba
        const pokemon_name = 'nonsense';
        const invalid_pokemon_msg = "No exact match found. The closest matches alphabetically are";

        // Buscar pokemon
        cy.get('button:contains("Pokémon")').click();
        cy.get('div[class="searchboxwrapper"] > input').type(pokemon_name);

        //Verificar que el mensaje que no se encontro resultado se muestre
        cy.get('.results > ul > .result').contains(invalid_pokemon_msg).should('be.visible');;

    });

})