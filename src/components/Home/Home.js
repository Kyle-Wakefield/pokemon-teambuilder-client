import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import TeamPreview from '../TeamPreview/TeamPreview'

import { getTeams, createTeam } from '../../api/teams'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      redirect: null
    }
  }

  onCreate = () => {
    createTeam(this.props.user)
      .then(res => {
        this.setState({ redirect: <Redirect to={'/teams/' + res.data.team._id} /> })
      })
      .catch(console.error)
  }

  componentDidMount () {
    const { user } = this.props
    if (!user) { return }
    getTeams(user)
      .then(res => {
        this.setState({ teams: res.data.teams }, () => {
          this.setState({ teamsJsx: this.state.teams.map(team => (
            <TeamPreview key={team._id} user={user} team={team} />
          )) })
        })
      })
      .catch(console.error)
  }

  render () {
    const { user } = this.props
    const { redirect } = this.state

    if (!user) {
      return <Redirect to="/sign-in" />
    }

    if (redirect) {
      return redirect
    }

    return (
      <div className="container">
        <div className="row justify-content-center border-std mt-3">
          <h1 className="text-center">My Teams</h1>
        </div>
        {this.state.teamsJsx}
        <div className="row justify-content-center p-2 border-std-x border-std-b">
          <Button
            variant="secondary"
            onClick={this.onCreate}
          >
            New Team
          </Button>
        </div>
      </div>
    )
  }
}

export default Home
