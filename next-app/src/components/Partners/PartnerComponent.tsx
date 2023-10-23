import React from 'react'
import { Partner } from '../../types'


type Props = {
  partner: Partner,
  onDelete?: (id: number) => void,
  onEdit?: (id: number) => void,
  onExport?: (id: number) => void
}

const PartnerComponent: React.FC<Props> = ({ partner, onDelete, onEdit, onExport }) => {
  return (
    <div key={ partner.id } className={ `partner-rectangle ${ partner.partnershipStatus == '1' ? 'active-partner' : 'inactive-partner' }` }>
      <div>
        <strong>Name:</strong> { partner.partnerName }
      </div>
      <div>
        <strong>Type:</strong> { partner.organizationType }
      </div>
      <div>
        <strong>Resources Available:</strong> { Array.isArray(partner.resourcesAvailable)
          ? partner.resourcesAvailable.join(', ')
          : partner.resourcesAvailable }
      </div>
      <div>
        <strong>Contact Name:</strong> { partner.contactName }
      </div>
      <div>
        <strong>Contact Email:</strong> { partner.contactEmail }
      </div>
      <div>
        <strong>Contact Phone:</strong> { partner.contactPhone }
      </div>
      <div>
        <strong>Address:</strong> { partner.addressStreet }, { partner.addressCity }, { partner.addressState } { partner.addressZipCode }
      </div>
      <div>
        <strong>Website:</strong> <a href={ partner.website } target="_blank" rel="noopener noreferrer">{ partner.website }</a>
      </div>
      <div>
        <strong>Description:</strong> { partner.description }
      </div>
      <div>
        <strong>Partnership Status:</strong> { partner.partnershipStatus == '1' ? 'Active' : 'Inactive' }
      </div>
      <div>
        <strong>Partner ID:</strong> { partner.id }
      </div>
      {/* goofy patterns to optionally include buttons */ }
      {
        onEdit
          ? <button className="edit-button" onClick={ (e) => {
            e.preventDefault()
            onEdit(partner.id)
          } }>Edit</button>
          : ''
      }
      {
        onDelete
          ? <button className="delete-button" onClick={ (e) => {
            e.preventDefault()
            onDelete(partner.id)
          } }>Delete</button>
          : ''
      }
      {
        onExport
          ? <button className="export-button" onClick={ (e) => {
            e.preventDefault()
            onExport(partner.id)
          } }>Export</button>
          : ''
      }

    </div>)
}

export default PartnerComponent
