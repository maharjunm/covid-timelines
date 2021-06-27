import React, { useMemo } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts'
import getAllCases from './../../utils/get-country-details';

const ChartsContainer = ({ country, dates }) => {
  const allCases = useMemo(() => getAllCases(country, dates), [country, dates]);
  const options = {
    animationEnabled: true,
    title: {
      text: "Covid Timeline"
    },
    axisY: {
      title: "Number of cases"
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: "Confirmed cases",
      showInLegend: true,
      dataPoints: allCases.confirmedCases
    },
    {
      type: "spline",
      name: "Deceased cases",
      showInLegend: true,
      dataPoints: allCases.deathCases
    },
    {
      type: "spline",
      name: "recovered cases",
      showInLegend: true,
      dataPoints: allCases.recoveredCases
    }]
  }
  return (
    <div>
      {country && country.states && country.states.length === 0  && <CanvasJSChart options={options} />}
      {country && country.states && country.states.length && country.selectedState && <CanvasJSChart options={options} />}
    </div>
  )
}

export default ChartsContainer;