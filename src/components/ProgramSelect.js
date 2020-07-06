import React from 'react'
import SelectData from './SelectData'

const ProgramSelect = () => {
  const query = {
    results: {
      resource: 'programs',
      params: {
        paging: false,
        fields: ['id', 'name'],
      },
    },
  }

  return (
    <>
      <label htmlFor="program-select">Program</label>
      <SelectData id="program-select" query={query} />
    </>
  )
}

export default ProgramSelect
