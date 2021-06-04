import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

import Selector from '../Selector/Selector'

import { getPokemon } from '../../api/pokemons'
import { getData1 } from '../../api/data'

class PokemonBuilder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemon: null,
      redirect: null,
      speciesNames: null
    }
  }

  componentDidMount () {
    const { user, match } = this.props
    getPokemon(user, match.params.pokemon_id)
      .then(res => this.setState({ pokemon: res.data.pokemon }))
      .catch(console.error)
  }

  format = str => {
    let formattedStr = str.charAt(0).toUpperCase() + str.slice(1)
    for (let i = 0; i < str.length; i++) {
      if (formattedStr.charAt(i) === '-') {
        formattedStr = formattedStr.slice(0, i) + ' ' + formattedStr.slice(i + 1)
      }
      if (formattedStr.charAt(i) === ' ') {
        formattedStr = formattedStr.slice(0, i + 1) + str.charAt(i + 1).toUpperCase() + formattedStr.slice(i + 2)
      }
    }
    return formattedStr
  }

  simplify = str => {
    let simpleStr = str.toLowerCase()
    simpleStr = simpleStr.replace('.', '')
    simpleStr = simpleStr.replace(' ', '-')
    return simpleStr
  }

  changeSpecies = (event) => {
    console.log('hi')
    const newSpecies = event.target.value
    // convert the species string to the format expected by the pokeApi
    const simplifiedSpecies = this.simplify(newSpecies)
    getData1(simplifiedSpecies)
      .then(res => {
        console.log(res)
        this.setState((prevState) => ({
          pokemon: {
            ...prevState.pokemon,
            species: newSpecies,
            ability: this.format(res.data.abilities[0].ability.name),
            moves: []
          }
        }))
      })
  }

  onBack = () => {
    this.setState({ redirect: <Redirect to={'/teams/' + this.props.match.params.team._id} /> })
  }

  handleTextChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState((prevState) => {
      const updatedValue = { [name]: value }

      return { pokemon: { ...prevState.pokemon, ...updatedValue } }
    })
  }

  render () {
    const { pokemon, redirect } = this.state

    if (redirect) {
      return redirect
    }

    if (!pokemon) {
      return null
    }

    return (
      <div className="container border-std mt-2">
        {/* top half */}
        <div className="row col-12 justify-content-around mt-2">
          {/* left side of top half */}
          <div className="row col-4 align-items-between">
            <Selector pokemon={pokemon} changeSpecies={this.changeSpecies} />
          </div>
          {/* middle of top half */}
          <div className="row col-4">
            <label className="mr-1">
              <h6>Nickname:</h6>
            </label>
            <input name="nickname" value={pokemon.nickname} onChange={this.handleTextChange}>
            </input>
          </div>
          {/* right side of top half */}
          <div className="row col-4">
          </div>
        </div>
        {/* bottom half */}
        <div className="row col-12 justify-content-around">
          <h3>Nickname: {pokemon.nickname}</h3>
          <h3>Species: {pokemon.species}</h3>
          <h3>Ability: {pokemon.ability}</h3>
          <h3>Moves: {pokemon.moves}</h3>
        </div>
      </div>
    )
  }
}

export default withRouter(PokemonBuilder)
