import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { deletePokemon, createPokemon } from '../../api/pokemons'

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
      .then(this.props.teamWasChanged)
      .catch(console.error)
  }

  onEdit = () => {
    const { team } = this.props
    const { pokemon } = this.state
    this.setState({ redirect: <Redirect to={`/teams/${team._id}/pokemon/${pokemon._id}`} /> })
  }

  onCreate = () => {
    const { user, team } = this.props
    createPokemon(user, team)
      .then(res => this.setState({
        pokemon: res.data.pokemon,
        redirect: <Redirect to={`/teams/${team._id}/pokemon/${res.data.pokemon._id}`} />
      }))
      .catch(console.error)
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
            <Button variant="secondary" onClick={this.onCreate}>Add Pokemon</Button>
          </Card.Body>
        </Card>
      )
    }

    return (
      <Card style={{ width: '32%', height: '350px' }} className="mt-2 background-primary">
        <Card.Body>
          <Card.Title><h2>{pokemon.nickname}</h2> <h2>({pokemon.species})</h2></Card.Title>
          <div>
            <h4>{pokemon.ability}</h4>
            <h6>{pokemon.moves[0]}</h6>
            <h6>{pokemon.moves[1]}</h6>
            <h6>{pokemon.moves[2]}</h6>
            <h6>{pokemon.moves[3]}</h6>
          </div>
          <div className="row justify-content-around align-self-end">
          </div>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="secondary" className="mr-1" onClick={this.onEdit}>Edit</Button>
          <Button variant="secondary" className="ml-1" onClick={this.onDelete}>Delete</Button>
        </Card.Footer>
      </Card>
    )
  }
}

export default PokemonPreview
