import React from 'react'
import propTypes from 'prop-types'
import { Button } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import { useHistory } from 'react-router-dom'

const TeiSelect = ({ selectTeis }) => {
  const history = useHistory()
  const teis = [{ trackedEntityInstance: 'sasdfhasdff' }]

  const handleTeiSelectSubmit = () => {
    selectTeis(teis)
    history.push('/move')
  }

  return (
    <>
      <h3>Todo</h3>
      <Button primary onClick={handleTeiSelectSubmit}>
        {i18n.t('Select TEIs')}
      </Button>
    </>
  )
}

TeiSelect.propTypes = {
  selectTeis: propTypes.func.isRequired,
}

export default TeiSelect
