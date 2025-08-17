// プラン詳細画面
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

function PlanDetail() {
  const { id } = useParams() // URLからプランID取得
  const [plan, setPlan] = useState(null)
  const [participants, setParticipants] = useState([])
  const [inviteLink, setInviteLink] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // プラン詳細取得
    axios.get(`http://localhost:3000/plans/${id}`)
      .then(res => setPlan(res.data))
      .catch(err => {
        console.error(err)
        navigate('/404')
      })
    // 参加者取得
    axios.get(`http://localhost:3000/plans/${id}/participants`)
      .then(res => setParticipants(res.data))
  }, [id, navigate])

  // 日付・時刻フォーマット関数は省略（既存のものを利用）

  // 招待リンク生成
  const handleGenerateInvite = async () => {
    const res = await axios.post(`http://localhost:3000/plans/${id}/invite`)
    setInviteLink(`http://localhost:5174/join?token=${res.data.token}`)
  }

  if (!plan) return <div>読み込み中...</div>

  return (
    <div style={{ padding: 20 }}>
      <h2>プラン詳細</h2>
      <ul>
        <li><b>プラン名:</b> {plan.title}</li>
        <li><b>目的地:</b> {plan.destination}</li>
        <li><b>出発地:</b> {plan.departure}</li>
        <li><b>到着地:</b> {plan.arrival}</li>
        <li><b>出発日:</b> {formatDate(plan.departure_date)}</li>
        <li><b>出発時刻:</b> {formatTime(plan.departure_time)}</li>
        <li><b>到着日:</b> {formatDate(plan.arrival_date)}</li>
        <li><b>到着時刻:</b> {formatTime(plan.arrival_time)}</li>
        <li><b>移動手段:</b> {plan.transport}</li>
        <li><b>一日の予算:</b> {plan.daily_budget}</li>
        <li><b>総予算:</b> {plan.total_budget}</li>
      </ul>
      <h3>参加者一覧</h3>
      <ul>
        {participants.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <button onClick={handleGenerateInvite}>招待リンク発行</button>
      {inviteLink && (
        <div style={{ marginTop: 10 }}>
          <b>招待リンク:</b> <a href={inviteLink} target="_blank" rel="noopener noreferrer">{inviteLink}</a>
        </div>
      )}
      <Link
        to={`/plan/${plan.id}/edit`}
        state={{ initialPlan: plan }}
      >
        Edit Plan
      </Link>
      <button onClick={() => window.history.back()}>ダッシュボードに戻る</button>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}年${mm}月${dd}日`
}

function formatTime(timeStr) {
  if (!timeStr) return ''
  // すでにhh:mm形式ならそのまま
  if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr
  // ISO文字列の場合
  const d = new Date(`1970-01-01T${timeStr}`)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

export default PlanDetail;
