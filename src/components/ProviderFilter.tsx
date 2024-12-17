import React, { useState, useEffect } from 'react'

interface Provider {
  id: string
  name: string
  role: string
  specialties: string[]
  licensedStates: string[]
}

interface ProviderFilterProps {
  providers: Provider[]
  onFilterChange: (filters: {
    state: string
    specialty: string
    virtual: boolean
    insuranceType: string
    searchQuery: string
  }) => void
}

const US_STATES = [
  { name: 'Alabama', abbr: 'AL' },
  { name: 'Alaska', abbr: 'AK' },
  { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' },
  { name: 'California', abbr: 'CA' },
  { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' },
  { name: 'Delaware', abbr: 'DE' },
  { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' },
  { name: 'Hawaii', abbr: 'HI' },
  { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' },
  { name: 'Indiana', abbr: 'IN' },
  { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' },
  { name: 'Kentucky', abbr: 'KY' },
  { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' },
  { name: 'Maryland', abbr: 'MD' },
  { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' },
  { name: 'Minnesota', abbr: 'MN' },
  { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' },
  { name: 'Montana', abbr: 'MT' },
  { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' },
  { name: 'New Hampshire', abbr: 'NH' },
  { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' },
  { name: 'New York', abbr: 'NY' },
  { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' },
  { name: 'Ohio', abbr: 'OH' },
  { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' },
  { name: 'Pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' },
  { name: 'South Dakota', abbr: 'SD' },
  { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' },
  { name: 'Utah', abbr: 'UT' },
  { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' },
  { name: 'Washington', abbr: 'WA' },
  { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' },
  { name: 'Wyoming', abbr: 'WY' }
]

const ProviderFilter: React.FC<ProviderFilterProps> = ({
  providers,
  onFilterChange
}) => {
  const [selectedState, setSelectedState] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [isVirtual, setIsVirtual] = useState(false)
  const [selectedInsurance, setSelectedInsurance] = useState('All Savers')
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique states and specialties
  const specialties = [
    ...new Set(providers.flatMap((provider) => provider.specialties))
  ].sort()

  useEffect(() => {
    onFilterChange({
      state: selectedState,
      specialty: selectedSpecialty,
      virtual: isVirtual,
      insuranceType: selectedInsurance,
      searchQuery: searchQuery
    })
  }, [
    selectedState,
    selectedSpecialty,
    isVirtual,
    selectedInsurance,
    searchQuery
  ])

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        background: '#fffaf6'
      }}
    >
      <input
        type="text"
        placeholder="Search for a provider..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '8px 16px',
          borderRadius: '20px',
          border: '1px solid #E5E5E5',
          width: '300px',
          fontSize: '14px',
          outline: 'none',
          background: 'white'
        }}
      />

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        style={selectStyle}
      >
        <option value="">All States</option>
        {US_STATES.map((state) => (
          <option key={state.abbr} value={state.abbr}>
            {state.abbr}
          </option>
        ))}
      </select>

      <select
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
        style={selectStyle}
      >
        <option value="">All Specialties</option>
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty}>
            {specialty}
          </option>
        ))}
      </select>

      {/* <button
        onClick={() => setIsVirtual(!isVirtual)}
        style={{
          ...selectStyle,
          background: isVirtual ? '#007AFF' : 'white',
          color: isVirtual ? 'white' : 'black'
        }}
      >
        Virtual
      </button> */}
    </div>
  )
}

const selectStyle = {
  padding: '8px 16px',
  borderRadius: '20px',
  border: '1px solid #E5E5E5',
  fontSize: '14px',
  cursor: 'pointer',
  outline: 'none'
}

export default ProviderFilter
