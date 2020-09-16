import React, { Component } from 'react'
import './Venue.css';
import { Link } from 'react-router-dom';

class Venue extends Component {
    render() {
       const { id, imageUrl, location, pricePerNight, rating, title  } = this.props.venue;
       
        return (
            <div className="venue col s12">
                <Link to={`/venue/${id}`}>
                    <div className="image">
                        <img src={imageUrl} alt=""/>
                    </div>   
                    <div className="location-stars">
                        <span className="location">{location}</span>
                        <span className="rating right"><i className="material-icons">star</i>{rating}</span>
                    </div>    
                    <div className="title">
                        {title}
                    </div>      
                    <div className="price">
                        ${pricePerNight}/night
                    </div>                         
                </Link> 
            </div> 
        )
    }    
}

export default Venue
