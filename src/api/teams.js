import apiUrl from '../apiConfig'
import axios from 'axios'

export const getTeams = user => {
  // console.log('user', user)
  return axios({
    method: 'GET',
    url: apiUrl + '/teams',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const getTeam = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/teams/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createTeam = user => {
  return axios({
    method: 'POST',
    url: apiUrl + '/teams',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      team: {
        title: 'New Team',
        pokemons: []
      }
    }
  })
}

export const deleteTeam = (user, team) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/teams/' + team._id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
