export const ButtonsMarkup = ({ shoveBtn, buttonsInfo, btnRandom }) => {
  return buttonsInfo.map(({ name }, idx) => (
    <button key={idx} className={btnRandom} data-name={name}>
      {name} {shoveBtn && <span data-name={name} className="hide-btn"></span>}
    </button>
  ));
};

//
