import React, { useCallback, useState } from 'react';
import DatePicker from "react-datepicker";
import './index.css';


const TimeLineSelector = ({updateDates, dates}) => {
    
    return (
        <div className="timeline-container"> 
            <div className="timeline">
                <label className="timeline-label">Start Date</label>
                <DatePicker 
                    minDate={new Date("01/22/2020")}
                    maxDate={new Date("06/25/2021")}
                    showDisabledMonthNavigation
                    selected={dates.startDate}
                    onChange={(date) => updateDates('startDate', date)}
                />
            </div>
            <div className="timeline">
                <label className="timeline-label">End Date</label>
                <DatePicker 
                    minDate={new Date("01/22/2020")}
                    maxDate={new Date("06/25/2021")}
                    showDisabledMonthNavigation
                    selected={dates.endDate}
                    onChange={(date) => updateDates('endDate', date)}
                />
            </div>
        </div>
    )
}

export default TimeLineSelector;