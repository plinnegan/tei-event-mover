import React from 'react'
import i18n from '@dhis2/d2-i18n'

const Title = () => (
  <div>
    <h1>{i18n.t('TEI and Event Mover')}</h1>
    <p>
      {i18n.t(
        'Allows the selection and movement of multiple TEIs and events from one organisation unit to another'
      )}
    </p>
  </div>
)

export default Title
