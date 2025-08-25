// ログイン画面
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLoginClick = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, { name, password })
      onLogin(res.data.user)
      navigate('/dashboard')
    } catch (err) {
      console.error('ログイン失敗:', err)
      if (err.response) {
        // サーバーからのエラーレスポンス内容を表示
        alert(`ログイン失敗: ${err.response.data?.error || err.response.statusText}`)
      } else {
        alert('ログイン失敗: ネットワークエラー')
      }
    }
  }

  return (
    <div style={{ padding: 20 }}>
      {/* <h3>ログイン</h3> */}
      <input placeholder="ユーザー名" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="パスワード" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLoginClick}>ログイン</button>
      <p><Link to="/signup">新規登録はこちら</Link></p>
      <p><Link to="/reset">パスワードを忘れた方はこちら</Link></p>
    </div>
  )
}

export default Login;