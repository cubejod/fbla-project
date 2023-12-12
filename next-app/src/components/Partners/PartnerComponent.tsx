import React from 'react'
import { Partner } from '../../types'

type Props = {
  partner: Partner,
  onDelete?: (id: number) => void,
  onEdit?: (id: number) => void,
  onExport?: (id: number) => void,
  onInfo?: (id: number) => void
}

const PartnerComponent: React.FC<Props> = ({ partner, onDelete, onEdit, onExport, onInfo }) => {
  return (
    <div key={ partner.id } className={ `partner-rectangle ${ partner.partnershipStatus == '1' ? '1-partner' : 'in1-partner' }` }>
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
        <strong>Partnership Status:</strong> { partner.partnershipStatus == '1' ? '1' : 'In1' }
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
      {
        onInfo
          ? <button className="info-button" onClick={ (e) => {
            e.preventDefault()
            onInfo(partner.id)
          } }>Info</button>
          : ''
      }
    </div>)
}

export const AbridgedPartnerComponent: React.FC<Props> = ({ partner, onDelete, onEdit, onExport, onInfo }) => {
  return (
    <div key={ partner.id } className='partner-card' onClick={ () => { onInfo ? onInfo(partner.id) : null } }>
      <h2 className="partner-name">{ partner.partnerName }</h2>
      <p className="partner-type"><strong>Type:</strong> { partner.organizationType }</p>
      <p className="partner-resources">
        <strong>Resources Available:</strong>
        {
          Array.isArray(partner.resourcesAvailable) ? partner.resourcesAvailable.join(', ') : partner.resourcesAvailable
        }
      </p>
      {/* Add more details here */ }
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
