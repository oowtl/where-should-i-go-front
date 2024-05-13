'use client'

import { useState, useEffect } from 'react'

/**
 *
 * 순서
 * 1. 위치 정보 제공 동의
 * 2. 동의 했을 때 위치 정보를 가져온다.
 *
 */

const useGeoLoaction = (geolocationOptions = {}) => {
  const [location, setLocation] = useState({
    coordinates: { latitude: 0, longitude: 0 },
  })

  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords

    setLocation({
      coordinates: {
        latitude: latitude,
        longitude: longitude,
      },
    })
  }

  const handleError = (error) => {
    throw new Error('Geolocation API 에러 발생', error)
  }

  useEffect(() => {
    const { geolocation } = navigator

    if (!geolocation) {
      throw new Error('지원하지 않는 브라우저입니다.')
    }

    if (geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        geolocationOptions,
      )
    }
  }, [geolocationOptions])

  return { location }
}

export default useGeoLoaction
