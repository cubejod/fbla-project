import { GetServerSideProps } from 'next'
import { withSessionSsr } from '../../lib/withSession'

interface Props { }

const LogOutPage: React.FC<Props> = () => {
  return (<div></div>)
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps ({ req, query }) {
    try {
      req.session.destroy()
    }
    catch (err) { /* Voiding Error */ }

    return {
      redirect: {
        destination: (query.redirect || '/') as string,
        statusCode: 307
      }
    }
  } satisfies GetServerSideProps<Props>
)

export default LogOutPage
