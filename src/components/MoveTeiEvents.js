import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import { useDataMutation } from '@dhis2/app-runtime'
import { Table } from 'antd'
import { makeTableColumns } from './TeiTable'
import OuSelect from './OuSelect'
import { Button } from '@dhis2/ui'
import 'antd/dist/antd.css'

const teiDataValueQuery = {
  results: {
    resource: 'trackedEntityInstances',
    params: ({ teis }) => ({
      paging: 'false',
      trackedEntityInstance: teis
        .map(tei => tei.trackedEntityInstance)
        .join(';'),
      fields: '*',
    }),
  },
}

const updateOrgUnit = (data, ou) => {
  for (const tei of data.trackedEntityInstances) {
    tei.orgUnit = ou
    for (const enrol of tei.enrollments) {
      enrol.orgUnit = ou
      delete enrol.orgUnitName
      for (const ev of enrol.events) {
        ev.orgUnit = ou
        delete ev.orgUnitName
      }
    }
  }
  return data
}

const ouUpdateMutation = {
  resource: 'trackedEntityInstances',
  type: 'create',
  data: ({ updatedData }) => updatedData,
}

const ownerUpdateMutation = {
  type: 'update',
  resource: 'tracker/ownership/transfer',
  params: ({ teiUid, program, newOu }) => ({
    trackedEntityInstance: teiUid,
    program: program,
    ou: newOu,
  }),
  data: {},
}

const MoveTeiEvents = ({ teis, teiSelectState, userOus }) => {
  const [orgUnitPath, setOrgUnitPath] = useState(
    teiSelectState.orgUnitPath || '/' + userOus[0].id || ''
  )
  const [orgUnitName, setOrgUnitName] = useState(
    teiSelectState.orgUnitName || ''
  )
  const { loading, error, data, refetch } = useDataQuery(teiDataValueQuery, {
    variables: { teis },
  })
  const [
    ouMutate,
    { loading: ouUpdateLoading, error: ouUpdateError, data: ouUpdateData },
  ] = useDataMutation(ouUpdateMutation, {
    variables: { updatedData: { trackedEntityInstances: [] } },
  })
  const [ownerMutate, { error: ownerUpdateError }] = useDataMutation(
    ownerUpdateMutation,
    {
      variables: { teiUid: '', program: '', newOu: '' },
    }
  )

  const { prgAttrMap, program } = teiSelectState
  const displayAttrs = prgAttrMap[program]
  const userOuUids = userOus.map(ou => ou.id)

  useEffect(() => {
    if (teis.length) {
      refetch({ teis })
    }
  }, [teis])

  const columns = makeTableColumns(displayAttrs)

  const updateTEIs = async () => {
    console.log('Updating TEIs')
    console.log(`Moving to new org unit ${orgUnitName}`)
    console.log('ou path', orgUnitPath)
    const ouPath = orgUnitPath.split('/')
    const orgUnit = ouPath[ouPath.length - 1]
    console.log('Org unit', orgUnit)
    const updatedData = updateOrgUnit(data.results, orgUnit)
    console.log('TEI DATA', updatedData)
    await ouMutate({ updatedData })
    for (const tei of data.results.trackedEntityInstances) {
      await ownerMutate({
        teiUid: tei.trackedEntityInstance,
        program: program,
        newOu: orgUnit,
      })
    }
  }

  return (
    <>
      <br />
      <h3>Moving TEIs from: {orgUnitName}</h3>
      {error && <h3>Error loading TEI data</h3>}
      {loading && <h3>Loading TEI data...</h3>}
      {data && (
        <>
          <span style={{ display: 'flex' }}>
            <OuSelect
              label="New organisation unit:"
              orgUnitName={orgUnitName}
              setOrgUnitName={setOrgUnitName}
              orgUnitPath={orgUnitPath}
              setOrgUnitPath={setOrgUnitPath}
              userOus={userOuUids}
            />
            <div style={{ margin: '10px' }}></div>
            <Button primary onClick={updateTEIs}>
              Update TEIs
            </Button>
          </span>
          <Table style={{ width: '90%' }} columns={columns} dataSource={teis} />
        </>
      )}
      {ouUpdateLoading && <h3>Updating server...</h3>}
      {(ouUpdateError || ownerUpdateError) && (
        <h3>Error updating organisation unit on the server</h3>
      )}
      {ouUpdateData && <h3>{ouUpdateData.message}</h3>}
    </>
  )
}

MoveTeiEvents.propTypes = {
  teiSelectState: propTypes.shape({
    orgUnitName: propTypes.string,
    orgUnitPath: propTypes.string,
    prgAttrMap: propTypes.object,
    program: propTypes.string,
  }),
  teis: propTypes.array,
  userOus: propTypes.array,
}

export default MoveTeiEvents
