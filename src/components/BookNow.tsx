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
    specialties: provider['Specialties Expertise']?.includes(', ') 
      ? provider['Specialties Expertise']?.split(', ')
      : provider['Specialties Expertise']?.split(' ') || [],
    licensedStates: provider['Licensed States']?.split(', ') || []
  }));

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "16px", fontFamily: "Arial, sans-serif" }}>
      {/* Provider Selection */}
      <div style={{ width: "50%", padding: "16px" }}>
        <h3>Choose your Provider</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {formattedProviders.map((provider) => (
            <div
              key={provider.id}
              style={{
                border: selectedProvider === provider.name ? "2px solid red" : "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
                cursor: "pointer",  
              }}
              onClick={() => onProviderSelect(provider.name)}
            >
              <h4>{provider.name}</h4>
              <p>{provider.role}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {provider.specialties.slice(0, 3).map((specialty: string, i) => (
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
              <p style={{ marginTop: "8px", fontSize: "12px" }}>
                <strong>Licensed in:</strong> {provider.licensedStates.length} states
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Date and Time Picker */}
      <div style={{ width: "40%", padding: "16px" }}>
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
                      ? "red"
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

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          background: "#fff",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
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
            background: selectedProvider && selectedDate && selectedTime ? "red" : "#ccc",
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
};

export default BookNow;