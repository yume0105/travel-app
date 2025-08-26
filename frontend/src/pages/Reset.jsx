import { useState } from 'react'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// メールアドレス入力画面
function Reset() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleRequestReset = async () => {
    try {
      await axios.post(`${API_BASE_URL}/request-reset`, { email })
      setMessage('再設定メールを送信しました')
    } catch (err) {
      setMessage('メール送信に失敗しました')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>パスワード再設定申請</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="登録メールアドレス" />
      <button onClick={handleRequestReset}>送信</button>
      <div>{message}</div>
    </div>
  )
}

export default Reset
