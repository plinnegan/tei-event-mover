export const userOuWithProgramsQuery = {
  userOus: {
    resource: 'me',
    params: {
      fields: ['organisationUnits'],
    },
  },
  programs: {
    resource: 'programs',
    params: {
      fields: [
        'id',
        'name',
        'orgUnit',
        'programTrackedEntityAttributes[displayInList,trackedEntityAttribute[id,name]]',
      ],
      filter: 'programType:eq:WITH_REGISTRATION',
      paging: 'false',
    },
  },
}
