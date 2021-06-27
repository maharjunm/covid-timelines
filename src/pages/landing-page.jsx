import React, { useCallback, useState } from 'react';
import LocationList from '../components/location-list';
import Charts from '../components/charts';
import DatePicker from '../components/time-line-selector/time-line-selector';
import { defaultDates } from './../utils/get-country-details';
import PieChart from '../components/charts/pie-chart';
import './index.css';

const LandingPage = () => {
    const [selectedCountry, setSelectedCountry] = useState({});
    const [dates, setDates] = useState(defaultDates);

    const updateDates = useCallback((field, value) => {
        setDates({ ...dates, [field]: value });
    }, [dates, setDates]);
    const updateCountry = useCallback((country) => {
        setSelectedCountry(country);
    }, [setSelectedCountry]);
    return (
        <div>
            <div>
                <PieChart />
            </div>
            <div className="filter-container">
                <label className="title"> Filter and Check Country's Specific data </label>
                <DatePicker updateDates={updateDates} dates={dates} />
                <LocationList updateCountry={updateCountry} country={selectedCountry} />
                <Charts dates={dates} country={selectedCountry} />
            </div>
        </div>
    )
}
export default LandingPage;