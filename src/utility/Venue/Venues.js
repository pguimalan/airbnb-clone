import React from 'react';
import Venue from './Venue';
import './Venue.css';

function Venues(props) {
    const venues = props.venues.map((venue, i) => {
        return (
            <div className="col m6 l3" key={i}>
                <Venue venue={venue}  />
            </div>
        )
    });

    return (
        <div className="venues">
            <h1 className="main-header-text">{props.header}</h1>
            {venues}
        </div>
    );
}

export default Venues
