import { apiUrl, pokeApiUrl } from '../apiConfig'
import axios from 'axios'

export const getNames = inputString => {
  return axios({
    method: 'GET',
    url: apiUrl + '/names',
    params: {
      searchString: inputString
    }
  })
}

export const getData1 = species => {
  return axios({
    method: 'GET',
    url: pokeApiUrl + '/pokemon/' + species
  })
}
