let apiUrl
const apiUrls = {
  production: 'https://afternoon-tundra-85143.herokuapp.com',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

const pokeApiUrl = 'https://pokeapi.co/api/v2'

export {
  apiUrl,
  pokeApiUrl
}
