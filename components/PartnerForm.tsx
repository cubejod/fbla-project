import React, { useState } from 'react'
import { Partner } from '../types'

type Props = {
  initialData: Partner
  onSubmit: (data: Partner) => void
  onCancel: () => void
  allowImport: boolean
}

const PartnerForm: React.FC<Props> = ({ initialData, onSubmit, onCancel, allowImport }) => {
  const [ partnerData, setPartnerData ] = useState(initialData)

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target
    setPartnerData({ ...partnerData, [ name ]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(partnerData)
  }

  const handleFileChange = (event: React.ChangeEvent<any>) => {
    const selectedFile = event.target.files[ 0 ]

    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = (event) => {
        try {
          const fileContent = JSON.parse(event.target!.result as string)
          setPartnerData(fileContent)
        } catch (error) {
          alert("Failed to import partner")
        }
      }

      reader.readAsText(selectedFile)
    }
  }

  return (
    <form onSubmit={ handleSubmit } className="partner-rectangle">
      <div>
        <label>Partner Name:</label>
        <input
          type="text"
          name="partnerName"
          value={ partnerData.partnerName }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Organization Type:</label>
        <input
          type="text"
          name="organizationType"
          value={ partnerData.organizationType }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Resources Available:</label>
        <input
          type="text"
          name="resourcesAvailable"
          value={ partnerData.resourcesAvailable }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Contact Name:</label>
        <input
          type="text"
          name="contactName"
          value={ partnerData.contactName }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Contact Email:</label>
        <input
          type="email"
          name="contactEmail"
          value={ partnerData.contactEmail }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Contact Phone:</label>
        <input
          type="tel"
          name="contactPhone"
          value={ partnerData.contactPhone }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Street Address:</label>
        <input
          type="text"
          name="addressStreet"
          value={ partnerData.addressStreet }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="addressCity"
          value={ partnerData.addressCity }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="addressState"
          value={ partnerData.addressState }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Zip Code:</label>
        <input
          type="text"
          name="addressZipCode"
          value={ partnerData.addressZipCode }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Website:</label>
        <input
          type="url"
          name="website"
          value={ partnerData.website }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={ partnerData.description }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Partnership Status:</label>
        <select
          name="partnershipStatus"
          value={ partnerData.partnershipStatus || 1 }
          onChange={ handleInputChange }
          required
        >
          <option value={ 1 }>Active</option>
          <option value={ 0 }>Inactive</option>
        </select>
      </div>
      { allowImport
        ? <div>
          <hr></hr>
          <p>Import from JSON:</p>
          <input type="file" accept=".json" onChange={ handleFileChange } />
        </div>
        : (undefined)
      }
      <button className="save-button" type="submit">Save</button>
      <button className="cancel-button" onClick={ (e) => {
        e.preventDefault()
        onCancel()
      } }>Cancel</button>
    </form >
  )
}

export default PartnerForm
