import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'

const root = document.getElementById('root')
const body = document.body

const throttle = (fn, wait) => {
   let pre = Date.now()
   return function() {
      let context = this
      let args = arguments
      let now = Date.now()
      if(now - pre >= wait) {
         pre = Date.now()
         fn.apply(context, args)
      }
   }
}

class App extends Component {
   state = {
      box_x: 100,
      box_y: 100,
      flag: true,
   }
   change = (event) => {
      const {clientX, clientY} = event
      const {box_x, box_y} = this.state
      const offset = 100
      const {offsetWidth, offsetHeight} = body
      const borderWL = box_x - offset
      const borderWR = box_x + offset + 300
      const borderHL = box_y - offset
      const borderHR = box_y + offset + 50
      if(clientX > borderWL && clientX < borderWR && clientY > borderHL && clientY < borderHR) {
         this.setState({
            box_x: Math.min(Math.random() * offsetWidth >> 0, offsetWidth - 300),
            box_y: Math.min(Math.random() * offsetHeight >> 0, offsetHeight - 50),
            flag: false
         })
      }
      
   }
   render() {
      const {box_x, box_y, flag} = this.state
      // 防止注册多个事件
      flag && body.addEventListener('mousemove', throttle(this.change, 100))
      return <div id='box' style={{transform: `translate(${box_x}px, ${box_y}px)`}}>30 Days Of React</div>
   }
}

ReactDOM.render(<App />, root)