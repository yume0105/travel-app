import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const params = new URLSearchParams(useLocation().search)
  const token = params.get('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      axios.get(`${API_BASE_URL}/reset-password/email?token=${token}`)
        .then(res => setEmail(res.data.email))
        .catch(() => setEmail(''))
    }
  }, [token])

  const handleReset = async () => {
    try {
      await axios.post(`${API_BASE_URL}/reset-password`, { token, newPassword })
      setMessage('パスワードを再設定しました')
    } catch (err) {
      setMessage('再設定に失敗しました')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>新しいパスワード設定</h2>
      <div style={{ marginBottom: 12 }}>
        <b>登録メールアドレス:</b> {email ? email : '取得できませんでした'}
      </div>
      <input
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        placeholder="新しいパスワード"
      />
      <button onClick={handleReset} style={{ marginLeft: 8 }}>再設定</button>
      <div>{message}</div>
      <p>
        <button onClick={() => navigate('/')}>ログインはこちら</button>
      </p>
    </div>
  )
}

export default ResetPassword