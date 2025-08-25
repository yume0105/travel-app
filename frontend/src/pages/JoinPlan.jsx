import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import Signup from './Signup'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
function JoinPlan({ user, onLogin }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [inviteInfo, setInviteInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [joined, setJoined] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  // 招待トークン取得
  const params = new URLSearchParams(location.search)
  const token = params.get('token')

  useEffect(() => {
    if (!token) {
      setError('招待トークンがありません')
      setLoading(false)
      return
    }
    axios.get(`${API_BASE_URL}/invite-info?token=${token}`)
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
      await axios.post(`${API_BASE_URL}/plans/join`, {
        token,
        user_id: user.id
      })
      setJoined(true)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setError('参加に失敗しました')
    }
  }

  // // ログイン直後に自動参加
  // useEffect(() => {
  //   if (user && showLogin && !joined && !loading && !error) {
  //     handleJoin()
  //   }
  //   // eslint-disable-next-line
  // }, [user])

  // // 新規登録完了時に自動参加
  // useEffect(() => {
  //   if (user && (showLogin || showSignup) && !joined && !loading && !error) {
  //     handleJoin()
  //   }
  // }, [user])

  // ログイン・新規登録直後に自動参加
  useEffect(() => {
    if (user && !joined && !loading && !error) {
      handleJoin()
    }
    // eslint-disable-next-line
  }, [user])

  if (loading) return <div>読み込み中...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (joined) return <div>参加が完了しました！ダッシュボードに移動します...</div>
  if (showLogin) return <Login onLogin={onLogin} />
  if (showSignup) return <Signup onSignup={onLogin} />

  return (
    <div style={{ padding: 20 }}>
      <h2>プラン参加</h2>
      <p>
        <b>プラン名:</b> {inviteInfo.plan_title}<br />
        <b>幹事:</b> {inviteInfo.organizer_name}
      </p>
      <button onClick={handleJoin}>このプランに参加する</button>
      <button onClick={() => setShowSignup(true)}>新規登録して参加</button>
    </div>
  )
}

export default JoinPlan