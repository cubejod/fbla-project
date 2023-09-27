import { useRouter } from 'next/router'
import React from 'react'
import PartnerForm from '../../../components/PartnerForm'
import { Partner } from '../../../types'

const NewPartner: React.FC = () => {
  const router = useRouter()

  const handleSubmit = async (data: Partner) => {
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        router.push('/admin/partners')
        alert('Created new partner')
      }
    } catch (error) {
      console.error('Error creating partner:', error)
    }
  }

  const handleCancel = async () => {
    router.push('/admin/partners')
  }

  return (
    <div>
      <h1>Create a New Partner</h1>
      <PartnerForm
        initialData={ {
          partnerName: '',
          organizationType: '',
          resourcesAvailable: '',
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          addressStreet: '',
          addressCity: '',
          addressState: '',
          addressZipCode: '',
          website: '',
          description: '',
          partnershipStatus: '0'
        } as Partner }
        onSubmit={ handleSubmit }
        onCancel={ handleCancel }
        allowImport={ true }
      />
    </div>
  )
}

export default NewPartner
