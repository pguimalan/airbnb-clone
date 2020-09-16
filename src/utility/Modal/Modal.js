  
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './Modal.css';
import openModalAction from '../../actions/openModalAction';

class Modal extends Component{

    state = {

    }

    closeModal = () => {
        this.props.openModal('close', 'Login');
    }

    render(){
        let modalInlineStyle = {display: 'none'}

        if(this.props.siteModal.openClose === 'open'){
            modalInlineStyle = {display: 'block'}
        }
        
        return(
            <div className="site-modal" style={modalInlineStyle}>
                <div className="modal-content">
                    <div className="col right">
                        <span onClick={this.closeModal} className="close">&times;</span>
                    </div>
                    <div className="">
                        {this.props.siteModal.content}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        siteModal: state.siteModal
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModalAction
    },dispatcher)
}

export default connect(mapStateToProps,mapDispatchToProps)(Modal)