import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

class TeamPreview extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <div className="row justify-content-between p-2 border-std-x border-std-b">
        <div>
          <h3>{this.props.team.title}</h3>
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
            // onClick={delete}
          >
            Delete Team
          </Button>
        </div>
      </div>
    )
  }
}

export default TeamPreview
