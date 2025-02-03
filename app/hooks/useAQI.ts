import { useState, useEffect } from 'react'

interface AQIData {
  aqi: number
  level: string
  pm25: number | string
  timestamp: number
}

export function useAQI() {
  const [aqiData, setAqiData] = useState<AQIData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/aqi')
        if (!response.ok) throw new Error('Failed to fetch AQI data')
        const data = await response.json()
        setAqiData(data)
        setError(null)
      } catch (err) {
        setError('Failed to load AQI data')
        console.error('Error fetching AQI data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch immediately
    fetchData()

    // Then fetch every hour
    const interval = setInterval(fetchData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { aqiData, error, isLoading }
}
