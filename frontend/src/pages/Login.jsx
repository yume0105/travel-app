// ログイン画面
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLoginClick = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', { name, password })
      onLogin(res.data.user) // App.jsxのsetUserなどを呼ぶ
      navigate('/dashboard')
    } catch (err) {
      alert('ログイン失敗')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>ログイン</h2>
      <input placeholder="ユーザー名" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="パスワード" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLoginClick}>ログイン</button>
      <p><Link to="/signup">新規登録はこちら</Link></p>
      <p><Link to="/reset">パスワードを忘れた方はこちら</Link></p>
    </div>
  )
}

export default Login;