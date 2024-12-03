import React, { FC } from 'react'

import { Retool } from '@tryretool/custom-component-support'
import  BookNow   from './components/bookNow'

// ... rest of the code ...

export const HelloWorld: FC = () => {
  // Receive data from Retool
  const [selectedProvider, setSelectedProvider] = Retool.useStateString({
    name: 'selectedProvider'  // This name will be used in Retool to reference this value
  })

  const [selectedDate, setSelectedDate] = Retool.useStateString({
    name: 'selectedDate'
  })

  const [selectedTime, setSelectedTime] = Retool.useStateString({
    name: 'selectedTime'
  })

  const [providerData] = Retool.useStateArray({
    name: 'providerData'
  })

  return (
    <div>
      <BookNow 
        providerData = {providerData}
        selectedProvider={selectedProvider}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onProviderSelect={setSelectedProvider}
        onDateSelect={setSelectedDate}
        onTimeSelect={setSelectedTime}
      />
    </div>
  )
}
