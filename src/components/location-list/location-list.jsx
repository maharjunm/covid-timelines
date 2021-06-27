import React, { useCallback } from 'react';
import { Dropdown } from 'semantic-ui-react'
import confirmed from '../../data/confirmed.json';
import './index.css';

const LocationList = ({ updateCountry, country }) => {
    const countries = {};
    confirmed.forEach(eachItem => {
        if (countries[eachItem["Country/Region"]]) {
            const state = eachItem["Province/State"];
            countries[eachItem["Country/Region"]].push(state)
        } else {
            countries[eachItem["Country/Region"]] = [];
        }
    });
    const handleChange = useCallback((e, {value}) => {
        updateCountry({ country: value, states: countries[value] });
    }, [updateCountry]);

    const handleState = useCallback((e, {value}) => {
        updateCountry({ ...country, selectedState: value });
    }, [updateCountry, country]);
    
    const countryOptions = Object.keys(countries).map(eachCountry => {
        return { text: eachCountry, value: eachCountry };
    });
    const stateOptions = (country.states || []).map(eachState => {
        return { text: eachState, value: eachState };
    });
    return (
        <div className="dropdowns-container">
            <div className="countries-container">
                <div className="label-container">
                    <label className="country-label">Countries</label>
                </div>
                <Dropdown
                    search
                    selection
                    onChange={handleChange} options={countryOptions}
                />
            </div>
            {
                country.states && country.states.length ?
                (
                <div className="countries-container">
                    <div className="label-container">
                        <label className="country-label">States</label>
                    </div>
                    <Dropdown
                        search
                        selection
                        onChange={handleState} options={stateOptions}
                    />
                </div>
                ): null
            }
        </div>
    )
}

export default LocationList;