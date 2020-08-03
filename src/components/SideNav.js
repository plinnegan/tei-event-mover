import { Menu, MenuItem } from '@dhis2/ui'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

//Hope it is OK to use the Navigation from the training, I actually thing the top navigation
// is better for this application so I'm just putting this in to meet the requirements.
const NavigationItem = ({ path, label }) => {
  const history = useHistory()

  const routeMatch = useRouteMatch(path)
  const isActive = routeMatch?.isExact

  const onClick = () => !isActive && history.push(path)

  return <MenuItem label={label} active={isActive} onClick={onClick} />
}

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export const Navigation = () => (
  <Menu>
    <NavigationItem label="Home" path="/" />

    <NavigationItem label="Move" path="/move" />
  </Menu>
)
