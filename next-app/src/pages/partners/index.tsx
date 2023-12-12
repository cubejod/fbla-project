import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'
import { useState } from 'react'
import Select from 'react-select'
import { RESOURCES_AVAILABLE } from '../../../configuration'
import { AbridgedPartnerComponent } from '../../components/Partners/PartnerComponent'
import redis from '../../lib/redis'
import { Partner } from '../../types'

type Props = {
  partners: Partner[]
}

const IndexPage: React.FC<Props> = ({ partners }) => {
  const router = useRouter()

  const [ sortOrder, setSortOrder ] = useState('asc') // 'asc' or 'desc'
  const [ filterType, setFilterType ] = useState('')
  const [ filterResources, setFilterResources ] = useState('')

  const sortPartners = (partnersToSort: Partner[]) => {
    return partnersToSort.sort((a, b) => {
      const nameA = a.partnerName.toLowerCase()
      const nameB = b.partnerName.toLowerCase()
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
    })
  }

  const filterByType = (partnersToFilter: Partner[]) => {
    return !filterType ? partnersToFilter : partnersToFilter.filter(partner => partner.organizationType === filterType)
  }

  const filterByResources = (partnersToFilter: Partner[]) => {
    return !filterResources ? partnersToFilter : partnersToFilter.filter(partner => partner.resourcesAvailable.includes(filterResources))
  }

  const sortedAndFilteredPartners = () => {
    let result = [ ...partners ] // destructure to copy the array
    result = filterByType(result)
    result = filterByResources(result)
    result = sortPartners(result)
    return result
  }

  const handleInfo = (id: number) => {
    router.push(`/partners/${ id }`)
  }

  return (
    <div className="container">
      <div className="mb-4">
        <button onClick={ () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc') } className="button">
          Sort by Name
        </button>
        <input type="text" placeholder="Filter by Type" onChange={ (e) => setFilterType(e.target.value) } className="input" />
        <Select
          isClearable={ true }
          name="resourcesAvailable"
          options={ RESOURCES_AVAILABLE }
          onChange={ (e) => { if (e) setFilterResources(e.label) } }
        />
      </div>
      <div>
        <div>
          { sortedAndFilteredPartners().map(partner => (
            <AbridgedPartnerComponent key={ partner.id } partner={ partner } onInfo={ handleInfo } />
          )) }
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = (async (context) => {
  const partnerKeys = await redis.keys(`partners.*`)
  const partners: Partner[] = []

  for (const key of partnerKeys) {
    const partner = await redis.hgetall(key) as unknown as Partner
    if (partner.partnershipStatus == '1') partners.push(partner)
  }

  return { props: { partners } }
}) satisfies GetServerSideProps<Props>

export default IndexPage
