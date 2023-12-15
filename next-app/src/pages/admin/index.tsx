import React from 'react'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  welcome: {
    fontSize: '2em',
    fontWeight: 'bold' as 'bold',
  },
  message: {
    marginTop: '1em',
    fontSize: '1em',
  },
}

const AdminPage: React.FC = () => {
  return (
    <div style={ styles.container }>
      <div style={ styles.welcome }>Welcome, Admin!</div>
    </div>
  )
}

export default AdminPage
