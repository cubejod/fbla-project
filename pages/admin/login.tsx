import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { withSessionSsr } from '../../lib/withSession'

interface Props {
  redirect: string
}

const LoginPage: React.FC<Props> = ({ redirect }) => {
  const router = useRouter()

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<unknown>) => {
    const { name, value } = e.target as unknown as { name: string, value: string }
    setFormData({ ...formData, [ name ]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const email = formData.email
    const password = formData.password

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }

      const response = await fetch('/api/login', options)
      const json = await response.json()
      const message = json.message

      if (response.status !== 200) {
        alert(message)
        return
      }

      router.push({ pathname: redirect })
    } catch (err) {
      alert('Failed to login')
      console.log(err)
    }
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit } className='login-form'>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={ formData.email }
            onChange={ handleChange }
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={ formData.password }
            onChange={ handleChange }
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps ({ req, query }) {
    const redirect = (query.redirect || '/admin/partners') as string
    if (req.session.username) return {
      redirect: {
        destination: redirect,
        statusCode: 307
      }
    }

    return {
      props: {
        redirect,
      }
    }
  } satisfies GetServerSideProps<Props>
)

export default LoginPage
