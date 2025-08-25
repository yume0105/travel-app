// プラン詳細画面
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const frontendUrl = process.env.VITE_FRONTEND_URL || 'http://localhost:5173'

function PlanDetail({ user }) {
  const { id } = useParams()
  const [plan, setPlan] = useState(null)
  const [participants, setParticipants] = useState([])
  const [inviteLink, setInviteLink] = useState('')
  const [aiPlan, setAiPlan] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiHistory, setAiHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API_BASE_URL}/plans/${id}`)
      .then(res => setPlan(res.data))
      .catch(err => {
        console.error(err)
        navigate('/404')
      })
    axios.get(`${API_BASE_URL}/plans/${id}/participants`)
      .then(res => setParticipants(res.data))
    // AI提案履歴を取得
    axios.get(`${API_BASE_URL}/ai/plan-results?plan_id=${id}`)
      .then(res => setAiHistory(res.data))
  }, [id, navigate])

  const handleGenerateInvite = async () => {
    const res = await axios.post(`${API_BASE_URL}/plans/${id}/invite`)
    setInviteLink(`${frontendUrl}/join?token=${res.data.token}`)
  }

  // AIプラン生成＆DB保存
  const handleAiPlan = async () => {
    if (!user || !user.id) {
      alert('AIプラン生成にはログインが必要です')
      setAiLoading(false)
      return
    }
    setAiLoading(true)
    try {
      // 参加者の詳細情報を取得
      const usersRes = await axios.get(`${API_BASE_URL}/users`)
      const participantInfos = usersRes.data.filter(u => participants.some(p => p.id === u.id))
      // Gemini APIへリクエスト（user.idも渡す）
      const res = await axios.post(`${API_BASE_URL}/ai/generate-plan`, {
        participants: participantInfos,
        plan,
        user_id: user.id
      })
      setAiPlan(res.data)
    } catch (err) {
      console.log(err)
      alert('AIプラン生成に失敗しました')
    }
    setAiLoading(false)
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
      <hr />
      <button onClick={handleAiPlan} disabled={aiLoading}>
        {aiLoading ? 'AIプラン生成中...' : 'AIにプラン生成を依頼'}
      </button>
      {aiPlan && (
        <div style={{ marginTop: 20, background: '#f9f9f9', padding: 10, borderRadius: 8 }}>
          <h3>Geminiによる旅行プラン提案</h3>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.1em', lineHeight: '1.7' }}>
            {aiPlan.aiPlan}
          </div>
        </div>
      )}
      {/* AI提案履歴表示 */}
      <hr />
      <h3>過去のAIプラン提案</h3>
      {aiHistory.length === 0 && <div>まだAI提案はありません。</div>}
      {aiHistory.map((item, idx) => (
        <div key={item.id} style={{ margin: '16px 0', background: '#f4f4f4', padding: 8, borderRadius: 6 }}>
          <div style={{ fontSize: 12, color: '#888' }}>
            提案者: ユーザーID {item.user_id} / {new Date(item.created_at).toLocaleString()}
          </div>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: 4 }}>
            {item.gemini_result}
          </div>
        </div>
      ))}
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
  if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr
  const d = new Date(`1970-01-01T${timeStr}`)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

export default PlanDetail;
