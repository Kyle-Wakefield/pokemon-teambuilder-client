import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Selector from '../Selector/Selector'

import { getPokemon, updatePokemon } from '../../api/pokemons'
import { getDataPrimary, getDataSecondary } from '../../api/data'

class PokemonBuilder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemon: null,
      redirect: null,
      speciesNames: null,
      abilityNames: null,
      moveNames: null,
      counter: 0
    }
  }

  componentDidMount () {
    const { user, match } = this.props
    getPokemon(user, match.params.pokemon_id)
      .then(res => this.setState({ pokemon: res.data.pokemon }))
      .then(() => this.getAbilities(this.state.pokemon.species, false))
      .then(() => this.getMoves(false))
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

  getAbilities = (species, doAbilityReset) => {
    // convert the species string to the format expected by the pokeApi
    const simplifiedSpecies = this.simplify(species)
    getDataPrimary(simplifiedSpecies)
      .then(res => {
        const abilities = []
        res.data.abilities.forEach(ability => {
          abilities.push(this.format(ability.ability.name))
        })
        this.setState({
          abilityNames: abilities
        })
      })
      .then(() => {
        if (doAbilityReset) {
          this.setState((prevState) => ({
            pokemon: {
              ...prevState.pokemon,
              ability: this.state.abilityNames[0]
            }
          }))
        }
      })
  }

  // this function is so bad it makes me want to cry
  // it will eventually be rewritten with recursion
  // seriously though, I think this is the worst code I've ever written
  getMoves = (doMoveReset) => {
    const { pokemon } = this.state
    const possibleMoves = []
    let evolvesFrom
    // format the species name in the way that the api expects
    const simplifiedSpecies = this.simplify(pokemon.species)
    getDataPrimary(simplifiedSpecies)
      .then(res => {
        res.data.moves.forEach(move => {
          possibleMoves.push(this.format(move.move.name))
        })
      })
      .then(() => {
        getDataSecondary(simplifiedSpecies)
          .then(res => {
            evolvesFrom = res.data.evolves_from_species
          })
          .then(() => {
            if (evolvesFrom) {
              getDataPrimary(evolvesFrom.name)
                .then(res => {
                  res.data.moves.forEach(move => {
                    if (!possibleMoves.includes(this.format(move.move.name))) {
                      possibleMoves.push(this.format(move.move.name))
                    }
                  })
                })
                .then(() => {
                  getDataSecondary(evolvesFrom.name)
                    .then(res => {
                      evolvesFrom = res.data.evolves_from_species
                    })
                    .then(() => {
                      if (evolvesFrom) {
                        getDataPrimary(evolvesFrom.name)
                          .then(res => {
                            res.data.moves.forEach(move => {
                              if (!possibleMoves.includes(this.format(move.move.name))) {
                                possibleMoves.push(this.format(move.move.name))
                              }
                            })
                          })
                          .then(() => {
                            this.setState({ moveNames: possibleMoves }, () => {
                              if (doMoveReset) {
                                this.setState((prevState) => ({
                                  pokemon: {
                                    ...prevState.pokemon,
                                    moves: [possibleMoves[0], possibleMoves[1], possibleMoves[2], possibleMoves[3]]
                                  },
                                  counter: prevState.counter + 1
                                }))
                              }
                            })
                          })
                      } else {
                        this.setState({ moveNames: possibleMoves }, () => {
                          if (doMoveReset) {
                            this.setState((prevState) => ({
                              pokemon: {
                                ...prevState.pokemon,
                                moves: [possibleMoves[0], possibleMoves[1], possibleMoves[2], possibleMoves[3]]
                              },
                              counter: prevState.counter + 1
                            }))
                          }
                        })
                      }
                    })
                })
            } else {
              this.setState({ moveNames: possibleMoves }, () => {
                if (doMoveReset) {
                  this.setState((prevState) => ({
                    pokemon: {
                      ...prevState.pokemon,
                      moves: [possibleMoves[0], possibleMoves[1], possibleMoves[2], possibleMoves[3]]
                    },
                    counter: prevState.counter + 1
                  }))
                }
              })
            }
          })
      })
  }

  changeSpecies = event => {
    const newSpecies = event.target.value
    this.getAbilities(newSpecies, true)
    this.setState((prevState) => ({
      pokemon: {
        ...prevState.pokemon,
        species: newSpecies
      }
    }), () => {
      this.getMoves(true)
    })
  }

  changeMove = event => {
    const newMove = event.target.value
    const moveNum = event.target.dataset.number
    // copy the moves into a fresh array so we're not mutating the state when we splice
    const updatedMovesArray = this.state.pokemon.moves
    updatedMovesArray.splice(moveNum, 1, newMove)
    this.setState((prevState) => ({
      pokemon: {
        ...prevState.pokemon,
        moves: updatedMovesArray
      }
    }))
  }

  onBack = () => {
    this.setState({ redirect: <Redirect to={'/teams/' + this.props.match.params.team_id} /> })
  }

  onSave = () => {
    const { user, match } = this.props
    const { pokemon } = this.state
    updatePokemon(user, match.params.team_id, pokemon)
      .then(this.onBack)
      .catch(console.error)
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState((prevState) => {
      const updatedValue = { [name]: value }

      return { pokemon: { ...prevState.pokemon, ...updatedValue } }
    })
  }

  render () {
    const { pokemon, redirect, abilityNames, moveNames, counter } = this.state

    if (redirect) {
      return redirect
    }

    if (!pokemon || !abilityNames || !moveNames) {
      return null
    }

    const abilitiesJsx = abilityNames.map(ability => (
      <div className="row col-12" key={ability}>
        <input type="radio" name="ability" className="mr-2" value={ability} onChange={this.handleChange} checked={ability === pokemon.ability} />
        <h6>{ability}</h6>
      </div>
    ))

    return (
      <div className="container border-std mt-2">
        {/* first row */}
        <div className="row col-12 justify-content-around mt-2">
          {/* left side of top half */}
          <div className="row col-4 align-items-between">
            <Selector type="species" pokemon={pokemon} changeSpecies={this.changeSpecies} />
          </div>
          {/* middle of top half */}
          <div className="row col-4">
            <label className="mr-1">
              <h5>Nickname:</h5>
            </label>
            <input name="nickname" value={pokemon.nickname} onChange={this.handleChange}>
            </input>
          </div>
          {/* right side of top half */}
          <div className="row col-4">
            {/* pokemon image will go here */}
          </div>
          {/* second row */}
          <div className="row col-12">
            <h5>Ability:</h5>
            {abilitiesJsx}
          </div>
        </div>
        {/* third row */}
        <div className="row col-12 justify-content-around">
          <Selector type="move" num={0} key={'zero' + counter} moves={moveNames} pokemon={pokemon} changeMove={this.changeMove} />
          <Selector type="move" num={1} key={'one' + counter} moves={moveNames} pokemon={pokemon} changeMove={this.changeMove} />
          <Selector type="move" num={2} key={'two' + counter} moves={moveNames} pokemon={pokemon} changeMove={this.changeMove} />
          <Selector type="move" num={3} key={'three' + counter} moves={moveNames} pokemon={pokemon} changeMove={this.changeMove} />
        </div>
        {/*
        <div className="row col-12 justify-content-around">
          <h3>Nickname: {pokemon.nickname}</h3>
          <h3>Species: {pokemon.species}</h3>
          <h3>Ability: {pokemon.ability}</h3>
          <h3>Moves: {pokemon.moves[0]}, {pokemon.moves[1]}, {pokemon.moves[2]}, {pokemon.moves[3]}</h3>
        </div>
        */}
        {/* bottom row */}
        <div className="row col-12 justify-content-around my-2">
          <Button variant="secondary" onClick={this.onBack}>Cancel</Button>
          <Button variant="secondary" onClick={this.onSave}>Save</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(PokemonBuilder)
