import { interval, fromEvent } from 'rxjs'
import { map, filter, buffer, debounceTime } from 'rxjs/operators'

import { useState, useEffect } from 'react'

import './Timer.css'


const tick$ = interval(1000)




export default function Timer() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [status, setStatus] = useState(null)


  useEffect(() => {
    const subForTick$ = tick$.subscribe(
      x => {
        if (!status) return

        const timeState = {...time}
        
        timeState.seconds++
        if (timeState.seconds > 59) {
          timeState.seconds = 0
          timeState.minutes += 1
        }
        if (timeState.minutes > 59) {
          timeState.minutes = 0
          timeState.hours += 1
        }
        
        setTime(prev => ({...prev, ...timeState}))

        // < Имплементация duobleClick >
        const clicks$ = fromEvent(document.getElementById('waitBtn'), 'click')
        const buff$ = clicks$.pipe( debounceTime(300) )            
        const dbClick$ = clicks$.pipe(
          buffer(buff$),
          map(list => list.length),
          filter(x => x === 2)
        )
            
        dbClick$.subscribe(() => wait())
        // < Имплементация duobleClick />
      }
    )    
    
    return () => {
      subForTick$.unsubscribe()
    }
  }, [status, time])

  
  const start = () => {
    setStatus('started')
  }

  const stop = () => {
    setTime(prev => ({...prev, ...nullingTime()}))
    setStatus(null)
  }

  const reset = () => {
    setTime(prev => ({...prev, ...nullingTime()}))
  }

  const wait = () => {
    setStatus(null)
  }


  const renderTimeflow = () => {
    return Object
      .keys(time)
      .map((timeUnit) => {
          const t = time
          const unit = t[timeUnit] >= 10 ? t[timeUnit] : `0${t[timeUnit]}`

          return <div key={timeUnit} className='Timer__time-unit'><span>{unit}</span></div>
        })
  }

  const renderButtons = () => {
    return status
          ? <>
              <div className='Timer__btn'>
                <button onClick={ stop }>Stop</button>
              </div>
              <div className='Timer__btn'>
                <button onClick={ reset }>Reset</button>
              </div>
              <div className='Timer__btn'>
                <button id='waitBtn'>Wait</button>
              </div>
            </>
          : <div className='Timer__btn'>
              <button onClick={ start }>Start</button>
            </div>
  }


  return (
    <div className='Timer'>
      <div className='Timer__clock'>
        { renderTimeflow() }
      </div>
      <div className='Timer__buttons'>
        { renderButtons() }
      </div>
    </div>
  )
}

function nullingTime() {
  return {
      hours: 0,
      minutes: 0,
      seconds: 0
  }  
}