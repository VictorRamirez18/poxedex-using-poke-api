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
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=444")
      .then((response) => response.json())
      .then((pokeOne) => {
        this.setState({ pokemon: pokeOne.results, isFetch: true });
      });
  }
  handleChange = (event) => {
    let { name, value } = event.target;
    value = value.toLowerCase();
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="App bg-gray-100">
        <HeaderBar
          busqueda={this.state.busqueda}
          onChange={this.handleChange}
        ></HeaderBar>
        <h2
          className="mx-auto sm:text-center mt-5 text-4xl"
          style={{ fontFamily: "Semibold" }}
        >
          Pokedex
        </h2>
        {this.state.isFetch && (
          <div className="contenedor mt-5 container m-auto h-auto p-1 flex flex-row flex-wrap justify-between sm:justify-center">
            {this.state.pokemon.map((item, index) => {
              return (
                <PokemonCards
                  pokemones={item}
                  busqueda={this.state.busqueda}
                  index={index + 1}
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
    <div className="header-bar flex flex-col sm:flex-row justify-around h-40 sm:h-20 text-2xl items-center">
      <div className="logo w-full sm:w-1/2 flex flex-row justify-start items-center h-1/2 sm:h-full">
        <img
          src="https://webstockreview.net/images/pikachu-clipart-top-pokeball.png"
          alt="logo"
          className="h-full"
        ></img>
        <h2 className="text-white">Pokemons</h2>
      </div>
      <div
        className="busqueda w-full sm:w-1/2 flex flex-row justify-end items-center h-1/2 sm:h-full sm:items-center"
        id="busqueda"
      >
        <label className="mx-auto flex justify-around items-center text-white">
          <input
            type="text"
            name="busqueda"
            value={props.busqueda}
            onChange={props.onChange}
            className="p-1 w-3/5 text-black rounded-md"
            placeholder="busqueda"
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
      back: true,
    };
  }

  componentDidMount() {
    fetch(this.props.pokemones.url).then((response) =>
      response.json().then((response) => {
        this.setState({ pokemons2: response });
      })
    );
  }
  render() {
    const name = this.props.pokemones.name;
    const valueBack = this.state.back ? false : true;
    const busqueda = this.props.busqueda;
    const back = this.state.back;
    if (this.state.pokemons2.sprites === undefined) return <p>"Cargando"</p>;
    else {
      if (name.startsWith(busqueda) || busqueda === "") {
        return (
          <div className="card text-white my-1 mx-0.5 sm:my-2 sm:mx-2 p-0.5 flex flex-col justify-around sm:justify-around lg:w-1/5 w-40 sm:w-1/3 h-64 rounded-md">
            <div className="w-full flex  items-center justify-around">
              <p className="text-2xl text-center w-full capitalize break-words">
                {this.props.pokemones.name}
              </p>
            </div>
            <div className="flex w-full">
              <div className="w-1/2 flex flex-col justify-around items-center">
                <div className="flex flex-row flex-wrap justify-around my-1.5 w-full">
                  {this.state.pokemons2.types.map((item, index) => {
                    return (
                      <div
                        className="tipos w-auto p-2 rounded-lg"
                        id={item.type.name}
                        key={index}
                      >
                        {item.type.name}
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btnImgBack bg-black w-auto p-1 rounded"
                  onClick={() => this.setState({ back: valueBack })}
                >
                  Back
                </button>
                <span>#{this.props.index}</span>
              </div>
              <div className="imagen w-1/2 flex items-end">
                <div className="w-full">
                  {back && (
                    <img
                      src={this.state.pokemons2.sprites.front_default}
                      className="object-cover my-1.5 w-full h-auto"
                      alt={this.props.pokemones.name}
                    ></img>
                  )}
                  {back === false && (
                    <img
                      src={this.state.pokemons2.sprites.back_default}
                      className="object-cover my-1.5 w-full h-auto"
                      alt={this.props.pokemones.name}
                    ></img>
                  )}
                </div>
              </div>
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
