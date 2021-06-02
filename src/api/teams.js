import apiUrl from '../apiConfig'
import axios from 'axios'

export const getTeams = user => {
  console.log('user', user)
  return axios({
    method: 'GET',
    url: apiUrl + '/teams',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
