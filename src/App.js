import './App.css';
import TopIntro from './TopIntro.js';
import GlobalMapIntro from './GlobalMapIntro.js';
import GlobalMap from './GlobalMap.js';
import GlobalChart from './GlobalChart.js';
import React, { useEffect } from 'react';
import FinalPage from './FinalPage.js';

// https://www.kaggle.com/datasets/iamsouravbanerjee/inequality-in-education-around-the-world?resource=download



const App = () => {
  useEffect(() => {

  }, []);

  return (
    <div className="App">

      <script src="https://d3js.org/d3.v7.min.js"></script>

      <script src="https://d3js.org/topojson.v3.min.js"></script>

      <TopIntro></TopIntro>
      <GlobalMapIntro></GlobalMapIntro>
      <GlobalMap></GlobalMap>
      <GlobalChart></GlobalChart>
      <FinalPage></FinalPage>

    </div>
  );
}

export default App;
