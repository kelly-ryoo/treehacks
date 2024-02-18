import './App.css';
import earth from './images/earth.png';

function TopIntro() {
  return (
    <div className="TopIntro jumbotron-fluid d-flex align-items-center">
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h1 className="topIntroH1">Education Inequality</h1>
            <h3>throughout the World</h3>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <img src={earth} width="450" height="450" alt="cam" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default TopIntro;
