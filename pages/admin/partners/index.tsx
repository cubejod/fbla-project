
import { useRouter } from 'next/router'

import { GetServerSideProps } from 'next'
import PartnerComponent from '../../../components/PartnerComponent'
import redis from '../../../lib/redis'
import { withSessionSsr } from '../../../lib/withSession'
import type { Partner } from '../../../types'

type Props = {
  partners: Partner[]
  username: string
}

const PartnersPage: React.FC<Props> = ({ partners }) => {
  const router = useRouter()

  async function handleDelete (id: number) {
    try {
      const response = await fetch(`/api/partners/${ id }`, {
        method: 'DELETE',
      })

      if (response.status === 204) {
        router.reload()
        alert('Deleted partner')
      } else {
        alert('Faield to delete partner')
      }
    } catch (error) {
      alert('Error deleting partner: ' + error)
    }
  }

  async function handleExport (e: React.FormEvent) {
    e.preventDefault()

    const data = await fetch('/api/partners')
    const text = await data.text()
    const blob = new Blob([ text ], { type: 'application/json' })

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = (new Date().toISOString()) + '.json'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  async function handleEdit (id: number) {
    router.push(`/admin/partners/edit/${ id }`)
  }

  async function handleSingularExport (id: number) {
    const data = await fetch(`/api/partners/${ id }`)
    const text = await data.text()
    const blob = new Blob([ text ], { type: 'application/json' })

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `partner-${ id }.json`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // async function handleImport (e: React.FormEvent) {
  //   e.preventDefault()
  // }

  return (
    <div>
      <h1>Partners</h1>
      <hr></hr>
      <div className="partners-grid">
        { partners.map((partner) => (
          <PartnerComponent
            key={ `partner-${ partner.id }` }
            partner={ partner }
            onEdit={ handleEdit }
            onDelete={ handleDelete }
            onExport={ handleSingularExport }
          />
        )) }
      </div>
      <hr></hr>
      <button className="save-button" onClick={ () => { router.push('/admin/partners/new') } }>New</button>
      <button className="export-button" onClick={ handleExport }>Export</button>
      {/* <button className="import-button" onClick={handleImport}>Import</button> */ }
    </div >
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps ({ req }) {
    if (!req.session.username) return {
      redirect: {
        destination: '/admin/login?redirect=/admin/partners',
        statusCode: 307
      }
    }

    const partnerKeys = await redis.keys('partners.*')
    const partners: Partner[] = []

    for (const key of partnerKeys) {
      const partner = await redis.hgetall(key) as unknown as Partner
      partners.push(partner)
    }

    return {
      props: {
        username: req.session.username,
        partners
      }
    }
  } satisfies GetServerSideProps<Props>
)

export default PartnersPage
