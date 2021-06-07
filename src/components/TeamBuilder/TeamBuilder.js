import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import PokemonPreview from '../PokemonPreview/PokemonPreview'

import { getTeam, updateTeam } from '../../api/teams'

class TeamBuilder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      team: null,
      redirect: null
    }
  }

  teamWasChanged = () => {
    const { user, match } = this.props
    getTeam(user, match.params.id)
      .then(res => this.setState({ team: res.data.team }))
      .catch(console.error)
  }

  handleTextChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState((prevState) => {
      const updatedValue = { [name]: value }

      return { team: { ...prevState.team, ...updatedValue } }
    })
  }

  componentDidMount () {
    const { user, match } = this.props
    getTeam(user, match.params.id)
      .then(res => this.setState({ team: res.data.team }))
      .catch(console.error)
  }

  onBack = () => {
    const { team } = this.state
    const { user } = this.props
    updateTeam(user, team)
      .then(() => this.setState({ redirect: <Redirect to="/" /> }))
  }

  render () {
    const { team, redirect } = this.state

    if (redirect) {
      return redirect
    }

    if (!team) {
      return null
    }

    const pokemonsJsx = team.pokemons.map(pokemon => (
      <PokemonPreview key={pokemon._id} user={this.props.user} team={team} pokemon={pokemon} teamWasChanged={this.teamWasChanged} />
    ))

    for (let i = team.pokemons.length; i < 6; i++) {
      pokemonsJsx.push(<PokemonPreview key={i} user={this.props.user} team={team} pokemon={null} />)
    }

    return (
      <div className="container">
        <div className="row mt-2">
          <Button variant="secondary" onClick={this.onBack}>
            Back To Teams
          </Button>
          <div className="mx-auto">
            <h2>Team Name: </h2>
            <input name="title" value={team.title} onChange={this.handleTextChange}></input>
          </div>
        </div>
        <div className="row justify-content-between">
          {pokemonsJsx}
        </div>
      </div>
    )
  }
}

export default withRouter(TeamBuilder)
