import React from 'react'
import ProviderFilter from './ProviderFilter'
import './BookNow.css'

interface RawProvider {
  untitled: string
  'Full Name': string
  'License Type': string
  'Professional Headshot': string
  'Specialties Expertise': string
  'Licensed States': string
  Bio: string
  url: string
}

interface Provider {
  id: string
  name: string
  role: string
  headshot: string
  specialties: string[]
  licensedStates: string[]
  bio: string
  url: string
}

interface BookNowProps {
  providerData: RawProvider[]
  selectedProvider?: string
  onProviderSelect: (provider: string) => void
}

const convertToThumbnailUrl = (url: string) => {
  if (!url || !url.includes('drive.google.com')) return url
  const fileId =
    url.match(/\/d\/(.*?)\/view/)?.[1] || url.match(/id=(.*?)(&|$)/)?.[1]
  return fileId ? `https://drive.google.com/thumbnail?id=${fileId}` : url
}

const BookNow: React.FC<BookNowProps> = ({
  providerData,
  selectedProvider,
  onProviderSelect
}) => {
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
        bio: provider['Bio'] || '',
        url: provider['url'] || '',
        specialties: provider['Specialties Expertise']
          ? provider['Specialties Expertise'].split(',').map((s) => s.trim())
          : [],
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
    <div className="container">
      <ProviderFilter
        providers={formattedProviders}
        onFilterChange={handleFilterChange}
        className="provider-filter-container"
      />

      <div className="inner-container">
        <div className="card-container">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className={`provider-card ${selectedProvider === provider.id ? 'selected' : ''}`}
              onClick={() => onProviderSelect(provider.id)}
            >
              <h2 className="provider-header">
                {provider.name}
                <a
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Full Profile {' >'}
                </a>
              </h2>
              <div className="provider-details">
                <div className="provider-headshot">
                  {provider.headshot ? (
                    <img
                      src={convertToThumbnailUrl(provider.headshot)}
                      alt={provider.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="provider-placeholder">
                      {provider.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="specialties-wrapper">
                    {provider.specialties
                      .slice(0, 6)
                      .map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                  </div>
                  <p className="provider-bio">
                    {provider.bio || 'No bio available.'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookNow
