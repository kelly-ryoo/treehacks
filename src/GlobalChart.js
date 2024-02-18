import './App.css';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import inequalityData from './global_inequality.csv';

const GlobalChart = () => {

  useEffect(() => {
    d3.csv(inequalityData).then((data) => {
      const svg = d3.select("#globalchart");
      const width = svg.attr('width');
      const height = svg.attr('height');
      const margins = { top: 20, right: 10, bottom: 50, left: 50 };
      const chartWidth = width - margins.left - margins.right;
      const chartHeight = height - margins.top - margins.bottom;

      data.forEach((d) => {
        d['HDI Rank (2021)'] = Number(d['HDI Rank (2021)']);
        d['Inequality in Education (2021)'] = Number(d['Inequality in Education (2021)']);
      });

      let chartArea = svg.append('g').attr('transform', `translate(${margins.left},${margins.top})`);
      const hdiExtent = d3.extent(data, d => d['HDI Rank (2021)']);
      const inequalityExtent = d3.extent(data, d => d['Inequality in Education (2021)']);

      const xScale = d3.scaleLinear().domain(hdiExtent).range([0, chartWidth]);
      const yScale = d3.scaleLinear().domain(inequalityExtent).range([chartHeight, 0]);

      let leftAxis = d3.axisLeft(yScale);
      svg.append('g').attr('transform', `translate(${margins.left - 10},${margins.top})`).call(leftAxis);
      let leftGridlines = d3.axisLeft(yScale).tickSize(-chartWidth - 10).tickFormat('');
      svg.append('g').attr('transform', `translate(${margins.left - 10},${margins.top})`).lower().call(leftGridlines);

      let bottomAxis = d3.axisBottom(xScale);
      svg.append('g').attr('transform', `translate(${margins.left},${chartHeight + margins.top + 10})`).call(bottomAxis);
      let bottomGridlines = d3.axisBottom(xScale).tickSize(-chartWidth - 10).tickFormat('');
      svg.append('g').attr('transform', `translate(${margins.left},${chartHeight + margins.top + 10})`).lower().call(bottomGridlines);

      data.forEach((d, i) => {
        chartArea.append('circle').attr('r', 3).attr('cx', xScale(d['HDI Rank (2021)'])).attr('cy', yScale(d['Inequality in Education (2021)'])).attr('fill', 'white');
      });

      svg.append('text').attr('x', - svg.attr('height') / 2).attr('y', 10).attr("transform", "rotate(-90)").style('text-anchor', "middle").text("Inequality Index").style('fill', 'white');
      svg.append('text').attr('x', svg.attr('width') / 2).attr('y', svg.attr('height') - 5).style('text-anchor', "middle").text("Human Development Index").style('fill', 'white');



      let circles = chartArea.selectAll("circle").data(data);
      let label = chartArea.append('text').attr('id', 'label');
      circles.on("mouseover", function () {
        d3.select(this).attr("stroke-width", 2).attr("stroke", "black").attr("r", 7);
        let title = d3.select(this).datum()['Country'];
        d3.select("#label").text(title).style('fill', 'white');
      });
      circles.on("mouseout", function () {
        d3.select(this).attr("r", 3).attr("stroke-width", 0);
        d3.select("#label").text("").attr("font-size", "25");
      })

    });
  }, []);

  return (
    <div>
      <div className="GlobalChart jumbotron-fluid d-flex align-items-center">
        <div className="container text-center">

          <div className="row">
            <div className="col">
              <h1 className="topIntroH1">Inequality in Education</h1>
              <h5>What kind of relationship does inequality have versus HDI?</h5>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <svg id="globalchart" width="850" height="500"></svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default GlobalChart;
