import React from 'react'
import { Tab, TabBar } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'

const NavStyle = {
  width: '100%',
}

const Nav = () => {
  const history = useHistory()
  const location = useLocation()

  const navigate = path => {
    history.push(path)
  }

  return (
    <div style={NavStyle}>
      <TabBar fixed>
        <Tab selected={location.pathname === '/'} onClick={() => navigate('/')}>
          {i18n.t('Select TEIs')}
        </Tab>
        <Tab
          selected={location.pathname === '/move'}
          onClick={() => navigate('/move')}
        >
          {i18n.t('Move Selected TEIs')}
        </Tab>
      </TabBar>
    </div>
  )
}

export default Nav
