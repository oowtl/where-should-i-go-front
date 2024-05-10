import KakaoMap from '@/blocks/KakaoMap'

export default function Home() {
  const lati = 33.450701
  const logi = 126.570667

  return (
    <main>
      <KakaoMap latitude={lati} logitude={logi} />
    </main>
  )
}
