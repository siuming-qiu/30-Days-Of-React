import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Link,
   Navigate,
   useLocation
 } from "react-router-dom";
const root = document.getElementById('root')
const Home = () => {
   return(
      <h2>Home</h2>
   )
}
const About = () => {
   return(
      <h2>About</h2>
   )
}
const Contact = () => {
   return(
      <h2>Contact</h2>
   )
}
const User = ({handlelog, isLogin}) => {
   return(
      <div>
         {isLogin ? (
            <p>you can access the challenges</p>
         ) : (
            <p>Please login in to access the challenges</p>
         )}
         <button onClick={handlelog}>{isLogin ? 'logout' : 'login'} </button>
      </div>
   )
}

const Challenges = () => {
   const challengeList = [
      {
         name: '30 Days Of React',
         description:
           '30 Days of React challenge is a step by step guide to learn React in 30 days.',
         status: 'ongoing',
         days: 30,
         level: 'Beginners to Advanced',
         duration: '1 Oct 2020- 30 Oct 2020',
         urlid: 'react'
      },{
         name: '30 Days Of Python',
         description:
           '30 Days of Python challenge is a step by step guide to learn React in 30 days.',
         status: 'ongoing',
         days: 30,
         level: 'Beginners to Advanced',
         duration: '1 Oct 2021- 30 Oct 2021',
         urlid: 'python'
      },{
         name: '30 HTML and CSS',
         description:
           '30 Days of HTML and CSS challenge is a step by step guide to learn HTML and CSS in 30 days.',
     
         status: 'coming',
         days: 30,
         level: 'Beginners to Advanced',
         duration: '',
         urlid: 'html-and-css'
       }
   ]
   const location = useLocation()
   const isMatch = location.pathname.match(/challenges\/([^"]+)/)
   const urlid = isMatch && isMatch.length > 1 && isMatch[1]
   const challengeObj = challengeList.find(obj => obj.urlid === urlid)
   console.log(urlid);
   return(
      <>
         <h2>Challenges</h2>
         <ul>
            {challengeList.map(obj => {
               return(
                  <li key={obj.name}>
                     <Link to={`/challenges/${obj.urlid}`}>{obj.name}</Link>
                  </li>
               )
            })}
         </ul>
         <Routes>
            <Route exact path='/' element={<Tochallenge />}></Route>
            <Route path={`/${urlid}`} element={<Challenge challengeObj={challengeObj}/>}></Route>
         </Routes>
      </>
   )
}
const Tochallenge = () => {
   return(
      <h2>choose challenge</h2>
   )
}
const Challenge = ({challengeObj}) => {
   const { name, description, days, level, duration } = challengeObj
   return(
      <div>
         <h2>{name}</h2>
         <p>{level}</p>
         <p>{duration}</p>
         <p>{description}</p>
         <p>Number of days: {days}</p>
      </div>
   )
}
const App = () => {
   const [isLogin, setLogin] = useState(false)
   const handlelog = () => {
      setLogin(!isLogin)
   }
   return(
      <Router>
         <>
            <ul>
               <li>
                  <Link to='/'>Home</Link>
               </li>
               <li>
                  <Link to='/about'>About</Link>
               </li>
               <li>
                  <Link to='/contact'>Contact</Link>
               </li>
               <li>
                  <Link to='/user'>User</Link>
               </li>
               <li>
                  <Link to='/challenges'>Challenges</Link>
               </li>
            </ul>
            <hr />
            <Routes>
               <Route exact path='/' element={<Home />}></Route>
               <Route path='/about' element={<About />}></Route>
               <Route path='/contact' element={<Contact />}></Route>
               <Route path='/user' element={<User  handlelog={handlelog} isLogin={isLogin}/>}></Route>
               <Route path='/challenges/*' element={isLogin ? <Challenges /> : <Navigate to='/user'/>}></Route>
            </Routes>
         </>
      </Router>
   )
}


ReactDOM.render(<App />, root)