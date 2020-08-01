import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Table } from 'antd'
import { useDataQuery } from '@dhis2/app-runtime'
import 'antd/dist/antd.css'

const teiDataQuery = {
  results: {
    resource: 'trackedEntityInstances',
    params: ({ program, orgUnit }) => ({
      paging: 'false',
      program: program,
      ouMode: 'DESCENDANTS',
      ou: orgUnit,
    }),
  },
}

export const makeTableColumns = displayAttrs => {
  const result = [
    {
      title: 'trackedEntityInstance',
      dataIndex: 'trackedEntityInstance',
      key: 'trackedEntityInstance',
    },
  ]
  for (const attr of displayAttrs) {
    const col = {
      title: attr.name,
      dataIndex: attr.id,
      key: attr.id,
    }
    result.push(col)
  }
  return result
}

const TeiTable = ({ program, orgUnit, teis, setTeis, displayAttrs }) => {
  const { loading, error, data, refetch } = useDataQuery(teiDataQuery, {
    variables: { program, orgUnit },
  })
  const [modifiedData, setModifiedData] = useState([])
  const tableColumns = makeTableColumns(displayAttrs)
  const attrIds = displayAttrs.map(attr => attr.id)
  console.log('Rendering TeiTable')

  useEffect(() => {
    console.log(`Refetch: OU: ${orgUnit} PRG: ${program}`)
    refetch({ program, orgUnit })
  }, [program, orgUnit])

  useEffect(() => {
    if (data && data.results && data.results.trackedEntityInstances) {
      const results = []
      for (const tei of data.results.trackedEntityInstances) {
        const processedTei = {
          key: tei.trackedEntityInstance,
          trackedEntityInstance: tei.trackedEntityInstance,
        }
        for (const attr of tei.attributes) {
          if (attrIds.includes(attr.attribute)) {
            processedTei[attr.attribute] = attr.value
          }
        }
        results.push(processedTei)
      }
      setModifiedData(results)
    }
  }, [data])

  const rowSelection = {
    selectedRowKeys: teis.map(tei => tei.trackedEntityInstance),
    onChange: (_, selectedRows) => {
      setTeis(selectedRows)
    },
  }

  return (
    <>
      {loading && <div>Loading</div>}
      {error && <div>error</div>}
      {modifiedData.length ? (
        <Table
          style={{ width: '90%' }}
          dataSource={modifiedData}
          columns={tableColumns}
          rowSelection={rowSelection}
        />
      ) : (
        <p>Please select a program and org unit to view TEIs</p>
      )}
    </>
  )
}

TeiTable.propTypes = {
  displayAttrs: propTypes.array,
  orgUnit: propTypes.string,
  program: propTypes.string,
  setTeis: propTypes.func,
  teis: propTypes.array,
}

export default TeiTable
