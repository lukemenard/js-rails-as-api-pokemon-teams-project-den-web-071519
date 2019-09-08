const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', initialize)

function initialize(){
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(response => response.forEach(createCard))
}

function createCard(trainer){
  let card = document.createElement('div')
  let main = document.querySelector('main')

  card.className = "card"
  card.setAttribute('data-id', trainer.id)

  createTrainerName(card, trainer)
  createAddButton(card, trainer)
  createPokemonList(card, trainer)

  main.append(card)
}

function createTrainerName(card, trainer){
  let trainerName = document.createElement('p')
  trainerName.innerText = trainer.name
  card.append(trainerName)
}

function createPokemonList(card, trainer){
  let pokemonList = document.createElement('ul')
  for(const pokemon of trainer.pokemons){
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    releaseButton = createReleaseButton(li, pokemonList, pokemon)
    li.append(releaseButton)
    pokemonList.append(li)
  }
  card.append(pokemonList)
}

function createReleaseButton(listItem, list, pokemon){
  let releaseButton = document.createElement('button')
  releaseButton.className = 'release'
  releaseButton.setAttribute('data-pokemon-id', pokemon.id)
  releaseButton.innerText = 'Release'

  releaseButton.addEventListener('click', function(){
    fetch(POKEMONS_URL + `/${pokemon.id}`, {method: "DELETE"})
    list.removeChild(listItem)
  })

  return releaseButton
}

function createAddButton(card, trainer){
  let addButton = document.createElement('button')
  addButton.innerText = 'Add Pokemon'
  addButton.setAttribute('data-trainer-id', trainer.id)

  let addConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id
    })
  }

  addButton.addEventListener('click', function(){
    fetch(POKEMONS_URL, addConfig)
    addPokemon(trainer)
  })

  card.append(addButton)
}

function addPokemon(trainer){
  fetch(TRAINERS_URL + `/${trainer.id}`)
  .then(response => response.json())
  .then(response => renderNewPokemon(response, trainer))
}

function renderNewPokemon(response, trainer){
  let li = document.createElement('li')
  let pokemonList = document.querySelectorAll('.card ul')[trainer.id - 1]
  let lastPokemon = response.pokemons[response.pokemons.length - 1]
  li.innerText = `${lastPokemon.nickname} (${lastPokemon.species})`

  let releaseButton = createReleaseButton(li, pokemonList, lastPokemon)

  li.append(releaseButton)
  pokemonList.append(li)
}
