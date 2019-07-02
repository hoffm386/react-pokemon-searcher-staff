import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {

  passDataToCard = (data) => {
    return (
      <PokemonCard key={data.id}
        name={data.name}
        frontPhoto={data.frontPhoto}
        backPhoto={data.backPhoto}
        hp={data.hp} />
    );
  }

  render() {
    return (
      <Card.Group itemsPerRow={6}>
          {this.props.pokemon.map(this.passDataToCard)}
      </Card.Group>
    )
  }
}

export default PokemonCollection
