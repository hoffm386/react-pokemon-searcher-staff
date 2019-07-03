import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      searchQuery: ""
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
    const searchQuery = semanticProps.value;
    this.setState((prevState) => {
      const pokemon = prevState.pokemon.slice();
      for (const data of pokemon) {
        // if there's no query, any string includes the empty string
        data.visible = data.name.includes(searchQuery);
      }
      return {
        pokemon: pokemon,
        searchQuery: searchQuery
      };
    });
  }

  addNewPokemon = (result) => {
    const newPokemon = this.getDataAboutPokemon(result);
    // getDataAboutPokemon is also used in the initial page load. we're doing
    // almost the same thing, but we also want to conditionally set the visibility
    newPokemon.visible = newPokemon.name.includes(this.state.searchQuery);

    this.setState(prevState => {
      const pokemon = prevState.pokemon.slice();
      pokemon.unshift(newPokemon);
      return {pokemon: pokemon};
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
