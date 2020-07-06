import React from 'react'
import propTypes from 'prop-types'

const MoveTeiEvents = ({ selectedTeis }) => {
  console.log(selectedTeis)
  return (
    <>
      <h3>Todo</h3>
      <ul>
        {selectedTeis.map(tei => (
          <li key={tei.trackedEntityInstance}>{tei.trackedEntityInstance}</li>
        ))}
      </ul>
    </>
  )
}

MoveTeiEvents.propTypes = {
  selectedTeis: propTypes.arrayOf(
    propTypes.shape({ trackedEntityInstance: propTypes.string })
  ),
}

export default MoveTeiEvents
