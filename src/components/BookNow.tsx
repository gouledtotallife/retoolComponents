import React from 'react'
import ProviderFilter from './ProviderFilter'

interface RawProvider {
  untitled: string
  'Full Name': string
  'License Type': string
  'Professional Headshot': string
  'Specialties Expertise': string
  'Licensed States': string
  Bio: string
}

interface Provider {
  id: string
  name: string
  role: string
  headshot: string
  specialties: string[]
  licensedStates: string[]
  bio: string
}

interface BookNowProps {
  providerData: RawProvider[]
  selectedProvider?: string
  selectedDate?: string
  selectedTime?: string
  onProviderSelect: (provider: string) => void
  onDateSelect: (date: string) => void
  onTimeSelect: (time: string) => void
}

const convertToThumbnailUrl = (url: string) => {
  if (!url || !url.includes('drive.google.com')) return url
  const fileId =
    url.match(/\/d\/(.*?)\/view/)?.[1] || url.match(/id=(.*?)(&|$)/)?.[1]
  if (!fileId) return url
  return `https://drive.google.com/thumbnail?id=${fileId}`
}

const BookNow: React.FC<BookNowProps> = ({
  providerData,
  selectedProvider,
  onProviderSelect
}) => {
  // Add a check for empty provider data
  if (!providerData || providerData.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Loading providers...
      </div>
    )
  }

  const formattedProviders = React.useMemo(
    () =>
      providerData.map((provider) => ({
        id: provider['untitled'],
        name: provider['Full Name'],
        role: provider['License Type'],
        headshot: provider['Professional Headshot'],
        bio: provider['Bio'] || '', // Add this line
        specialties: provider['Specialties Expertise']?.includes(', ')
          ? provider['Specialties Expertise']?.split(', ')
          : provider['Specialties Expertise']?.split(' ') || [],
        licensedStates: provider['Licensed States']?.split(', ') || []
      })),
    [providerData]
  )

  const [filteredProviders, setFilteredProviders] =
    React.useState<Provider[]>(formattedProviders)

  React.useEffect(() => {
    setFilteredProviders(formattedProviders)
  }, [formattedProviders])

  const handleFilterChange = (filters: {
    state: string
    specialty: string
    virtual: boolean
    insuranceType: string
  }) => {
    let filtered = formattedProviders

    if (filters.state) {
      filtered = filtered.filter((provider) =>
        provider.licensedStates.includes(filters.state)
      )
    }

    if (filters.specialty) {
      filtered = filtered.filter((provider) =>
        provider.specialties.includes(filters.specialty)
      )
    }

    setFilteredProviders(filtered)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: 'Inter, sans-serif',
        background: '#fffaf6'
      }}
    >
      <ProviderFilter
        providers={formattedProviders}
        onFilterChange={handleFilterChange}
      />

      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          justifyContent: 'center',
          padding: '40px 24px'
        }}
      >
        <div
          style={{
            width: '1000px',
            maxWidth: '100%',
            padding: '0 24px'
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                onClick={() => onProviderSelect(provider.id)}
                style={{
                  padding: '40px',
                  background: 'white',
                  maxWidth: '1000px',
                  margin: '0 auto',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  borderRadius: '3%',
                  border: `2px solid ${selectedProvider === provider.id ? '#007AFF' : '#E5E5E5'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <h2
                  style={{
                    fontSize: '36px',
                    marginTop: 0,
                    marginBottom: '24px',
                    fontWeight: '500'
                  }}
                >
                  {provider.name}
                </h2>

                <div
                  style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}
                >
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >
                    {provider.headshot ? (
                      <img
                        src={convertToThumbnailUrl(provider.headshot)}
                        alt={provider.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          color: '#666'
                        }}
                      >
                        {provider.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '16px'
                      }}
                    >
                      <span
                        style={{
                          background: '#f5f5f5',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '14px'
                        }}
                      >
                        {provider.role}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}
                    >
                      {provider.specialties
                        .slice(0, 6)
                        .map((specialty, index) => (
                          <span
                            key={index}
                            style={{
                              background: '#f5f5f5',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '14px'
                            }}
                          >
                            {specialty}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    color: '#555',
                    lineHeight: '1.8',
                    fontSize: '16px',
                    margin: '0'
                  }}
                >
                  {provider.bio ||
                    `${provider.name} has always known that their role...`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookNow
