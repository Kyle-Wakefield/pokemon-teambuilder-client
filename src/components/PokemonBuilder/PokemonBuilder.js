import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

import { getPokemon } from '../../api/pokemons'

class PokemonBuilder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemon: null,
      redirect: null
    }
  }

  componentDidMount () {
    const { user, match } = this.props
    getPokemon(user, match.params.pokemon_id)
      .then(res => this.setState({ pokemon: res.data.pokemon }))
      .catch(console.error)
  }

  onBack = () => {
    this.setState({ redirect: <Redirect to={'/teams/' + this.props.match.params.team._id} /> })
  }

  render () {
    const { pokemon, redirect } = this.state

    if (redirect) {
      return redirect
    }

    if (!pokemon) {
      return null
    }

    // placeholder
    return (
      <Fragment>
        <h3>{pokemon.nickname}</h3>
        <h3>{pokemon.species}</h3>
        <h3>{pokemon.ability}</h3>
        <h3>{pokemon.moves}</h3>
      </Fragment>
    )
  }
}

export default withRouter(PokemonBuilder)
