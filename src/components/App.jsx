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
    btnRandom: 'buttonStyle',
    intervalRandom: null,
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
    this.setState({
      pokemonName: e.target.dataset.name,
      modal: 'modal-overlay is-open',
    });
  };

  handlerCloseModal = e => {
    if (e.currentTarget === e.target) {
      this.setState({
        pokemonInfo: null,
        pokemonName: '',
        modal: 'modal-overlay',
      });
    }
  };

  handlerCloseModal2 = () => {
    this.setState({
      pokemonInfo: null,
      pokemonName: '',
      modal: 'modal-overlay',
    });
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

    setTimeout(() => {
      this.setState({ btnRandom: 'buttonStyle random' });
    }, 100);
    setTimeout(() => {
      this.setState({ btnRandom: 'buttonStyle' });
    }, 200);
  };

  render() {
    return (
      <div className='container'>
        <div onClick={this.handlerButtons} className="buttonsContainer">
          <ButtonsMarkup
            shoveBtn={this.state.blackOnBtn}
            buttonsInfo={this.state.buttonsInfo}
            btnRandom={this.state.btnRandom}
          ></ButtonsMarkup>
        </div>
        {this.state.pokemonInfo && (
          <div onClick={this.handlerCloseModal} className={this.state.modal}>
            <PokemonMarkup
              pokemonInfo={this.state.pokemonInfo}
              pokemonName={this.state.pokemonName}
              closeModal2={this.handlerCloseModal2}
            ></PokemonMarkup>
          </div>
        )}
        <button onClick={this.handlerShoveButtons} className="shove-buttons">
          Show Buttons
        </button>
        <button className="randomBtn" onClick={this.handlerRandomButtons}>
          Random
        </button>
      </div>
    );
  }
}
