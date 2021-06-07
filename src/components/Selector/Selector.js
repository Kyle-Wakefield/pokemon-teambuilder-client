import React, { Component, Fragment } from 'react'

import { getNames } from '../../api/data'

class Selector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemon: this.props.pokemon,
      choices: null
    }
  }

  componentDidMount () {
    const { type, moves } = this.props

    if (type === 'species') {
      getNames('')
        .then(res => this.setState({ choices: res.data.names }))
        .catch(console.error)
    } else if (type === 'move') {
      this.setState({
        choices: moves
      })
    }
  }

  selectSpecies = event => {
    this.props.changeSpecies(event)
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

  // handleTextChange = (event) => {
  //   const name = event.target.name
  //   const value = event.target.value
  //
  //   this.setState((prevState) => {
  //     const updatedValue = { [name]: value }
  //
  //     return { pokemon: { ...prevState.pokemon, ...updatedValue } }
  //   })
  // }

  render () {
    const { type, num } = this.props
    const { pokemon, choices } = this.state

    if (!choices) {
      return null
    }

    const choicesJsx = choices.map(choice => <option key={choice} value={choice}>{choice}</option>)

    if (type === 'species') {
      return (
        <Fragment>
          <label className="mr-1">
            <h5>Species:</h5>
          </label>
          <select name="species" defaultValue={pokemon.species} onChange={this.selectSpecies}>
            {choicesJsx}
          </select>
        </Fragment>
      )
    } else if (type === 'move') {
      return (
        <Fragment>
          <label className="mr-1">
            <h5>Move {num + 1}:</h5>
          </label>
          <select data-number={num} defaultValue={pokemon.moves[num]} onChange={this.props.changeMove}>
            {choicesJsx}
          </select>
        </Fragment>
      )
    }
  }
}

export default Selector
