import { CenterFocusStrong } from '@mui/icons-material';
import React from 'react';

interface Provider {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  licensedStates: string[];
}

interface BookNowProps {
  providerData: any[]; // Replace 'any' with your actual data type
  selectedProvider?: string;
  selectedDate?: string;
  selectedTime?: string;
  onProviderSelect: (provider: string) => void;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const timeSlots = [
  { time: "7 - 8 AM", available: true },
  { time: "8 - 9 AM", available: true },
  { time: "9 - 10 AM", available: false },
  { time: "10 - 11 AM", available: true },
];

const convertToThumbnailUrl = (url: string) => {
  if (!url || !url.includes('drive.google.com')) return url;
  
  // Extract the file ID from various possible Google Drive URL formats
  const fileId = url.match(/\/d\/(.*?)\/view/)?.[1] || // matches /d/FILE_ID/view
                url.match(/id=(.*?)(&|$)/)?.[1];        // matches id=FILE_ID
  
  if (!fileId) return url;
  return `https://drive.google.com/thumbnail?id=${fileId}`;
};

const BookNow: React.FC<BookNowProps> = ({
  providerData,
  selectedProvider,
  selectedDate,
  selectedTime,
  onProviderSelect,
  onDateSelect,
  onTimeSelect
}) => {
  // Transform provider data into required format
  const formattedProviders = providerData.map(provider => ({
    id: provider['untitled'],
    name: provider['Full Name'],
    role: provider['License Type'],
    headshot: provider['Professional Headshot'],
    specialties: provider['Specialties Expertise']?.includes(', ') 
      ? provider['Specialties Expertise']?.split(', ')
      : provider['Specialties Expertise']?.split(' ') || [],
    licensedStates: provider['Licensed States']?.split(', ') || []
  }));

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      height: "100vh",
      fontFamily: "Inter, sans-serif",
      background: "#fffaf6"
    }}>
      {/* Main Content Container */}
      <div style={{ 
        display: "flex",
        flex: 1,
        minHeight: 0,
        justifyContent: "center",
        padding: "40px 24px"
      }}>
        {/* Provider Selection Container */}
        <div style={{ 
          width: "1000px",
          maxWidth: "100%",
          padding: "0 24px",
        }}>
          <h1 style={{ textAlign: 'center', fontSize: '30px', marginBottom: '48px', color:'#333', fontWeight: '600' }}>Choose your Provider</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {formattedProviders.map((provider) => (
              <div
                key={provider.id}
                style={{
                  padding: "40px",
                  background: "white",
                  maxWidth: "1000px",
                  margin: "0 auto",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  borderRadius: "3%",
                  border: `2px solid ${selectedProvider === provider.id ? '#007AFF' : '#E5E5E5'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {/* Provider Name and Pronouns Header */}
                <h2 style={{ 
                  fontSize: "36px", 
                  marginTop: 0, 
                  marginBottom: "24px",
                  fontWeight: "500"
                }}>
                  {provider.name}
                  <span style={{ 
                    fontSize: "16px", 
                    color: "#666", 
                    fontWeight: "normal",
                    marginLeft: "8px" 
                  }}>(she/her)</span>
                </h2>
  
                <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
                  {/* Profile Image */}
                  <div style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0
                  }}>
                    {provider.headshot ? (
                      <img 
                        src={convertToThumbnailUrl(provider.headshot)}
                        style={{  
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        background: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "#666"
                      }}>
                        {provider.name.charAt(0)}
                      </div>
                    )}
                  </div>
  
                  {/* Specialties Container */}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      gap: "8px", 
                      marginBottom: "16px" 
                    }}>

                      <span style={{
                        background: "#f5f5f5",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "14px"
                      }}>
                        {provider.role}
                      </span>
                    </div>
  
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      gap: "8px" 
                    }}>
                      {provider.specialties.slice(0,6).map((specialty: string, index: number) => (
                        <span
                          key={index}
                          style={{
                            background: "#f5f5f5",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "14px"
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
  
                {/* Description Text */}
                <p style={{ 
                  color: "#555",
                  lineHeight: "1.8",
                  fontSize: "16px",
                  margin: "0"
                }}>
                  {provider.name} has always known that their role in the Mental Health Industry was a "calling" not just a choice. They are passionate about assisting clients with improving their quality of life and daily functioning during the most delicate and vulnerable episodes in their lives. They assist adults, couples and families with developing coping strategies, mental health/interpersonal...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default BookNow;
