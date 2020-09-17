import React, { Component } from 'react'
import './SingleFullVenue.css';
import axios from 'axios';
import Point from './Point';
import { connect } from 'react-redux';
import openModalAction from '../../actions/openModalAction';
import { bindActionCreators } from 'redux';
import Login from '../../pages/Login/Login';
import moment from 'moment';
import swa from 'sweetalert';
import loadScript from '../../utility/utilityFunctions/loadScript';

class SingleFullVenue extends Component {
    
    state = {
        singleVenue: {},
        points: []
    };

    async componentDidMount() {
        const vid = this.props.match.params.vid;
        const url = `${window.apiHost}/venue/${vid}`;
        const pointsUrl = `${window.apiHost}/points/get`;
        
        const allPromises = [];

        allPromises.push(axios.get(url));
        allPromises.push(axios.get(pointsUrl));

        Promise.all(allPromises).then((data) => {            
            const singleVenueData = data[0].data;
            const pointsData = data[1].data;    
                    
            const points = singleVenueData.points.split(',').map((point, i) => {    
                const descObj = pointsData.find((p) => 
                    p.pointTitle === point        
                );  
                
                if(typeof descObj !== 'undefined'){                    
                    return(
                        <Point key={i} pointDesc={descObj.text} point={point}/>
                    )
                } else return (null);
                
            });
            
            this.setState({
                singleVenue: singleVenueData,
                points
            })
        });
    }

    changeNumberOfGuests =(e) => this.setState({numberOfGuests: e.target.value});
    changeCheckIn =(e) => this.setState({checkIn: e.target.value});
    changeCheckOut =(e) => this.setState({checkOut: e.target.value});

    reserveNow = async(e) => {        
        const startDayMomemnt = moment(this.state.checkIn);
        const endDayMomemnt = moment(this.state.checkOut);
        const diffDays = endDayMomemnt.diff(startDayMomemnt,"days");
        
        if(diffDays < 1){
            swa({
                title: "Check-out date must be after check-in date.",
                icon: "error",
                dangerMode: true
            });
        } else if(isNaN(diffDays)){
            swa({
                title: "Please make sure your dates are valid.",
                icon: "error",
                dangerMode: true
            });
        } else {
            // diff days is a valid number
            const sv = this.state.singleVenue;        
            const pricePerNight = sv.pricePerNight;
            const totalPrice = pricePerNight * diffDays;
            const scriptUrl = 'https://js.stripe.com/v3';
            const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT';

            await loadScript(scriptUrl);
            console.log('Lets run some stripe!');
            const stripe = window.Stripe(stripePublicKey);
            const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
            const data = {
                venueData: sv, 
                totalPrice, 
                diffDays, 
                pricePerNight, 
                checkIn: this.state.checkIn, 
                checkOut: this.state.checkOut, 
                token: this.props.auth.token, 
                currency: 'USD' 
            };
            const sessionVar = await axios.post(stripeSessionUrl, data);
            stripe.redirectToCheckout({
                sessionId: sessionVar.data.id
            }).then((result) => {
                console.log(result);
                //
            })
        }
    }

    render() {             
        const sv = this.state.singleVenue;             
        return (
            <div className="row single-venue">
                <div className="col s12 center">
                   <img src={sv.imageUrl} alt="" />
                </div>

                <div className="col s8 location-details offset-s2">
                    <div className="col s8 left-details">
                        <div className="location">{sv.location}</div>
                        <div className="title">{sv.title}</div>
                        <div className="guests">{sv.guests}</div>

                        <div className="divider"></div>

                        {this.state.points}

                        <div className="details">{sv.amenities}</div>
                        <div className="amenities">{sv.details}</div>
                    </div>  
                    <div className="col s4 right-details">
                        <div className="price-per-day">${sv.pricePerNight} <span>per day</span></div>
                        <div className="rating"><i className="material-icons">star</i>{sv.rating}</div>
                        <div className="col s6">
                            Check-In
                            <input type="date" onChange={this.changeCheckIn} />
                        </div>
                        <div className="col s6">
                            Check-Out
                            <input type="date" onChange={this.changeCheckOut} />
                        </div>

                        <div className="col s12">
                            <select className="browser-default" onChange={this.changeNumberOfGuests} >
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="5">5 Guests</option>
                                <option value="6">6 Guests</option>
                                <option value="7">7 Guests</option>
                                <option value="8">8 Guests</option>
                                <option value="9">9 Guests</option>
                            </select>
                        </div>
                        <div className="col s12 center">
                            {
                                this.props.auth.token ?
                                <button onClick={this.reserveNow} className="btn red accent-2">Reserve</button>
                                :
                                <div>You must <span className="text-link" onClick={()=> {this.props.openModal('open', <Login />)}}>Login</span> to reserve.</div>    
                            }                            
                        </div>
                    </div>                  
                </div>
            </div> 
        )
    }    
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModalAction
        
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue);
