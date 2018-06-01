import React, { Component } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/font-awesome/css/font-awesome.css'
import Modal from 'react-modal'
import axios from 'axios'
import '../../index.css'

export default class BookHotel extends Component {
    constructor(props) {
        super(props)
        let starColor = []
        for (let i = 0; i < 5; i++)
            starColor.push('black')
        this.state = {
            isModalOpen: false,
            destination: [],
            distance: '',
            starColor,
            stayDetails: [],
            totalDistance: '',
            alerts: ['', '', ''],
            fetching: false
        }
        this.showDetails = this.showDetails.bind(this)
    }

    showDetails() {
        let alerts = this.state.alerts,
            rating = this.state.starColor.reduce((accumulator, value) => accumulator + (value === 'orange' ? 1 : 0), 0)
        if (this.state.destination.length === 0)
            alerts[0] = 'Select atleast one destination'
        if (this.state.distance === '')
            alerts[1] = 'This field is required'
        if (rating === 0)
            alerts[2] = 'Please give atleast one star rating'
        this.setState({
            alerts
        })
        if (alerts.findIndex(value => value !== '') === -1) {
            this.setState({
                isModalOpen: true,
                fetching: true
            })
            axios('http://192.168.8.225:8888/holidays', {
                params: {
                    max_travel: this.state.distance,
                    rating: this.state.starColor.reduce((accumulator, value) => accumulator + (value === 'orange' ? 1 : 0), 0),
                    dest_types: this.state.destination.reduce((acc, value, index) =>
                        index !== this.state.destination.length - 1 ? acc + value + ',' : acc + value,
                        '')
                }
            })
                .then(response => {
                    this.setState({
                        fetching: false,
                        stayDetails: response.data[0].stays,
                        totalDistance: response.data[0].total_distance
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        return (
            <div className="card" >
                <div className="card-body">
                    <h4 className="card-title">{this.props.hotelName}</h4>
                    <div className="card-text">
                        <select
                            multiple
                            onChange={(event) => {
                                let destination = [...event.target.selectedOptions].map(option => option.value),
                                    alerts = this.state.alerts
                                if (destination.length !== 0)
                                    alerts[0] = ''
                                this.setState((prevState) => ({
                                    destination
                                }))
                            }}
                            style={{
                                width: '100%',
                                fontSize: '20px'
                            }}
                        >
                            <option value=''>Select Destination(s)*</option>
                            <option value='Hillside'>Hillside</option>
                            <option value='Beach'>Beach</option>
                            <option value='Beachwaters'>Beachwaters</option>
                        </select>
                        {this.state.alerts[0] === '' ? '' : <div className='error-text' >{this.state.alerts[0]}</div>}
                        <br /><br />
                        <input
                            className="form-control"
                            placeholder='Enter distance travelled'
                            onChange={(event) => {
                                let alerts = this.state.alerts
                                if (event.target.value !== '')
                                    alerts[1] = ''
                                this.setState({
                                    distance: event.target.value,
                                    alerts
                                })
                            }} />
                        {this.state.alerts[1] === '' ? '' : <div className='error-text' >{this.state.alerts[1]}</div>}
                        <br />
                        <div>
                            <b className='rating-text'>Rating: </b> {[1, 2, 3, 4, 5].map((value, index) => {
                                return (
                                    <span className='fa fa-star'
                                        style={{
                                            color: this.state.starColor[value - 1],
                                            fontSize: '25px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            let starColor = [],
                                                alerts = this.state.alerts
                                            for (let i = 0; i < value; i++)
                                                starColor.push('orange')
                                            if (starColor.length === 1 && this.state.starColor.length === 1)
                                                starColor[0] = this.state.starColor[0] === 'orange' ? 'black' : 'orange'
                                            if (starColor.length > 0 && starColor[0] === 'orange')
                                                alerts[2] = ''
                                            this.setState({
                                                starColor,
                                                alerts
                                            })
                                        }}></span>
                                )
                            })}
                        </div>
                        {this.state.alerts[2] === '' ? '' : <div className='error-text' >{this.state.alerts[2]}</div>}
                        <br />
                        <div className='flow-display'>
                            <button
                                onClick={() => {
                                    this.props.goHome()
                                }}
                                className="btn btn-secondary left" >Home</button>
                            <button
                                onClick={this.showDetails}
                                className="btn btn-primary right" style={{ float: 'right' }} >Submit</button>
                        </div>
                        <br />
                        <h6>* Use <i className='badge badge-primary'>Ctrl</i> to select multiple destinations</h6>
                    </div>
                    <Modal
                        isOpen={this.state.isModalOpen}
                    >
                        {this.state.fetching ?
                            <h3 className='alert alert-primary center'>Loading</h3>
                            :
                            <div>
                                <div style={{ height: '10%', textAlign: 'center' }}>
                                    <h3 className='alert alert-primary'>Stay Details</h3></div>
                                <div style={{ height: '80%' }} className='alert alert-info'>
                                    <h4 className='alert alert-success'>Total Distance: {this.state.totalDistance}</h4>
                                    <div className='alert alert-success'>
                                        <h4 >Stays Available</h4>
                                        {this.state.stayDetails.map(value => {
                                            return (
                                                <div>
                                                    <h5>Stay ID: {value.stay_id}</h5>
                                                    <h5>Name: {value.stay_name}</h5>
                                                    <h5>Location: {value.loc}</h5>
                                                    <hr />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div style={{ height: '10%', textAlign: 'center' }} >
                                    <button className='btn btn-primary' onClick={() => {
                                        this.setState({
                                            isModalOpen: false
                                        })
                                    }} >Close</button>
                                </div>
                            </div>}
                    </Modal>
                </div>
            </div>
        )
    }
}