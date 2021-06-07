import { apiUrl } from '../apiConfig'
import axios from 'axios'

export const getPokemon = (user, pokemonId) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/pokemons/${pokemonId}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createPokemon = (user, team) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/teams/${team._id}/pokemons`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      pokemon: {
        nickname: 'Bulbasaur',
        species: 'Bulbasaur',
        ability: 'Overgrow',
        moves: ['Razor Wind', 'Swords Dance', 'Cut', 'Bind']
      }
    }
  })
}

export const deletePokemon = (user, team, pokemon) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/teams/${team._id}/pokemons/${pokemon._id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updatePokemon = (user, teamId, pokemon) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/teams/${teamId}/pokemons/${pokemon._id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      pokemon: pokemon
    }
  })
}
