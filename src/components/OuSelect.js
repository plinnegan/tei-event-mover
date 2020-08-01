import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Button } from '@dhis2/ui'
import OuModal from './OuModal'

const OuSelect = ({
  label,
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
      <span>
        {`${label}   `}
        <Button onClick={() => setShowModel(true)}>{ouName}</Button>
      </span>
    </>
  )
}

OuSelect.propTypes = {
  label: propTypes.string,
  orgUnitName: propTypes.string,
  orgUnitPath: propTypes.string,
  setOrgUnitName: propTypes.func,
  setOrgUnitPath: propTypes.func,
  userOus: propTypes.array,
}

OuSelect.defaultProps = {
  label: 'Organisation Unit:',
}

export default OuSelect
