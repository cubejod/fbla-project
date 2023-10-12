import { withSessionRoute } from '../../lib/withSession'

export default withSessionRoute(
  async function handler (req, res) {
    switch (req.method) {
      case 'POST':
        req.session.destroy()

        res.status(200).json({ message: 'Logged out' })
        break

      default:
        res.status(405).json({ message: 'Method not allowed' })
        break
    }
  }
)
