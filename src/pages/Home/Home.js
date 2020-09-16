import React, { Component } from 'react';
import './Home.css';
import SearchBox from './SearchBox';
import Spinner from '../../utility/Spinner/Spinner';
import axios from 'axios';
import Cities from '../../utility/City/Cities';
import Activities from '../../utility/Activity/Activities';
import Venues from '../../utility/Venue/Venues';

class Home extends Component {
    
    state = {
        cities: [],
        europe: {},
        asia: {},
        us: {},
        exotic: {},
        activities: [],
        recVenues: {}
    };

    async componentDidMount() {
        const citiesUrl = `${window.apiHost}/cities/recommended`;
        const europeCitiesUrl = `${window.apiHost}/cities/europe`;
        const asiaCitiesUrl = `${window.apiHost}/cities/asia`;
        const usCitiesUrl = `${window.apiHost}/cities/us`;
        const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;

        const citiesPromises = [];

        citiesPromises.push(axios.get(citiesUrl));
        citiesPromises.push(axios.get(europeCitiesUrl));
        citiesPromises.push(axios.get(asiaCitiesUrl));
        citiesPromises.push(axios.get(usCitiesUrl));
        citiesPromises.push(axios.get(exoticCitiesUrl));

        Promise.all(citiesPromises).then((data) => {
            const recommendedCities = data[0].data;
            const citiesEurope = data[1].data;
            const citiesAsia = data[2].data;
            const citiesUs = data[3].data;
            const citiesExotic = data[4].data;

            this.setState({
                cities: recommendedCities,
                europe: citiesEurope,
                asia: citiesAsia,
                us: citiesUs,
                exotic: citiesExotic
            })
        });

        const activitiesUrl = `${window.apiHost}/activities/today`;
        const activities = await axios.get(activitiesUrl);
        this.setState({
            activities: activities.data
        });

        const recVenuesUrl = `${window.apiHost}/venues/recommended`;
        const venues = await axios(recVenuesUrl);
        this.setState({
            recVenues: venues.data,
        })
    }

    render() {
        if(this.state.cities.length === 0 || (!this.state.recVenues.venues)){
            return (<Spinner />)
        }

        return (
            <div>
                <div className="container-fluid">
                <div className="row">
                    <div className="home col s12">
                        <div className="upper-fold">
                            <SearchBox />
                        </div>
                    </div>                                       
                </div>
                </div>

                <div className="container-fluid lower-fold">
                    <div className="row">
                        <div className="col s12">
                            <Cities cities={this.state.cities} header="Recommended Cities For You!"/>
                        </div> 

                        <div className="col s12">
                            <Activities activities={this.state.activities} header="Today in your area"/>
                        </div>

                        <div className="col s12">
                            <Cities cities={this.state.europe.cities} header={this.state.europe.header}/>
                        </div> 

                        <div className="col s12">
                            <Venues venues={this.state.recVenues.venues} header={this.state.recVenues.header} />
                        </div>

                        <div className="col s12">
                            <Cities cities={this.state.asia.cities} header={this.state.asia.header}/>
                        </div> 

                        <div className="col s12">
                            <Cities cities={this.state.us.cities} header={this.state.us.header}/>
                        </div> 

                        <div className="col s12">
                            <Cities cities={this.state.exotic.cities} header={this.state.exotic.header}/>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
