import React from 'react';
import { IButtonInfo } from '../App.';

interface IPropsButtonsMarkup {
  shoveBtn: boolean;
  buttonsInfo: IButtonInfo[];
  btnRandom: string;
}

export const ButtonsMarkup: React.FC<IPropsButtonsMarkup> = ({
  shoveBtn,
  buttonsInfo,
  btnRandom,
}) => {
  return buttonsInfo.map(({ name }: IButtonInfo, idx: number) => (
    <button key={idx} className={btnRandom} data-name={name}>
      {name} {shoveBtn && <span data-name={name} className="hide-btn"></span>}
    </button>
  ));
};

//
