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
    textModalStart: true,
    textModalStartNext: false,
    found: false,
    counter: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ textModalStart: false });
    }, 4900);
    setTimeout(() => {
      if (!this.state.textModalStart) {
        setTimeout(() => {
          this.setState({ textModalStartNext: true });
        }, 100);
        setTimeout(() => {
          this.setState({ textModalStartNext: false });
        }, 3000);
      }
    }, 4950);
  }

  async componentDidUpdate(_, prevState) {
    if (this.state.pokemonName !== prevState.pokemonName) {
      try {
        if (this.state.pokemonName) {
          const response = await pokemonApi(this.state.pokemonName);
          this.setState({ pokemonInfo: response });

          if (response.base_experience >= 200) {
            this.setState({ found: true, textModalStart: false });
            this.setState({textModalStartNext: false})
            this.setState(prevState => {
              return {
                counter: (prevState.counter += 1),
              };
            });
            setTimeout(()=>{
              this.setState({counter:0, found:false})
            }, 8000)
          } else {
            this.setState(prevState => {
              return {
                counter: (prevState.counter += 1),
                textModalStart: false,
              };
            });
          }
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

    this.setState({ textModalStartNext: false});
    setTimeout(() => {
      this.setState({ textModalStartNext: false });
    }, 3101);
  };

  handlerCloseModal = e => {
    if (e.currentTarget === e.target) {
      this.setState({
        pokemonInfo: null,
        pokemonName: '',
        modal: 'modal-overlay',
      });
    }
        this.setState({ textModalStartNext: false});
    setTimeout(() => {
      this.setState({ textModalStartNext: false });
    }, 3101);
  };

  handlerCloseModal2 = () => {
    this.setState({
      pokemonInfo: null,
      pokemonName: '',
      modal: 'modal-overlay',
    });
        this.setState({ textModalStartNext: false});
    setTimeout(() => {
      this.setState({ textModalStartNext: false });
    }, 3101);
  };

  handlerShoveButtons = () => {
    this.setState(({ blackOnBtn }) => ({ blackOnBtn: !blackOnBtn }));
  };

  handlerRestartButtons = () => {
    this.setState({
      textModalStart: true,
      textModalStartNext: false,
      found: false,
      counter: 0,
    });
    setTimeout(() => {
      this.setState({ textModalStart: false });
    }, 4900);
    setTimeout(() => {
      if (!this.state.textModalStart) {
        setTimeout(() => {
          this.setState({ textModalStartNext: true });
        }, 100);
        setTimeout(() => {
          this.setState({ textModalStartNext: false });
        }, 3000);
      }
    }, 4950);
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
      <div className="container">
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
        <button className="restartBtn" onClick={this.handlerRestartButtons}>
          Restart
        </button>
        {this.state.textModalStart && (
          <p className="text-modal">
            Are you <br></br> lucky?<br></br> Find the <br></br>Legendary
            <br></br> Pokemon
          </p>
        )}
        {this.state.textModalStartNext && (
          <p className="text-modal-next">Good luck😅</p>
        )}
        {this.state.found && (
          <p className="text-modal-victory">
            Victory🎉<br></br>You clicked <br></br> {this.state.counter} times
          </p>
        )}
        <p className="tryNum">{this.state.counter}</p>
      </div>
    );
  }
}
