import { useState } from 'react';

export const PokemonMarkup = ({ pokemonInfo, closeModal2 }) => {
  const [num, setNum] = useState(1);

  const specialBg = base_experience => {
    if (base_experience < 100) {
      return 'linear-gradient(90deg,#55a246,#70ca94,#a3f0d8)';
    } else if (base_experience > 100 && base_experience < 200) {
      return 'linear-gradient(90deg,#d357fe,#be38f3,#7a219e)';
    } else {
      return 'linear-gradient(90deg,#db9d00,#ffbf00,#ffd53d)';
    }
  };

  return (
    <div
      className="pokemonContainer"
      style={{
        backgroundImage: specialBg(pokemonInfo.base_experience),
      }}
    >
      <button className="closeModal2" onClick={closeModal2}>
        ×
      </button>
      <div className="pokemonImgContainer">
        {num === 1 && (
          <img
            src={pokemonInfo.sprites.other['official-artwork'].front_default}
            width={300}
            height={300}
            alt={pokemonInfo.name}
          ></img>
        )}
        {num === 2 && (
          <img
            src={pokemonInfo.sprites.other.dream_world.front_default}
            width={300}
            height={300}
            alt={pokemonInfo.name}
          ></img>
        )}
        {num === 3 && (
          <img
            src={pokemonInfo.sprites.other.home.front_default}
            width={300}
            height={300}
            alt={pokemonInfo.name}
          ></img>
        )}
        {num === 4 && (
          <img
            src={pokemonInfo.sprites.other.showdown.front_shiny}
            width={300}
            height={300}
            alt={pokemonInfo.name}
          ></img>
        )}
      </div>
      <div className="buttonsContainer">
        <button onClick={() => setNum(1)} className="buttonChangeImg">
          1
        </button>
        <button onClick={() => setNum(2)} className="buttonChangeImg">
          2
        </button>
        <button onClick={() => setNum(3)} className="buttonChangeImg">
          3
        </button>
        <button onClick={() => setNum(4)} className="buttonChangeImg">
          4
        </button>
      </div>
      <div className="pokemonInfo">
        <h1>{pokemonInfo.name}</h1>
        <ul>
          <li className="description">Height: {pokemonInfo.height} sm</li>
          <li className="description">Weight: {pokemonInfo.weight} gr</li>
          <li className="description damage">
            Damage: {pokemonInfo.base_experience}
          </li>
        </ul>
      </div>
    </div>
  );
};
