import { Component } from 'react';

export class PokemonMarkup extends Component {
  state = {
    namImg: 1,
    modal: false,
  };

  handlerOne = () => {
    this.setState({ namImg: 1 });
  };

  handlerTwo = () => {
    this.setState({ namImg: 2 });
  };
  handlerThree = () => {
    this.setState({ namImg: 3 });
  };
  handlerFour = () => {
    this.setState({ namImg: 4 });
  };

  specialBg = base_experience => {
    if (base_experience < 100) {
      return 'linear-gradient(90deg,#55a246,#70ca94,#a3f0d8)';
    } else if (base_experience > 100 && base_experience < 200) {
      return 'linear-gradient(90deg,#d357fe,#be38f3,#7a219e)';
    } else {
      return 'linear-gradient(90deg,#db9d00,#ffbf00,#ffd53d)';
    }
  };

  render() {
    return (
      <div
        className="pokemonContainer"
        style={{
          backgroundImage: this.specialBg(
            this.props.pokemonInfo.base_experience
          ),
        }}
      >
        <div className="pokemonImgContainer">
          {this.state.namImg === 1 && (
            <img
              src={
                this.props.pokemonInfo.sprites.other['official-artwork']
                  .front_default
              }
              width={300}
              height={300}
              alt={this.props.pokemonInfo.name}
            ></img>
          )}
          {this.state.namImg === 2 && (
            <img
              src={
                this.props.pokemonInfo.sprites.other.dream_world.front_default
              }
              width={300}
              height={300}
              alt={this.props.pokemonInfo.name}
            ></img>
          )}
          {this.state.namImg === 3 && (
            <img
              src={this.props.pokemonInfo.sprites.other.home.front_default}
              width={300}
              height={300}
              alt={this.props.pokemonInfo.name}
            ></img>
          )}
          {this.state.namImg === 4 && (
            <img
              src={this.props.pokemonInfo.sprites.other.showdown.front_shiny}
              width={300}
              height={300}
              alt={this.props.pokemonInfo.name}
            ></img>
          )}
        </div>
        <div className="buttonsContainer">
          <button onClick={this.handlerOne} className="buttonChangeImg">
            1
          </button>
          <button onClick={this.handlerTwo} className="buttonChangeImg">
            2
          </button>
          <button onClick={this.handlerThree} className="buttonChangeImg">
            3
          </button>
          <button onClick={this.handlerFour} className="buttonChangeImg">
            4
          </button>
        </div>
        <div className="pokemonInfo">
          <h1>{this.props.pokemonInfo.name}</h1>
          <p className='description' >Height: {this.props.pokemonInfo.height} sm</p>
          <p className='description' >Weight: {this.props.pokemonInfo.weight} gr</p>
          <p className='description' >Damage: {this.props.pokemonInfo.base_experience}</p>
        </div>
      </div>
    );
  }
}
