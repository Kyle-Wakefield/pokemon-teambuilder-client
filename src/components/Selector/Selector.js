import React, { Component, Fragment } from 'react'

import { getNames } from '../../api/data'

class Selector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemon: this.props.pokemon,
      speciesNames: null
    }
  }

  componentDidMount () {
    getNames('')
      .then(res => this.setState({ speciesNames: res.data.names }))
      .catch(console.error)
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
    const { pokemon, speciesNames } = this.state

    if (!speciesNames) {
      return null
    }

    const speciesJsx = speciesNames.map(name => <option key={name} value={name}>{name}</option>)
    console.log(this.props)
    return (
      <Fragment>
        <label className="mr-1">
          <h6>Species:</h6>
        </label>
        <select name="species" defaultValue={pokemon.species} onChange={this.props.changeSpecies}>
          {speciesJsx}
        </select>
      </Fragment>
    )
  }
}

export default Selector
