import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor() {
    super();
    this.state = {
      front: true
    }
  }

  togglePhotoSide = () => {
    this.setState(prevState => {
      return {front: !prevState.front}
    });
  }
  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img alt="oh no!"
                src={this.state.front ? this.props.frontPhoto : this.props.backPhoto}
                onClick={this.togglePhotoSide}/>
          </div>
          <div className="content">
            <div className="header">{this.props.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.hp} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
