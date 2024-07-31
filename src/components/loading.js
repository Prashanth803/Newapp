import React, { Component } from 'react'
import Spin from './Spin.gif'
export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={Spin} alt="" />
      </div>
    )
  }
}
