import React from 'react';

interface Provider {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  licensedStates: string[];
}

interface ProviderFilterProps {
  providers: Provider[];
  onFilterChange: (filters: {
    state: string;
    specialty: string;
    virtual: boolean;
    insuranceType: string;
  }) => void;
}

const ProviderFilter: React.FC<ProviderFilterProps> = ({ providers, onFilterChange }) => {
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedSpecialty, setSelectedSpecialty] = React.useState('');
  const [isVirtual, setIsVirtual] = React.useState(false);
  const [selectedInsurance, setSelectedInsurance] = React.useState('All Savers');
  

  // Get unique states and specialties
  const states = [...new Set(providers.flatMap(provider => provider.licensedStates))].sort();
  const specialties = [...new Set(providers.flatMap(provider => provider.specialties))].sort();

  const handleFilterChange = (
    state: string = selectedState,
    specialty: string = selectedSpecialty,
    virtual: boolean = isVirtual,
    insurance: string = selectedInsurance
  ) => {
    setSelectedState(state);
    setSelectedSpecialty(specialty);
    setIsVirtual(virtual);
    setSelectedInsurance(insurance);
    
    onFilterChange({
      state,
      specialty,
      virtual,
      insuranceType: insurance
    });
  };

  return (
    <div style={{ display: 'flex', gap: '12px', padding: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <select 
        value={selectedState}
        onChange={(e) => handleFilterChange(e.target.value)}
        style={selectStyle}
      >
        
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
{/* 
      <select 
        value={selectedInsurance}
        onChange={(e) => handleFilterChange(selectedState, selectedSpecialty, isVirtual, e.target.value)}
        style={selectStyle}
      >
      </select> */}

      <select 
        value={selectedSpecialty}
        onChange={(e) => handleFilterChange(selectedState, e.target.value)}
        style={selectStyle}
      >
        <option value="">All Specialties</option>
        {specialties.map(specialty => (
          <option key={specialty} value={specialty}>{specialty}</option>
        ))}
      </select>

      <button 
        onClick={() => handleFilterChange(selectedState, selectedSpecialty, !isVirtual)}
        style={{
          ...selectStyle,
          background: isVirtual ? '#007AFF' : 'white',
          color: isVirtual ? 'white' : 'black',
        }}
      >
        Virtual
      </button>
    </div>
  );
};

const selectStyle = {
  padding: '8px 16px',
  borderRadius: '20px',
  border: '1px solid #E5E5E5',
  fontSize: '14px',
  cursor: 'pointer',
  outline: 'none'
};

export default ProviderFilter;