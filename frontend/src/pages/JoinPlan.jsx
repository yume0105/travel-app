import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'

function JoinPlan({ user, onLogin }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [inviteInfo, setInviteInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [joined, setJoined] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  // 招待トークン取得
  const params = new URLSearchParams(location.search)
  const token = params.get('token')

  useEffect(() => {
    if (!token) {
      setError('招待トークンがありません')
      setLoading(false)
      return
    }
    axios.get(`http://localhost:3000/invite-info?token=${token}`)
      .then(res => {
        setInviteInfo(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('招待情報が見つかりません')
        setLoading(false)
      })
  }, [token])

  const handleJoin = async () => {
    if (!user) {
      setShowLogin(true)
      return
    }
    try {
      await axios.post('http://localhost:3000/plans/join', {
        token,
        user_id: user.id
      })
      setJoined(true)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setError('参加に失敗しました')
    }
  }

  if (loading) return <div>読み込み中...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (joined) return <div>参加が完了しました！ダッシュボードに移動します...</div>
  if (showLogin) return <Login onLogin={onLogin} />

  return (
    <div style={{ padding: 20 }}>
      <h2>プラン参加</h2>
      <p>
        <b>プラン名:</b> {inviteInfo.plan_title}<br />
        <b>幹事:</b> {inviteInfo.organizer_name}
      </p>
      <button onClick={handleJoin}>このプランに参加する</button>
    </div>
  )
}

export default JoinPlan