import { useParams } from 'react-router-dom'

// Bu bileşen henüz uygulanmadı
// Gerçek uygulamada görev detaylarını gösterecek

export function TaskDetail() {
  const { id } = useParams()

  return (
    <div className="glass-card p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Görev Detayı</h1>
      <p className="text-gray-400">Görev ID: {id}</p>
      <p className="text-gray-400 mt-2">Bu bileşen henüz uygulanmadı.</p>
    </div>
  )
}
