import confirmed from './../data/confirmed.json';
import deaths from './../data/deaths.json';
import recovered from './../data/recoverd.json';

export const defaultDates = {
    startDate: new Date("01/22/2020"),
    endDate: new Date("06/25/2021")
};

export function getCountryIndex(list, country) {
    const field = country.selectedState ? 'Province/State' : 'Country/Region';
    const value = country.selectedState || country.country;
    return list.findIndex(eachCountry => {
        return eachCountry[field] === value;
    })
}


export default function getAllCases(country, dates) {
    const finalStartDate = new Date(dates.startDate || defaultDates.startDate);
    const finalEndDate = new Date(dates.endDate || defaultDates.endDate);
    const confrimedIndex = getCountryIndex(confirmed, country);
    const recoveredIndex = getCountryIndex(recovered, country);
    const deathIndex = getCountryIndex(deaths, country);
    const getIndex = index => index > -1 ? index : 0;
    const confirmedRow = confirmed[getIndex(confrimedIndex)];
    const recoveredRow = recovered[getIndex(recoveredIndex)];
    const deathsRow = deaths[getIndex(deathIndex)];
    const confirmedCases = Object.keys(confirmedRow).slice(4)
    .filter(eachKey => new Date(eachKey) >= finalStartDate && new Date(eachKey) <= finalEndDate)
    .map(eachKey => {
        return { y: Number(confirmedRow[eachKey]), label: eachKey };
    });
    const recoveredCases = Object.keys(recoveredRow).slice(4)
    .filter(eachKey => new Date(eachKey) >= finalStartDate && new Date(eachKey) <= finalEndDate)
    .map(eachKey => {
        return { y: Number(recoveredRow[eachKey]), label: eachKey };
    });
    const deathCases = Object.keys(deathsRow).slice(4)
    .filter(eachKey => new Date(eachKey) >= finalStartDate && new Date(eachKey) <= finalEndDate)
    .map(eachKey => {
        return { y: Number(deathsRow[eachKey]), label: eachKey };
    });
    return { confirmedCases, recoveredCases, deathCases };
}


export function getTopCountries() {
    return confirmed.map((eachCountry, index) => {
        const rows = Object.keys(eachCountry).slice(4);
        const total = rows.reduce((acc, row) => {
            return acc + eachCountry[row]
        }, 0)
        return { value: total, index}
    })
    .sort((a, b) => b.value - a.value)
    .slice(0,5)
    .map(item => {
        const row = confirmed[item.index];
        return { country: row['Country/Region'], state: row['Province/State'], ...item}
    });
}