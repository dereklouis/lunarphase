import './App.css';
import sun from './images/sun.png';
import earth from './images/earth.png';
import moon from './images/moon.png';
// import bigMoon from './images/bigMoon.png';
import lunarPhases from './images/lunarPhases.gif';

function App() {
  return (
    <div id="appMaster">
      {/* <div id="bigMoonBox">
        <img src={bigMoon} alt="current lunar phase" id="bigMoon" />
        <div id="bigMoonShadow" />
      </div> */}
      <img src={lunarPhases} alt="Lunar Phases" id="lunarPhases" />
      <div id="earthOrbit">
        <div id="lunarOrbit">
          <div id="moonBox">
            <img src={moon} alt="moon" id="moon" />
            <div id="lunarShadow" />
          </div>
          <div id="earthBox">
            <img src={earth} alt="earth" id="earth" />
            <div id="earthShadow" />
          </div>
        </div>
      </div>
      <img src={sun} alt="sun" id="sun" />
    </div>
  );
}

export default App;
