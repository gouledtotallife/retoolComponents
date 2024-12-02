import React from 'react';
import clsx from 'clsx';

const ProviderCard = ({ provider, selected, onSelect }) => {
  return (
    <div 
      className={clsx(
        'provider-card',
        selected ? 'provider-card-selected' : 'provider-card-default'
      )}
    >
      <div className="flex items-start gap-6">
        <img
          src={provider.image}
          alt={provider.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-md"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
              <a href="#" className="text-coral-500 text-sm hover:underline">
                Full Profile →
              </a>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-1">{provider.title}</p>
          <div className="flex gap-2 mt-3">
            {provider.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-600">
              <span className="font-medium">Next availability:</span>{' '}
              <span>{provider.nextAvailability}</span>
            </div>
            <button
              onClick={() => onSelect(provider.id)}
              className={clsx(
                'px-4 py-2 rounded-full transition-all duration-200',
                selected
                  ? 'bg-coral-500 text-white shadow-md hover:bg-coral-600'
                  : 'border border-coral-500 text-coral-500 hover:bg-coral-50'
              )}
            >
              {selected ? 'Selected' : 'Select Provider'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;