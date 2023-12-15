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

const StartPage: React.FC = () => {
  return (
    <div style={ styles.container }>
      <div style={ styles.welcome }>Welcome!</div>
      <div style={ styles.message }>Go to /partners/ to see the list of partners, or /admin/partners/ to edit partners if you are an admin.</div>
    </div>
  )
}

export default StartPage
