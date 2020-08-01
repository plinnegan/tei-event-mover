import React, { useState } from 'react'
import propTypes from 'prop-types'
import { OrganisationUnitTree } from '@dhis2/ui'
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  Button,
} from '@dhis2/ui'

const OuModal = ({ orgUnitPath, setOrgUnitPath, setOuName, userOus }) => {
  const [selectedOuPath, setSelectedOuPath] = useState(orgUnitPath)

  return (
    <Modal>
      <ModalTitle>Update visualization name</ModalTitle>
      <ModalContent>
        <OrganisationUnitTree
          singleSelection
          roots={userOus}
          selected={[selectedOuPath]}
          onChange={e => {
            setOuName(e.displayName)
            setSelectedOuPath(e.path)
          }}
          initiallyExpanded={[orgUnitPath]}
        />
      </ModalContent>
      <ModalActions>
        <Button
          primary
          type="button"
          onClick={() => setOrgUnitPath(selectedOuPath)}
        >
          Update
        </Button>
      </ModalActions>
    </Modal>
  )
}

OuModal.propTypes = {
  orgUnitPath: propTypes.string,
  setOrgUnitPath: propTypes.func,
  setOuName: propTypes.func,
  userOus: propTypes.array,
}

export default OuModal
