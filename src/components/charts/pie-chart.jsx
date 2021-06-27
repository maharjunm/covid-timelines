import React, { useMemo } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts'
import {getTopCountries} from './../../utils/get-country-details';

const PieChart = () => {
    const topValues = getTopCountries();
    const totalSum = topValues.reduce((acc, row) => acc+row.value, 0);
    const percentages = topValues.map(eachRow => {
        return {
            y: Number(((eachRow.value)/totalSum)*100).toFixed(2),
            label: `${eachRow.state ? eachRow.state + " / " + eachRow.country: eachRow.country}`}
    });
    const options = {
        animationEnabled: true,
        title: {
            text: "Top 5 Covid Cases Countries "
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: percentages
        }]
    }
    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default PieChart;