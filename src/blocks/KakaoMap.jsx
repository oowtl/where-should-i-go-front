'use client'

import Script from 'next/script'
import { useRef } from 'react'

export default function KakaoMap({ latitude, logitude }) {
  const mapRef = useRef()
  return (
    <>
      <div ref={mapRef} className="w-96 h-96"></div>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API}&autoload=false`}
        onReady={() => {
          window.kakao.maps.load(function () {
            const mapOptions = {
              center: new window.kakao.maps.LatLng(latitude, logitude),
              level: 3,
            }

            new window.kakao.maps.Map(mapRef.current, mapOptions)
          })
        }}
      />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API}&libraries=services&autoload=false`}
      />
    </>
  )
}
