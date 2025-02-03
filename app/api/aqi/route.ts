import { NextResponse } from 'next/server'

// Cache the AQI data for 1 hour
let cachedData: any = null
let lastFetchTime: number = 0
const CACHE_DURATION = 3600000 // 1 hour in milliseconds

async function fetchAQIData() {
  try {
    const token = process.env.WAQI_TOKEN
    if (!token) {
      throw new Error('WAQI_TOKEN is not set')
    }

    const response = await fetch(`https://api.waqi.info/feed/new-delhi/?token=${token}`)
    const data = await response.json()
    
    if (data.status === 'ok') {
      return {
        aqi: data.data.aqi,
        timestamp: Date.now(),
        level: getAQILevel(data.data.aqi),
        pm25: data.data.iaqi.pm25?.v || 'N/A'
      }
    }
    throw new Error('Failed to fetch AQI data')
  } catch (error) {
    console.error('Error fetching AQI data:', error)
    throw error
  }
}

function getAQILevel(aqi: number): string {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

export async function GET() {
  try {
    const now = Date.now()
    
    // Return cached data if it's still valid
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json(cachedData)
    }

    // Fetch new data
    const data = await fetchAQIData()
    cachedData = data
    lastFetchTime = now

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AQI data' },
      { status: 500 }
    )
  }
}
