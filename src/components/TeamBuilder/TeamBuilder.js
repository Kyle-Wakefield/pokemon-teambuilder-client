import React, { Component } from 'react'
import { withRouter } from 'react-router'

import Button from 'react-bootstrap/Button'

import { getTeam } from '../../api/teams'

class TeamPreview extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    const { user, match } = this.props
    getTeam(user, match.params.id)
      .then(res => this.setState({ team: res.data.team }))
      // .then(res => console.log(res))
      // .then(() => console.log(this.state))
      .catch(console.error)
  }

  render () {
    const { team } = this.state

    if (!team) {
      return null
    }

    return (
      <div className="container">
        <div className="row mt-2">
          <Button variant="secondary" onClick={this.onCancel}>
            Cancel
          </Button>
          <h2 className="mx-auto">Team Name: {team.title}</h2>
        </div>
      </div>
    )
  }
}

export default withRouter(TeamPreview)
