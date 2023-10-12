import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import redis from '../../../../lib/redis'

import PartnerForm from '../../../../components/PartnerForm'
import { withSessionSsr } from '../../../../lib/withSession'
import { Permissions, type Partner } from '../../../../types'
import PermissionsUtil from '../../../../utils/PermissionsUtil'

type Props = {
  partner: Partner
}

const EditPartner: React.FC<Props> = ({ partner }) => {
  const router = useRouter()

  const handleSubmit = async (data: Partner) => {
    try {
      const response = await fetch(`/api/partners/${ data.id }`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) router.push('/admin/partners')
    } catch (error) {
      console.error('Error creating partner:', error)
    }
  }

  const handleCancel = async () => {
    router.push('/admin/partners')
  }

  return (
    <div>
      <h1>Edit Partner</h1>
      <PartnerForm
        initialData={ partner }
        onSubmit={ handleSubmit }
        onCancel={ handleCancel }
        allowImport={ false }
      />
    </div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req, query }) {
    if (!req.session.username) return {
      redirect: {
        destination: `/admin/login?redirect=/admin/partners/edit/${ query.id }`,
        statusCode: 302
      }
    }
    else if (!PermissionsUtil.hasPermission(req.session, Permissions.EDIT_PARTNERS)) return {
      redirect: {
        destination: '/admin/partners',
        statusCode: 302
      }
    }

    const partner = (await redis.hgetall(`partners.${ query.id }`)) as unknown as Partner
    return { props: { partner } }
  } satisfies GetServerSideProps<Props>
)

export default EditPartner
