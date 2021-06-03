import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import { deleteTeam } from '../../api/teams'

class TeamPreview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      team: this.props.team
    }
  }

  onDelete = () => {
    console.log('onDelete', this.props)
    const { user, team } = this.props
    console.log('onDelete', `user: ${user}`, `team: ${team}`)
    deleteTeam(user, team)
      .then(() => this.setState({ team: null }))
      .catch(console.error)
  }

  render () {
    const { team } = this.state
    if (!team) {
      return null
      // return (
      //   <div className="row justify-content-center p-2 border-std-x border-std-b">
      //     <Button
      //       variant="secondary"
      //       onClick={this.onCreate}
      //     >
      //       New Team
      //     </Button>
      //   </div>
      // )
    }

    return (
      <div className="row justify-content-between p-2 border-std-x border-std-b">
        <div>
          <h3>{team.title}</h3>
        </div>
        <div>
          {/* Sprites will go here */}
        </div>
        <div>
          <Button
            className="mr-1"
            variant="secondary"
            // onClick={edit}
          >
            View/Edit Team
          </Button>
          <Button
            variant="secondary"
            onClick={this.onDelete}
          >
            Delete Team
          </Button>
        </div>
      </div>
    )
  }
}

export default TeamPreview
