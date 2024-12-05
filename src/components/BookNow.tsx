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
      fontFamily: "Arial, sans-serif",
      overflow: "hidden"
    }}>
      {/* Main Content Container */}
      <div style={{ 
        display: "flex",
        flex: 1,
        minHeight: 0
      }}>
        {/* Provider Selection - Left Side */}
        <div style={{ 
          width: "60%",
          overflowY: "scroll",
          padding: "24px",
          borderRight: "1px solid #eee",
          background: "#F9F9F9"
        }}>
          <h3 style={{display: 'flex', justifyContent: 'center'}}>Choose your Provider</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "25px" }}>
            {formattedProviders.map((provider) => (
              <div
                key={provider.id}
                style={{
                  border: selectedProvider === provider.name ? "2px solid #E57373" : "1px solid #ccc",
                  padding: "16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  background: "white",
                }}
                onClick={() => onProviderSelect(provider.name)}
              >
                {/* Top section with profile info */}
                <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: provider.headshot ? "grey" : "#f0f0f0",
                    overflow: "hidden"
                  }}>
                    {provider.headshot ? (
                      <img 
                        // Try one of these URL formats:
                        // Option 1:
                        src="https://drive.google.com/thumbnail?id=1ABgqNldtihr8DpniPyrPWqoSgu-RR5Uj"
                        // Option 2:
                        // src="https://lh3.googleusercontent.com/d/1ABgqNldtihr8DpniPyrPWqoSgu-RR5Uj"
                        // Option 3:
                        // src="https://drive.google.com/uc?id=1ABgqNldtihr8DpniPyrPWqoSgu-RR5Uj"
                        style={{  
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                        onError={(e) => {
                          console.error('Image failed to load');
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "100%",
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
                  <div style ={{ display: "block"}}>
                    <h4 style={{ margin: "0 0 10px 0" }}>{provider.name}</h4>
                    <p style={{ margin: "0 0 8px 0", fontSize: "15px" }}>{provider.role}</p>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {provider.specialties.slice(0, 3).map((specialty: string, i: number) => (
                        <span
                          key={i}
                          style={{
                            background: "#f0f0f0",
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
  
                {/* Bottom section with availability and button */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #eee",
                  paddingTop: "16px",
                  marginTop: "auto"
                }}>
                  <div>
                    <span style={{ color: "#666", fontSize: "14px" }}>Next availability:</span>
                    <span style={{ marginLeft: "8px", fontWeight: "500" }}>Aug 15</span>
                  </div>
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: "1px solid #E57373",
                      background: selectedProvider === provider.name ? "#E57373" : "white",
                      color: selectedProvider === provider.name ? "white" : "#E57373",
                      cursor: "pointer"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onProviderSelect(provider.name);
                    }}
                  >
                    {selectedProvider === provider.name ? "Selected" : "Select Provider"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Calendar - Right Side */}
        <div style={{ 
          width: "40%",
          padding: "24px",
          overflow: "auto"
        }}>
          <h3>Choose a Date</h3>
          <p style={{ fontSize: "14px" }}>Central Time (UTC-6)</p>
          <input
            type="date"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            onChange={(e) => onDateSelect(e.target.value)}
          />
          <div>
            <h4>Available Times</h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  disabled={!slot.available}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    background: slot.available
                      ? selectedTime === slot.time
                        ? "#E57373"
                        : "#f9f9f9"
                      : "#e0e0e0",
                    cursor: slot.available ? "pointer" : "not-allowed",
                    color: slot.available ? "#000" : "#999",
                  }}
                  onClick={() => slot.available && onTimeSelect(slot.time)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Footer */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 50px",
        background: "#41766c",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <button 
          style={{ 
            padding: "8px 16px", 
            borderRadius: "4px", 
            background: "#ccc", 
            border: "none" 
          }}
        >
          Cancel
        </button>
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            background: selectedProvider && selectedDate && selectedTime ? "#E57373" : "#ccc",
            border: "none",
            color: "#fff",
            cursor: selectedProvider && selectedDate && selectedTime ? "pointer" : "not-allowed",
          }}
          disabled={!selectedProvider || !selectedDate || !selectedTime}
        >
          Confirm Session
        </button>
      </div>
    </div>
  );

}
export default BookNow;