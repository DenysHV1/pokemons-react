export const ButtonsMarkup = ({ shoveBtn, buttonsInfo }) => {
  return buttonsInfo.map(({ name }, idx) => (
    <div className="buttonsContainerInner" key={idx}>
      <button className="buttonStyle">{name}</button>
      {shoveBtn && <span className="hide-btn"></span>}
    </div>
  ));
};
