import React, { Component } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

const TitleBar = (props) => (
    < div style={{ textAlign: 'center' }} className='alert-success' >
        <h1>{props.title}</h1>
    </div >
)

export default TitleBar