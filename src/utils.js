import { useDataQuery } from '@dhis2/app-runtime'

export const getPrograms = () => {
  const query = {
    results: {
      resource: 'programs',
      params: {
        paging: false,
        fields: ['id', 'name'],
      },
    },
  }
  return useDataQuery(query)
}
