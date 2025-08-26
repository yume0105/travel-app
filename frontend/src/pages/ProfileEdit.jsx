// プロフィール編集画面
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
function ProfileEdit({ user, setUser }) {
    const navigate = useNavigate()
    const [name, setName] = useState(user.name || '')
    const [email, setEmail] = useState(user.email || '')
    const [crowdTolerance, setCrowdTolerance] = useState(user.crowd_tolerance || 3)
    const [interests, setInterests] = useState(user.interests ?? [])
    const [foodConditions, setFoodConditions] = useState(user.food_conditions || '')
    const [travelPace, setTravelPace] = useState(user.travel_pace || 'ゆったり')
    const [language, setLanguage] = useState(user.language || 'ja')

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

    const handleSaveProfile = async () => {
        try {
            const res = await axios.put(`${API_BASE_URL}/users/${user.id}`, {
                name, email, crowd_tolerance: crowdTolerance,
                interests, food_conditions: foodConditions,
                travel_pace: travelPace, language
            })
            setUser(res.data)
            alert('プロフィールを更新しました')
            navigate('/dashboard')
        } catch (error) {
            console.error('Profile update error:', error)
            alert('プロフィールの更新に失敗しました')
        }
    }

    return (
      <div style={{ padding: 20 }}>
        <h2>プロフィール編集</h2>
        <label>
          <b>ユーザー名</b><br />
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          <b>Email（任意）</b><br />
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          <b>人混み耐性（1〜5）</b><br />
          <span style={{ fontSize: 12, color: '#555' }}>混雑した場所が苦手な方は低めに</span><br />
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {[1,2,3,4,5].map(num => (
              <label key={num} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  name="crowdTolerance"
                  value={num}
                  checked={crowdTolerance === num}
                  onChange={() => setCrowdTolerance(num)}
                />
                {num}
              </label>
            ))}
          </div>
        </label>
        <br />
        <label>
            <b>興味カテゴリ（複数選択可）</b><br />
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
        </label>
        <br />
        <label>
          <b>食事条件</b><br />
          <input value={foodConditions} onChange={e => setFoodConditions(e.target.value)} />
        </label>
        <br />
        <label>
          <b>旅行ペース</b><br />
          <select value={travelPace} onChange={e => setTravelPace(e.target.value)}>
            <option value="ゆったり">ゆったり</option>
            <option value="アクティブ">アクティブ</option>
          </select>
        </label>
        <br />
        <label>
          <b>言語設定</b><br />
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="ja">日本語</option>
            <option value="en">英語</option>
          </select>
        </label>
        <br />
        <button onClick={handleSaveProfile}>保存</button>
      </div>
    )
}

export default ProfileEdit;