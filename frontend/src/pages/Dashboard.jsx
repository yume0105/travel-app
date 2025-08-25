// ログイン後のダッシュボード画面
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function Dashboard({ user }) {
  if (!user) {
    return <div>ユーザー情報を取得中...</div>;
  }

  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [title, setTitle] = useState('')
  const [inviteLink, setInviteLink] = useState('')
  const [crowdTolerance, setCrowdTolerance] = useState(3) // 初期値は3など
  const [interests, setInterests] = useState([])
  const [foodConditions, setFoodConditions] = useState('')
  const [travelPace, setTravelPace] = useState('ゆったり')
  const [language, setLanguage] = useState('ja')
  const [editingProfile, setEditingProfile] = useState(false)
  const [editCrowdTolerance, setEditCrowdTolerance] = useState(crowdTolerance)
  const [editInterests, setEditInterests] = useState(interests)
  const [editFoodConditions, setEditFoodConditions] = useState(foodConditions)
  const [editTravelPace, setEditTravelPace] = useState(travelPace)
  const [editLanguage, setEditLanguage] = useState(language)
  const [creatingPlan, setCreatingPlan] = useState(false)
  const [planName, setPlanName] = useState('')

  // プラン作成ボタン → フォームへ遷移
  const handleStartCreatePlan = () => {
    navigate('/plan/new', { state: { title } })
  }

  useEffect(() => {
    if (user?.id) {
      axios.get(`${API_BASE_URL}/users/${user.id}/plans`)
        .then(res => setPlans(res.data))
        .catch(err => console.error('API fetch error:', err))
    }
  }, [user])
  
  return (
    <div style={{ padding: 20 }}>
      <h2>ダッシュボード ({user.name})</h2>
      <h3>プロフィール</h3>
      {!editingProfile ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><b>人混み耐性:</b> {user.crowd_tolerance ?? '未設定'}</li>
          <li>
            <b>興味カテゴリ:</b> {
              Array.isArray(user.interests) && user.interests.length > 0
                ? user.interests.join(', ')
                : (typeof user.interests === 'string' && user.interests ? user.interests : '未設定')
            }
          </li>
          <li><b>食事条件:</b> {user.food_conditions ?? '未設定'}</li>
          <li><b>旅行ペース:</b> {user.travel_pace ?? '未設定'}</li>
          <li><b>言語設定:</b> {user.language === 'ja' ? '日本語' : user.language === 'en' ? '英語' : '未設定'}</li>
        </ul>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>人混み耐性（1〜5）</b><br />
              <input type="number" min="1" max="5" value={editCrowdTolerance} onChange={e => setEditCrowdTolerance(Number(e.target.value))} />
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <b>興味カテゴリ（複数選択可）</b><br />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {interestOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  style={{
                    padding: '4px 12px',
                    borderRadius: 16,
                    border: editInterests.includes(opt) ? '2px solid #007bff' : '1px solid #ccc',
                    background: editInterests.includes(opt) ? '#e3f2fd' : '#fff',
                    cursor: 'pointer'
                  }}
                  onClick={() =>
                    setEditInterests(
                      editInterests.includes(opt)
                        ? editInterests.filter(i => i !== opt)
                        : [...editInterests, opt]
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
              <input value={editFoodConditions} onChange={e => setEditFoodConditions(e.target.value)} />
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>旅行ペース</b><br />
              <select value={editTravelPace} onChange={e => setEditTravelPace(e.target.value)}>
                <option value="ゆったり">ゆったり</option>
                <option value="アクティブ">アクティブ</option>
              </select>
            </label>
          </li>
          <li style={{ marginBottom: 16 }}>
            <label>
              <b>言語設定</b><br />
              <select value={editLanguage} onChange={e => setEditLanguage(e.target.value)}>
                <option value="ja">日本語</option>
                <option value="en">英語</option>
              </select>
            </label>
          </li>
        </ul>
      )}
      <button onClick={() => navigate('/profile/edit')}>プロフィール編集</button>
      {/* <button onClick={() => {
        if (editingProfile) {
          handleProfileSave()
        } else {
          setEditingProfile(true)
          setEditCrowdTolerance(user.crowd_tolerance ?? 3)
          setEditInterests(user.interests ?? [])
          setEditFoodConditions(user.food_conditions ?? '')
          setEditTravelPace(user.travel_pace ?? 'ゆったり')
          setEditLanguage(user.language ?? 'ja')
        }
      }}>
        {editingProfile ? '保存' : '編集'}
      </button> */}

      <h3>プラン作成（幹事）</h3>
      <input placeholder="プラン名" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleStartCreatePlan}>作成</button>

      <h3>自分のプラン一覧</h3>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>
            {plan.title} 
            {/* {plan.status === 'draft' && <span style={{color:'orange'}}>（一時保存）</span>} */}
            {/*<button onClick={() => generateInvite(plan.id)}>招待リンク生成</button>*/}
            {/*<button onClick={() => fetchParticipants(plan.id)}>参加者を見る</button>*/}
            {/* <button onClick={() => {
              // プラン作成フォームに遷移し、編集用stateをセット
              setCreatingPlan(true)
              setPlanName(plan.title ?? '')
              setDestination(plan.destination ?? '')
              setDeparture(plan.departure ?? '')
              setArrival(plan.arrival ?? '')
              setDepartureDate(plan.departure_date ?? '')
              setDepartureTime(plan.departure_time ?? '')
              setArrivalDate(plan.arrival_date ?? '')
              setArrivalTime(plan.arrival_time ?? '')
              setTransport(plan.transport ?? '公共交通')
              setDailyBudget(plan.daily_budget ?? '')
              setTotalBudget(plan.total_budget ?? '')
            }}>詳細</button> */}
            <button onClick={() => navigate(`/plan/${plan.id}`)}>詳細</button>
          </li>
        ))}
      </ul>
      {inviteLink && <p>招待リンク: {inviteLink}</p>}
    </div>
  )
}

export default Dashboard;