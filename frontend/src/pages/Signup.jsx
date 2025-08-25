// 新規登録画面
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
const API_BASE_URL = import.meta.env.REACT_APP_API_URL
function Signup({ onSignup }) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [crowdTolerance, setCrowdTolerance] = useState(3) // 初期値は3など
    const [interests, setInterests] = useState([])
    const [foodConditions, setFoodConditions] = useState('')
    const [travelPace, setTravelPace] = useState('ゆったり')
    const [language, setLanguage] = useState('ja')

    const interestOptions = [
        '自然',
        'アクティビティ',
        '観光',
        'グルメ',
        'ショッピング',
        '歴史',
        'アート',
        '温泉',
        'アウトドア'
    ]

    const handleSignup = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/signup`, {
                name,
                email,
                password,
                crowd_tolerance: crowdTolerance,
                interests,
                food_conditions: foodConditions,
                travel_pace: travelPace,
                language
            })
            const userData = res.data.user
            onSignup(userData)
            navigate('/dashboard')
        } catch (error) {
            console.error('Signup error:', error)
            alert('ユーザー作成に失敗しました')
        }
    }

    return (
      <div style={{ padding: 20, maxWidth: 400 }}>
        <h2>サインアップ</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>ユーザー名</b><br />
              <span style={{ fontSize: 12, color: '#555' }}>表示名として使われます</span><br />
              <input value={name} onChange={e => setName(e.target.value)} />
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>Email（任意）</b><br />
              <span style={{ fontSize: 12, color: '#555' }}>パスワード再設定時に必要です</span><br />
              <input value={email} onChange={e => setEmail(e.target.value)} />
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>パスワード</b><br />
              <span style={{ fontSize: 12, color: '#555' }}>8文字以上推奨</span><br />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>人混み耐性（1〜5）</b><br />
              <span style={{ fontSize: 12, color: '#555' }}>混雑した場所が苦手な方は低めに</span><br />
              <input type="number" min="1" max="5" value={crowdTolerance} onChange={e => setCrowdTolerance(Number(e.target.value))} />
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <b>興味カテゴリ（複数選択可）</b><br />
            <span style={{ fontSize: 12, color: '#555' }}>好きなジャンルを選んでください</span><br />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {interestOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  style={{
                    padding: '4px 12px',
                    borderRadius: 16,
                    border: interests.includes(opt) ? '2px solid #007bff' : '1px solid #ccc',
                    background: interests.includes(opt) ? '#e3f2fd' : '#fff',
                    cursor: 'pointer'
                  }}
                  onClick={() =>
                    setInterests(
                      interests.includes(opt)
                        ? interests.filter(i => i !== opt)
                        : [...interests, opt]
                    )
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          </li>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>食事条件</b><br />
              <span style={{ fontSize: 12, color: '#555' }}>アレルギーやベジタリアン等</span><br />
              <input value={foodConditions} onChange={e => setFoodConditions(e.target.value)} />
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>旅行ペース</b><br />
              <span style={{ fontSize: 12, color: '#555' }}>ゆったり or アクティブ</span><br />
              <select value={travelPace} onChange={e => setTravelPace(e.target.value)}>
                <option value="ゆったり">ゆったり</option>
                <option value="アクティブ">アクティブ</option>
              </select>
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>言語設定</b><br />
              <span style={{ fontSize: 12, color: '#555' }}>表示言語</span><br />
              <select value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="ja">日本語</option>
                <option value="en">英語</option>
              </select>
            </label>
          </li>
        </ul>
        <button onClick={handleSignup}>登録</button>
        <p><Link to="/login">ログインはこちら</Link></p>
      </div>
    )
}

export default Signup;
