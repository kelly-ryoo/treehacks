import './App.css';
import { feature } from 'topojson-client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import worldData from './worldmap.topo.json';
import inequalityData from './global_inequality.csv';
import isoCountry from './iso-to-country.csv';


const GlobalMap = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();


  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.width.baseVal.value;
    const height = svgRef.current.height.baseVal.value;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const mapWidth = width - margin.left - margin.right;
    const mapHeight = height - margin.top - margin.bottom;

    const countries = feature(worldData, worldData.objects.countries);
    const projection = d3.geoMercator().fitSize([mapWidth, mapHeight], countries);
    const path = d3.geoPath().projection(projection);

    const tooltip = svg.append('g');
    const viewport = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    tooltipRef.current = tooltip.node();

    tooltip.append('rect')
      .attr("fill", "black")
      .attr("opacity", 0)
      .attr("width", 120)
      .attr("height", 40)
      .style("z-index", 100);

    tooltip.append('text')
      .attr('x', 10)
      .attr('y', 25)
      .style('font-size', '12px')
      .style('fill', 'white').style("z-index", 101);


    d3.csv(inequalityData).then(data => {

      d3.csv(isoCountry).then(isoCountryData => {

        const inequalityMap = new Map(data.map(d => [d['ISO3'], d['Inequality in Education (2021)']]));
        const hdiMap = new Map(data.map(d => [d['ISO3'], d['HDI Rank (2021)']]));
        const isoMap = new Map(isoCountryData.map(d => [d['country-code'], d['alpha-3']]));
        const threeToNameMap = new Map(isoCountryData.map(d => [d['alpha-3'], d['name']]));

        // Draw countries
        viewport.selectAll('path')
          .data(countries.features)
          .join("path")
          .attr("d", path)
          .attr('fill', 'rgb(255,255,255,0.1)')
          .attr('stroke', 'white')
          .attr('stroke-width', 0.5)
          .on('mouseover', function (event, d) {
            const [x, y] = d3.pointer(event);
            const countryISO = d.id;
            const countryThreeCode = isoMap.get(countryISO);
            const countryName = threeToNameMap.get(countryThreeCode);
            const inequalityIndex = inequalityMap.get(countryThreeCode) || 'N/A';
            const hdiIndex = hdiMap.get(countryThreeCode) || 'N/A';
            tooltip.attr('transform', `translate(${x + 5},${y + 10})`)
              .style('visibility', 'visible')
              .select('text')
              .html(`<tspan>Country: ${countryName}</tspan><tspan dy="1.2em" x="10">Inequality Index: ${inequalityIndex}</tspan><tspan dy="1.2em" x="10">HDI: ${hdiIndex}</tspan>`)
              .style("z-index", 101);
            tooltip.select('rect').attr("opacity", 1).style("z-index", 100);
            const textElement = tooltip.select('text').node();
            const bbox = textElement.getBBox();
            const padding = 10; // Add some padding around the text
            tooltip.select('rect')
              .attr("width", bbox.width + padding * 2)
              .attr("height", bbox.height + padding * 2);
          })
          .on('mouseout', function () {
            tooltip.select('text')
              .text("");
            tooltip.select('rect').attr("opacity", 0);
          });
      });
    });
  }, []);

  return (
    <div>
      <svg ref={svgRef} id="svgmap" width="100vw" height="100vh"></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
}

export default GlobalMap;