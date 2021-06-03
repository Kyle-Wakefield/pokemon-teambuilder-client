import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { deletePokemon } from '../../api/pokemons'

class PokemonPreview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemon: this.props.pokemon,
      redirect: null
    }
  }

  onDelete = () => {
    const { pokemon } = this.state
    const { user, team } = this.props
    deletePokemon(user, team, pokemon)
      .then(() => this.setState({ pokemon: null }))
  }

  onEdit = () => {
    const { team } = this.props
    const { pokemon } = this.state
    this.setState({ redirect: <Redirect to={`/teams/${team._id}/pokemon/${pokemon._id}`} /> })
  }

  render () {
    const { pokemon, redirect } = this.state

    if (redirect) {
      return redirect
    }

    if (!pokemon) {
      return (
        <Card style={{ width: '32%', height: '350px' }} className="mt-2">
          <Card.Body className="background-primary">
            <Button variant="secondary">Add Pokemon</Button>
          </Card.Body>
        </Card>
      )
    }

    return (
      <Card style={{ width: '32%', height: '350px' }} className="mt-2">
        <Card.Body className="background-primary">
          <Card.Title><h2>{pokemon.nickname}</h2> <h2>({pokemon.species})</h2></Card.Title>
          <div>
            <h4>{pokemon.ability}</h4>
            <h5>{pokemon.moves[0]}</h5>
            <h5>{pokemon.moves[1]}</h5>
            <h5>{pokemon.moves[2]}</h5>
            <h5>{pokemon.moves[3]}</h5>
          </div>
          <div className="row justify-content-around">
            <Button variant="secondary" onClick={this.onEdit}>Edit</Button>
            <Button variant="secondary" onClick={this.onDelete}>Delete</Button>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

export default PokemonPreview
