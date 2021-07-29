

import { Component } from 'react'

import './Timer.css'




export default class Timer extends Component {
  state = {
    status: null,
    time: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    }
  }

  start = () => {
    this.setState({
      status: 'started'
    })

    window.timer = setInterval(() => {
      const time = {...this.state.time}

      time.miliseconds = time.miliseconds + 1
      if (time.miliseconds === 99) {
        time.miliseconds = 0
        time.seconds += 1
      }
      if (time.seconds === 59) {
        time.seconds = 0
        time.minutes += 1
      }
      if (time.minutes === 59) {
        time.minutes = 0
        time.hours += 1
      }
      
      this.setState({
        time
      })
      
    }, 10)
  }
  
  stop = () => {
    clearInterval(window.timer)
    this.setState({status: null, time: nullingTime()})
  }

  reset = () => {
    this.setState({time: nullingTime()})
  }

  wait = () => {
    clearInterval(window.timer)
    this.setState({status: null})
  }

  renderTimeflow = () => {
    return Object
      .keys(this.state.time)
      .map((timeUnit) => {
          const time = this.state.time
          const unit = time[timeUnit] >= 10 ? time[timeUnit] : `0${time[timeUnit]}`
          const key = `${timeUnit}-${Math.random()}`
          return <div key={key} className='Timer__time-unit'><span>{unit}</span></div>
        })      
  }

  renderButtons = () => {
    return this.state.status 
          ? <>
          <div className='Timer__btn'>
          <button onClick={ this.stop }>Stop</button>
        </div>
        <div className='Timer__btn'>
          <button onClick={ this.reset }>Reset</button>
        </div>
        <div className='Timer__btn'>
          <button onClick={ this.wait }>Wait</button>
        </div>
            </>
          : <div className='Timer__btn'>
          <button onClick={ this.start }>Start</button>
        </div>
  }
   
  render() {
    return (
      <div className='Timer'>
        <div className='Timer__clock'>
           { this.renderTimeflow() }
        </div>
        <div className='Timer__buttons'>
           { this.renderButtons() }
        </div>
      </div>
    )
  }
}

function nullingTime() {
  return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      miliseconds: 0      
  }  
}