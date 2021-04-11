import { render } from "@testing-library/react";
import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      isFetch: false,
      busqueda: "",
    };
  }
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1118")
      .then((response) => response.json())
      .then((pokeOne) => {
        this.setState({ pokemon: pokeOne.results, isFetch: true });
      });
  }
  handleChange = (event) => {
    let { value } = event.target;
    value = value.toLowerCase();
    this.setState({ busqueda: value });
    console.log(this.state.busqueda);
  };
  render() {
    return (
      <div className="App bg-gray-100">
        <HeaderBar
          busqueda={this.state.busqueda}
          onChange={this.handleChange}
        ></HeaderBar>
        {console.log(this.state.isFetch)}
        {this.state.isFetch && (
          <div className="contenedor mt-5 container h-auto m-auto p-5 flex flex-row flex-wrap justify-center">
            {console.log(this.state.pokemon)}
            {this.state.pokemon.map((item, index) => {
              // console.log(item);
              return (
                <PokemonCards
                  pokemones={item}
                  busqueda={this.state.busqueda}
                  key={index}
                ></PokemonCards>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
function HeaderBar(props) {
  return (
    <div className="header-bar flex flex-row justify-around h-20 text-2xl">
      <div className="logo flex flex-row items-center">
        <img
          src="https://webstockreview.net/images/pikachu-clipart-top-pokeball.png"
          alt="logo"
          className="h-full"
        ></img>
        <h2>Pokemons</h2>
      </div>
      <div
        className="busqueda flex flex-row justify-end items-center"
        id="busqueda"
      >
        <label>
          <input
            type="text"
            value={props.busqueda}
            onChange={props.onChange}
            className="mr-2"
          ></input>
          Search
        </label>
      </div>
    </div>
  );
}
class PokemonCards extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isFetch2: false,
      pokemons2: {},
    };
  }

  componentDidMount() {
    console.log(this.props.pokemones);
    fetch(this.props.pokemones.url).then((response) =>
      response.json().then((response) => {
        this.setState({ pokemons2: response });
      })
    );
  }
  render() {
    const name = this.props.pokemones.name;
    const busqueda = this.props.busqueda;
    if (this.state.pokemons2.sprites === undefined) return "Cargando";
    else {
      if (name.startsWith(busqueda) || busqueda === "") {
        return (
          <div className="card bg-white my-2.5 mx-2.5 p-2 flex flex-col justify-around">
            <p className="text-2xl text-center">{this.props.pokemones.name}</p>
            <img
              src={this.state.pokemons2.sprites.front_shiny}
              className="h-52 object-cover my-1.5"
            ></img>
            <div className="flex flex-row flex-wrap justify-around my-1.5">
              {this.state.pokemons2.types.map((item, index) => {
                return (
                  <div
                    className="w-auto p-2 rounded-lg border-2 border-black"
                    id={item.type.name}
                    key={index}
                  >
                    {item.type.name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      } else {
        return false;
      }
    }
  }
}

export default App;
