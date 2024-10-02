import { Component } from 'react';
import { PokemonMarkup } from './PokemonMarkup/PokemonMarkup';
import { pokemonApi } from './PokemonMarkup/pokemon-api';
import { ButtonsMarkup } from './PokemonMarkup/ButtonsMarkup';
import { buttonsInfo } from './buttons-info-arr';

export class App extends Component {
  state = {
    pokemonInfo: null,
    pokemonName: '',
    modal: 'modal-overlay',
    blackOnBtn: true,
    buttonsInfo,
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.pokemonName !== prevState.pokemonName) {
      try {
        if (this.state.pokemonName) {
          const response = await pokemonApi(this.state.pokemonName);
          this.setState({ pokemonInfo: response });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  handlerButtons = e => {
    if (e.target.textContent.length < 15) {
      this.setState({ pokemonName: e.target.textContent });
    }
  };

  handlerCloseModal = e => {
    console.log(e.currentTarget);
    console.log(e.target);
    if (e.currentTarget === e.target) {
      this.setState({
        pokemonInfo: null,
        pokemonName: '',
        modal: 'modal-overlay',
      });
    }
  };

  openModal = () => {
    if (this.state.pokemonInfo) {
      this.setState({ modal: 'modal-overlay is-open' });
    }
  };

  handlerShoveButtons = () => {
    this.setState(({ blackOnBtn }) => ({ blackOnBtn: !blackOnBtn }));
  };

  handlerRandomButtons = () => {
    const maxLength = this.state.buttonsInfo.length;

    this.setState(({ buttonsInfo }) => {
      return {
        buttonsInfo: buttonsInfo.map(item => {
          return {
            ...item,
            id: Math.round(Math.random() * (maxLength - 1) + 1),
          };
        }),
      };
    });
    this.setState(({ buttonsInfo }) => ({
      buttonsInfo: buttonsInfo.toSorted((a, b) => a.id - b.id),
    }));
  };

  render() {
    return (
      <>
        <div onClick={this.handlerButtons} className="buttonsContainer">
          <ButtonsMarkup
            shoveBtn={this.state.blackOnBtn}
            buttonsInfo={this.state.buttonsInfo}
          ></ButtonsMarkup>
        </div>
        {this.state.pokemonInfo && (
          <div
            onClick={this.handlerCloseModal}
            className="modal-overlay is-open"
          >
            <PokemonMarkup
              pokemonInfo={this.state.pokemonInfo}
              pokemonName={this.state.pokemonName}
            ></PokemonMarkup>
          </div>
        )}
        <button onClick={this.handlerShoveButtons} className="shove-buttons">
          Shove Buttons
        </button>
        <button className='randomBtn' onClick={this.handlerRandomButtons}>random</button>
      </>
    );
  }
}
