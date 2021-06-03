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

export const deletePokemon = (user, team, pokemon) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/teams/${team._id}/pokemons/${pokemon._id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
