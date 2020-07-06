import React from 'react'
import propTypes from 'prop-types'
import Title from './Title'
import Nav from './Nav'

const Layout = props => (
  <>
    <Title />
    <Nav />
    {props.children}
  </>
)

Layout.propTypes = {
  children: propTypes.node,
}

export default Layout
