import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {

    state = {
        where: "",
        checkIn: "",
        checkOut: "",
        guest: 0
    }

    changeWhere =(e)=> {
        this.setState({
            where: e.target.value
        });
    }

    changeCheckIn =(e)=> {
        this.setState({
            checkIn: e.target.value
        });
    }

    changeCheckOut =(e)=> {
        this.setState({
            checkOut: e.target.value
        });
    }

    changeGuest =(e)=> {
        this.setState({
            guest: e.target.value
        });
    }

    render() {
        return (
            <div className="home-search-box col m4">
               <h1>Book unique places to stay and things to do.</h1>

                <form className="search-box-form">
                    <div className="col m12">
                        <div className="form-label">Where</div>
                        <div className="input-field" id="where">
                            <input type="text" className="browser-default" placeholder="Anywhere" onChange={this.changeWhere} value={this.state.where}/>
                        </div>
                    </div>

                    <div className="col m6">
                        <div className="form-label">check-in</div>
                        <div className="input-field" id="checkIn">
                            <input type="date" className="browser-default" onChange={this.changeCheckIn} value={this.state.checkIn}/>
                        </div>
                    </div>

                    <div className="col m6">
                        <div className="form-label">check-out</div>
                        <div className="input-field" id="checkOut">
                            <input type="date" className="browser-default" onChange={this.changeCheckOut} value={this.state.checkOut}/>
                        </div>
                    </div>

                    <div className="col m12">
                        <div className="form-label">Guests</div>
                        <div className="input-field" id="guest">
                            <input type="number" className="browser-default" placeholder="Guest" onChange={this.changeGuest} value={this.state.guest}/>
                        </div>
                    </div>

                    <div className="col m12 submit-btn">
                        <div className="input-field" id="submit-btn">
                            <input className="btn waves-effect waves-light red accent-2" type="submit"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBox
