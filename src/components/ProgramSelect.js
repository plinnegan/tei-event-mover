import React from 'react'
import propTypes from 'prop-types'
import SelectData from './SelectData'

const ProgramSelect = ({ program, programList, setProgram }) => {
  const programSelectOptions = []
  for (const prg of programList) {
    const opt = {
      key: prg.id,
      value: prg.id,
      label: prg.name,
    }
    programSelectOptions.push(opt)
  }

  return (
    <SelectData
      label="Program"
      options={programSelectOptions}
      initialValue={program}
      setValue={setProgram}
    />
  )
}

ProgramSelect.propTypes = {
  program: propTypes.string.isRequired,
  programList: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      name: propTypes.string,
    })
  ).isRequired,
  setProgram: propTypes.func.isRequired,
}

export default ProgramSelect
