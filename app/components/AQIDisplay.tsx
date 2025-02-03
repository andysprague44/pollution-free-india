'use client'

import { useAQI } from '../hooks/useAQI'

export default function AQIDisplay() {
  const { aqiData, error, isLoading } = useAQI()

  if (error) {
    return (
      <div className="flex justify-center gap-4">
        <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-[#ea1111]">Delhi AQI</h2>
          <p className="text-xl font-bold">Error loading data</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center gap-4">
        <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-[#ea1111]">Delhi AQI</h2>
          <p className="text-xl font-bold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-4">
      <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-[#ea1111]">Delhi AQI</h2>
        <p className="text-xl font-bold">{aqiData?.aqi} {aqiData?.level}</p>
      </div>
      <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-[#ea1111]">{aqiData?.pm25}x</p>
        <p className="text-sm font-medium">PM2.5 LIMIT</p>
      </div>
    </div>
  )
}
