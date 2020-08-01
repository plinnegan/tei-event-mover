import React from 'react'
import propTypes from 'prop-types'
import Layout from './Layout'
import ProgramSelect from './ProgramSelect'
import OuSelect from './OuSelect'

const TeiSelectSearch = ({
  userOuData,
  program,
  programList,
  setProgram,
  orgUnitPath,
  setOrgUnitPath,
  orgUnitName,
  setOrgUnitName,
}) => {
  const userOuUids = userOuData.map(userOu => userOu.id)
  const selectedOu = orgUnitPath || '/' + userOuData[0].id
  console.log(`Selected OU ${selectedOu}`)

  return (
    <Layout>
      <br />
      <span style={{ display: 'flex' }}>
        <ProgramSelect
          program={program}
          programList={programList}
          setProgram={setProgram}
        />
        <div style={{ margin: '10px' }}></div>
        <div style={{ paddingTop: '30px' }}>
          <OuSelect
            orgUnitName={orgUnitName}
            setOrgUnitName={setOrgUnitName}
            orgUnitPath={selectedOu}
            setOrgUnitPath={setOrgUnitPath}
            userOus={userOuUids}
          />
        </div>
      </span>
    </Layout>
  )
}

TeiSelectSearch.propTypes = {
  orgUnitName: propTypes.string,
  orgUnitPath: propTypes.string,
  program: propTypes.string,
  programList: propTypes.array,
  setOrgUnitName: propTypes.func,
  setOrgUnitPath: propTypes.func,
  setProgram: propTypes.func,
  userOuData: propTypes.array,
}

export default TeiSelectSearch
