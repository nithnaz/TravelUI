import React, { Component } from 'react';
import HomePage from './HomePage'
import BookHotel from './BookHotel'
import TitleBar from './TitleBar'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadComponent: 'homePage',
      hotelName: ''
    }
  }
  render() {
    return (
      <div style={{ padding: '80px' }} className='container'>
        <TitleBar title='Hotel Booking' />
        {this.state.loadComponent === 'homePage' ?
          <HomePage
            bookHotel={(hotelName) => {
              this.setState({
                loadComponent: 'bookHotel',
                hotelName
              })
            }} />
          :
          <BookHotel
            hotelName={this.state.hotelName}
            goHome={() => {
              this.setState({
                loadComponent: 'homePage'
              })
            }} />}
      </div>
    )
  }
}

export default App;
