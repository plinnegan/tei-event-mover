import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TeiSelect from './components/TeiSelect'
import MoveTeiEvents from './components/MoveTeiEvents'
import classes from './App.module.css'

const MyApp = () => {
  const [selectedTeis, setTeis] = useState([])

  return (
    <div className={classes.container}>
      <Router>
        <Switch>
          <Route exact path="/">
            <TeiSelect selectTeis={setTeis} />
          </Route>
          <Route exact path="/move">
            <MoveTeiEvents selectedTeis={selectedTeis} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default MyApp
