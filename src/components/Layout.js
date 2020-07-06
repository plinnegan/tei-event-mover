import React from 'react'
import propTypes from 'prop-types'
import Title from './Title'

const Layout = props => <Title>{props.children}</Title>

Layout.propTypes = {
  children: propTypes.node,
}

export default Layout
