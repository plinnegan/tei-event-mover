import React from 'react'
import propTypes from 'prop-types'
import { SingleSelect, SingleSelectOption } from '@dhis2/ui-core'
import { useDataQuery } from '@dhis2/app-runtime'

const SelectData = ({ query }) => {
  const { loading, error, data } = useDataQuery(query)
  const endpoint = query.results.resource
  const hasName = query => query.results.params.fields.includes('name')
  if (!hasName)
    throw 'SelectData must be passed a query object where the "name" field is requested'
  console.log(data)
  return (
    <SingleSelect
      loading={loading}
      loadingText={`Loading ${endpoint}`}
      empty={
        data && data.results[endpoint].length ? false : `No ${endpoint} found`
      }
    >
      {error ? (
        <SingleSelectOption
          key={`${endpoint}-select-error`}
          value="error"
          label={`Error while loading ${endpoint}`}
        ></SingleSelectOption>
      ) : (
        data &&
        data.results[endpoint].map(result => (
          <SingleSelectOption
            key={result.id}
            value={result.id}
            label={result.name}
          ></SingleSelectOption>
        ))
      )}
    </SingleSelect>
  )
}

SelectData.propTypes = {
  query: propTypes.shape({
    results: propTypes.shape({
      params: propTypes.shape({
        fields: propTypes.arrayOf(propTypes.string),
      }).isRequired,
      resource: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default SelectData
