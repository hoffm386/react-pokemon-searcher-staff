import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then(res => res.json())
      .then(res => {
        const pokemonLessVerbose = res.map(this.getDataAboutPokemon);
        this.setState(() => {
          return {pokemon: pokemonLessVerbose};
        })
      })
  }

  getDataAboutPokemon = (data) => {
    return {
      id: data.id,
      name: data.name,
      frontPhoto: data.sprites.front,
      backPhoto: data.sprites.back,
      hp: data.stats.find((stat) => stat.name === "hp").value,
      visible: true
    };
  }

  filterPokemon = (e, semanticProps) => {
    this.setState((prevState) => {
      const pokemon = prevState.pokemon.slice();
      for (const data of pokemon) {
        // if there's no query, any string includes the empty string
        data.visible = data.name.includes(semanticProps.value);
      }
      return {pokemon: pokemon};
    });
  }

  addNewPokemon = (result) => {
    const newPokemon = this.getDataAboutPokemon(result);
    this.setState(prevState => {
      const prevPokemon = prevState.pokemon.slice();
      prevPokemon.push(newPokemon);
      return {pokemon: prevPokemon};
    });
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.filterPokemon, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.state.pokemon.filter((data) => data.visible)}/>
        <br />
        <PokemonForm indexHandleSubmit={this.addNewPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
