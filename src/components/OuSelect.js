import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Button } from '@dhis2/ui'
import OuModal from './OuModal'

const OuSelectButton = ({
  orgUnitPath,
  orgUnitName,
  setOrgUnitName,
  setOrgUnitPath,
  userOus,
}) => {
  const [showModal, setShowModel] = useState(false)
  const [ouName, setOuName] = useState(
    orgUnitName || 'Select organisation unit'
  )

  useEffect(() => {
    console.log('OU name changed!!')
    setOrgUnitName(ouName)
  }, [ouName])

  const handleSetOrgUnitPath = orgUnitPath => {
    setOrgUnitPath(orgUnitPath)
    setShowModel(false)
  }

  return (
    <>
      {showModal && (
        <OuModal
          orgUnitPath={orgUnitPath}
          setOrgUnitPath={handleSetOrgUnitPath}
          setOuName={setOuName}
          userOus={userOus}
        />
      )}
      <span style={{ paddingTop: '30px' }}>
        Organisation unit:&nbsp;&nbsp;&nbsp;
        <Button onClick={() => setShowModel(true)}>{ouName}</Button>
      </span>
    </>
  )
}

OuSelectButton.propTypes = {
  orgUnitName: propTypes.string,
  orgUnitPath: propTypes.string,
  setOrgUnitName: propTypes.func,
  setOrgUnitPath: propTypes.func,
  userOus: propTypes.array,
}

export default OuSelectButton
