import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import TeamPreview from '../TeamPreview/TeamPreview'

// import getTeams from '../../api/teams'
import { getTeams } from '../../api/teams'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    getTeams(this.props.user)
      .then(res => {
        this.setState({ teams: res.data.teams }, () => {
          this.setState({ teamsJsx: this.state.teams.map(team => (
            <TeamPreview key={team._id} team={team} />
          )) })
        })
      })
      .catch(console.error)
  }

  render () {
    if (!this.props.user) {
      return <Redirect to="/sign-in" />
    }
    console.log('jsx', this.state.teamsJsx)
    return (
      <div className="container">
        <div className="row justify-content-center border-std mt-3">
          <h1 className="text-center">My Teams</h1>
        </div>
        {this.state.teamsJsx}
      </div>
    )
  }
}

export default Home
