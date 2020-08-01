import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import TeiSelect from './components/TeiSelect'
import MoveTeiEvents from './components/MoveTeiEvents'
import classes from './App.module.css'
import { useDataQuery } from '@dhis2/app-runtime'
import { userOuWithProgramsQuery } from './components/queries'

const MyApp = () => {
  const [teis, setTeis] = useState([])
  const [teiSelectState, setTeiSelectState] = useState({})
  const { loading, error, data } = useDataQuery(userOuWithProgramsQuery)

  return (
    <div className={classes.container}>
      <Router>
        <Switch>
          <Route exact path="/">
            {error && (
              <h1>Error fetching user organisation units and programs</h1>
            )}
            {loading && <p>loading user organisation units and...</p>}
            {data && (
              <TeiSelect
                data={data}
                teis={teis}
                setTeis={setTeis}
                initialState={teiSelectState}
                setInitialState={setTeiSelectState}
              />
            )}
          </Route>
          <Route exact path="/move">
            <Layout>
              {teis.length ? (
                <MoveTeiEvents
                  teis={teis}
                  teiSelectState={teiSelectState}
                  userOus={data.userOus.organisationUnits}
                />
              ) : (
                <>
                  <br />
                  <br />
                  <h2>Please select TEIs in the Select TEIs tab</h2>
                </>
              )}
            </Layout>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default MyApp
