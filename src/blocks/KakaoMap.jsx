'use client'

import { useRef, useState, useEffect } from 'react'

import useGeoLoaction from '@/hooks/useGeoLoaction.jsx'

/**
 * 1. 왜 useEffect 인가?
 * 2. 다른 API 를 활용하기 위해서는 어떻게 해야하는가?
 * 3. 이 컴포넌트는 어디에서 실행되어야 하는가?
 * 4. Geoloacation API 로 얻어온 좌표를 언제 어떻게 반영해야할까?
 *
 */

export default function KakaoMap() {
  const geolocationOptions = useRef({
    enableHighAccuracy: true,
    maximumAge: 1000 * 60,
    timeout: 1000 * 60,
  })

  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)
  const { location } = useGeoLoaction(geolocationOptions.current)

  useEffect(() => {
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = true
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API}&autoload=false&libraries=services`
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoScript = () => {
      window.kakao.maps.load(() => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        }

        setMap(new window.kakao.maps.Map(mapContainerRef.current, mapOptions))
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoScript)

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoScript)
    }
  }, [])

  const handleSetCenter = (e) => {
    e.preventDefault()
    if (map !== null) {
      const moveLocation = new window.kakao.maps.LatLng(
        location.coordinates.latitude,
        location.coordinates.longitude,
      )
      map.setCenter(moveLocation)
    }
  }

  return (
    <>
      <button className="w-10 h-8 bg-blue-800" onClick={handleSetCenter}>
        setCenter
      </button>
      <div ref={mapContainerRef} className="w-96 h-96"></div>
    </>
  )
}
