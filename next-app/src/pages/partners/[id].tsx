import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import redis from '../../lib/redis'
import { Partner } from '../../types' // Adjust import path as needed

interface Props {
  partner: Partner
}

const PartnerPage: React.FC<Props> = ({ partner }) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="partner-container">
      <h1>Partner Information</h1>
      <div className="partner-info-section">
        <h2>{ partner.partnerName }</h2>
        <p><strong>Type:</strong> { partner.organizationType }</p>
        <p><strong>Resources Available:</strong> { Array.isArray(partner.resourcesAvailable) ? partner.resourcesAvailable.join(', ') : partner.resourcesAvailable }</p>
        <p><strong>Contact Name:</strong> { partner.contactName }</p>
        <p><strong>Contact Email:</strong> <a href={ `mailto:${ partner.contactEmail }` }>{ partner.contactEmail }</a></p>
        <p><strong>Contact Phone:</strong> <a href={ `tel:${ partner.contactPhone }` }>{ partner.contactPhone }</a></p>
        <p><strong>Address:</strong> { `${ partner.addressStreet }, ${ partner.addressCity }, ${ partner.addressState } ${ partner.addressZipCode }` }</p>
        <p><strong>Website:</strong> <a href={ partner.website } target="_blank" rel="noopener noreferrer">{ partner.website }</a></p>
        <p><strong>Description:</strong> { partner.description }</p>
        <p><strong>Partnership Status:</strong> { partner.partnershipStatus === '1' ? '1' : 'In1' }</p>
        <p><strong>Partner ID:</strong> { partner.id }</p>
      </div>
    </div>
  )
}

export const getServerSideProps = (async ({ query }) => {
  const partner = (await redis.hgetall(`partners.${ query.id }`)) as unknown as Partner
  return { props: { partner } }
}) satisfies GetServerSideProps<Props>

export default PartnerPage
