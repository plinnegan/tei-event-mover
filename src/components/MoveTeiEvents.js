import React from 'react'
import propTypes from 'prop-types'
import Layout from './Layout'

const MoveTeiEvents = ({ selectedTeis }) => {
  return (
    <Layout>
      <h3>Todo</h3>
      <ul>
        {selectedTeis.map(tei => (
          <li key={tei.trackedEntityInstance}>{tei.trackedEntityInstance}</li>
        ))}
      </ul>
    </Layout>
  )
}

MoveTeiEvents.propTypes = {
  selectedTeis: propTypes.arrayOf(
    propTypes.shape({ trackedEntityInstance: propTypes.string })
  ),
}

export default MoveTeiEvents
