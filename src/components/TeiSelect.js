import React, { useState, useEffect } from 'react'
import TeiSelectSearch from './TeiSelectSearch'
import TeiTable from './TeiTable'
import propTypes from 'prop-types'

const TeiSelect = ({ data, teis, setTeis, initialState, setInitialState }) => {
  const [program, setProgram] = useState(initialState.program || '')
  const [prgAttrMap, setPrgAttrMap] = useState(initialState.prgAttrMap || {})
  const [orgUnit, setOrgUnit] = useState(initialState.orgUnit || '')
  const [orgUnitName, setOrgUnitName] = useState(initialState.orgUnitName || '')
  const [orgUnitPath, setOrgUnitPath] = useState(initialState.orgUnitPath || '')

  useEffect(() => {
    const splitPath = orgUnitPath.split('/')
    setOrgUnit(splitPath[splitPath.length - 1])
  }, [orgUnitPath])

  useEffect(() => {
    console.log('program', program)
    console.log('prgAttrMap', prgAttrMap)
    console.log('orgUnit', orgUnit)
    console.log('orgUnitPath', orgUnitPath)
    const currentState = {
      program: program,
      prgAttrMap: prgAttrMap,
      orgUnit: orgUnit,
      orgUnitName: orgUnitName,
      orgUnitPath: orgUnitPath,
    }
    return () => {
      console.log('currentState', currentState)
      setInitialState(currentState)
    }
  }, [program, prgAttrMap, orgUnit, orgUnitPath])

  useEffect(() => {
    if (data && 'programs' in data && 'programs' in data.programs) {
      const prgData = data.programs.programs
      const resultMap = {}
      for (const prg of prgData) {
        const displayTeas = []
        for (const tea of prg.programTrackedEntityAttributes) {
          if (tea.displayInList) {
            displayTeas.push({
              id: tea.trackedEntityAttribute.id,
              name: tea.trackedEntityAttribute.name,
            })
          }
        }
        resultMap[prg.id] = displayTeas
      }
      setPrgAttrMap(resultMap)
    }
  }, [data])

  useEffect(() => {
    if (program !== initialState.program || orgUnit !== initialState.orgUnit)
      setTeis([])
  }, [program, orgUnit])

  return (
    <>
      <TeiSelectSearch
        program={program}
        programList={data.programs.programs}
        setProgram={setProgram}
        orgUnitName={orgUnitName}
        setOrgUnitName={setOrgUnitName}
        orgUnitPath={orgUnitPath}
        setOrgUnitPath={setOrgUnitPath}
        userOuData={data.userOus.organisationUnits}
      />
      <br />
      {program && orgUnit ? (
        <TeiTable
          program={program}
          orgUnit={orgUnit}
          teis={teis}
          setTeis={setTeis}
          displayAttrs={program in prgAttrMap ? prgAttrMap[program] : []}
        />
      ) : (
        <p>Please select a program and org unit to view TEIs</p>
      )}
    </>
  )
}

TeiSelect.propTypes = {
  data: propTypes.shape({
    programs: propTypes.object,
    userOus: propTypes.object,
  }).isRequired,
  setTeis: propTypes.func.isRequired,
  teis: propTypes.array.isRequired,
  initialState: propTypes.shape({
    orgUnit: propTypes.string,
    orgUnitName: propTypes.string,
    orgUnitPath: propTypes.string,
    prgAttrMap: propTypes.object,
    program: propTypes.string,
  }),
  setInitialState: propTypes.func,
}

export default TeiSelect
