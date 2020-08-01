import React, { useState } from 'react'
import propTypes from 'prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'

const SelectData = ({ label, options, initialValue, setValue }) => {
  const [selected, setSelected] = useState(initialValue)

  const handleChange = e => {
    console.log('Changing')
    setSelected(e.selected)
    console.log(e)
    setValue(e.selected)
  }

  return (
    <SingleSelectField
      label={label}
      inputWidth="400px"
      onChange={e => handleChange(e)}
      selected={selected}
    >
      {options &&
        options.map(opt => (
          <SingleSelectOption
            key={opt.key}
            value={opt.value}
            label={opt.label}
          ></SingleSelectOption>
        ))}
    </SingleSelectField>
  )
}

SelectData.propTypes = {
  label: propTypes.string.isRequired,
  options: propTypes.array.isRequired,
  setValue: propTypes.func.isRequired,
  initialValue: propTypes.string,
}

export default SelectData
