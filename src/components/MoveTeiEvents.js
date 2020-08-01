import React from 'react'
import propTypes from 'prop-types'
import Layout from './Layout'

const MoveTeiEvents = ({ selectedTeis }) => {
  return (
    <Layout>
      <h3>Todo</h3>
      <ul>
        {selectedTeis ? (
          selectedTeis.map(tei => (
            <li key={tei.trackedEntityInstance}>{tei.trackedEntityInstance}</li>
          ))
        ) : (
          <h3>No TEIs selected yet</h3>
        )}
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
