import React, { Component } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedHotel: ''
        }
    }

    render() {
        return (
            <div className='card' style={{ textAlign: 'center', padding: '30px' }}>
                <select
                    className='btn btn-primary dropdown-toggle'
                    value={this.state.selectedHotel}
                    onChange={(event) => {
                        this.setState({
                            selectedHotel: event.target.value
                        })
                        if (event.target.value !== '')
                            this.props.bookHotel(event.target.value)
                    }}
                >
                    <option className='btn btn-light' value=''>Select Hotel</option>
                    <option className='btn btn-light' value='Hilton'>Hilton</option>
                    <option className='btn btn-light' value='Oyo'>Oyo</option>
                    <option className='btn btn-light' value='Trivago'>Trivago</option>
                    <option className='btn btn-light' value='Bahamas'>Bahamas</option>
                </select>
            </div>
        )
    }
}