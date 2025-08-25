import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProfileEdit from './pages/ProfileEdit'
import CreatePlan from './pages/CreatePlan'
import PlanDetail from './pages/PlanDetail'
import JoinPlan from './pages/JoinPlan'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)
  // 編集対象プランのstate
  const [plan, setPlan] = useState(null)

// 例: <CreatePlan user={user} initialPlan={plan} onSave={handleEditPlan} />
  const handleLogin = (userData) => {
    setUser(userData)
  }

  // プラン作成処理
  const handleCreatePlan = async (planData) => {
    try {
      await axios.post('http://localhost:3000/plans', {
        organizer_id: user.id,
        title: planData.title,
        destination: planData.destination,
        departure: planData.departure,
        arrival: planData.arrival,
        departure_date: planData.departureDate,
        departure_time: planData.departureTime,
        arrival_date: planData.arrivalDate,
        arrival_time: planData.arrivalTime,
        transport: planData.transport,
        daily_budget: planData.dailyBudget,
        total_budget: planData.totalBudget
      })
      // 作成後の処理（例: ダッシュボードに遷移）
      alert('プラン作成完了！')
    } catch (err) {
      alert('プラン作成に失敗しました')
    }
  }

  const handleEditPlan = async (planData) => {
    try {
      await axios.put(`http://localhost:3000/plans/${planData.id}`, planData)
      // 編集後の処理（例: ダッシュボードに遷移など）
      alert('プラン編集完了！')
    } catch (err) {
      alert('プラン編集に失敗しました')
    }
  }

  // 新規登録後に呼ばれる
  const handleSignup = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/profile/edit" element={<ProfileEdit user={user} setUser={setUser} />} />
        <Route path="/plan/new" element={<CreatePlan user={user} onSave={handleCreatePlan} />} />
        <Route path="/plan/:id" element={<PlanDetail user={user} />} />
        <Route path="/plan/:id/edit" element={<CreatePlan user={user} onSave={handleEditPlan} />} />
        <Route path="/join" element={<JoinPlan user={user} onLogin={handleLogin} />} />
      </Routes>

      <Footer /> 
    </BrowserRouter>
  )
}

// function App() {
//   <Route path="/login" element={<Login onLogin={handleLogin} />} />
//   const [user, setUser] = useState(null)
//   const handleLogin = (userData) => {
//     setUser(userData)
//   }

//   const [page, setPage] = useState('login') // login / signup / dashboard / join
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [name, setName] = useState('')
//   // const [user, setUser] = useState(null)
//   const [plans, setPlans] = useState([])
//   const [title, setTitle] = useState('')
//   const [token, setToken] = useState('')
//   const [inviteLink, setInviteLink] = useState('')
//   const [selectedPlan, setSelectedPlan] = useState(null)
//   const [participants, setParticipants] = useState([])
//   const [inviteInfo, setInviteInfo] = useState(null)
//   const [crowdTolerance, setCrowdTolerance] = useState(3) // 初期値は3など
//   const [interests, setInterests] = useState([])
//   const [foodConditions, setFoodConditions] = useState('')
//   const [travelPace, setTravelPace] = useState('ゆったり')
//   const [language, setLanguage] = useState('ja')
//   // プロフィール編集用
//   const [editingProfile, setEditingProfile] = useState(false)
//   const [editCrowdTolerance, setEditCrowdTolerance] = useState(crowdTolerance)
//   const [editInterests, setEditInterests] = useState(interests)
//   const [editFoodConditions, setEditFoodConditions] = useState(foodConditions)
//   const [editTravelPace, setEditTravelPace] = useState(travelPace)
//   const [editLanguage, setEditLanguage] = useState(language)
//   const [creatingPlan, setCreatingPlan] = useState(false)
//   const [planName, setPlanName] = useState('')
//   const [departure, setDeparture] = useState('')
//   const [arrival, setArrival] = useState('')
//   const [departureDate, setDepartureDate] = useState('')
//   const [arrivalDate, setArrivalDate] = useState('')
//   const [departureTime, setDepartureTime] = useState('')
//   const [arrivalTime, setArrivalTime] = useState('')
//   const [transport, setTransport] = useState('公共交通')
//   const [dailyBudget, setDailyBudget] = useState('')
//   const [totalBudget, setTotalBudget] = useState('')
//   const [aiPlanResult, setAiPlanResult] = useState(null)
//   const [destination, setDestination] = useState('')

//   // プラン一時保存用
//   const [draftPlan, setDraftPlan] = useState(null)

//   // --- 1. 編集用stateをトップレベルで宣言 ---
//   const [planDetail, setPlanDetail] = useState(null)
//   const [editingPlan, setEditingPlan] = useState(false)
//   const [editPlan, setEditPlan] = useState(null)

//   // 興味カテゴリ一覧
//   const interestOptions = ["自然", "グルメ", "歴史", "ショッピング", "アクティビティ"]

//   // 招待リンクでアクセスした場合の情報取得
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search)
//     const inviteToken = params.get('token')
//     if (inviteToken) {
//       setToken(inviteToken)
//       setPage('invite')
//       // 招待トークンからプラン情報取得
//       axios.get(`http://localhost:3000/invite-info?token=${inviteToken}`)
//         .then(res => setInviteInfo(res.data))
//         .catch(() => setInviteInfo(null))
//     }
//   }, [])

//   // userがセットされたらプラン一覧取得
//   useEffect(() => {
//     if (user && user.id) {
//       fetchPlans(user.id)
//     }
//   }, [user])

//   // -------------------
//   // // サインアップ
//   // const handleSignup = async () => {
//   //   await axios.post('http://localhost:3000/signup', { name, email, password })
//   //   alert('ユーザー作成完了！ログインしてください')
//   //   setPage('login')
//   // }

//   // サインアップ
//   const handleSignup = async () => {
//     await axios.post('http://localhost:3000/signup', {
//       name, email, password,
//       crowd_tolerance: crowdTolerance,
//       interests,
//       food_conditions: foodConditions,
//       travel_pace: travelPace,
//       language
//     })
//     alert('ユーザー作成完了！ログインしてください')
//     setPage('login')
//   }


//   // -------------------
//   // ログイン
//   // const handleLogin = async () => {
//   //   const res = await axios.post('http://localhost:3000/login', { name, password })
//   //   setUser(res.data.user)
//   //   setPage('dashboard')
//   //   // fetchPlans(res.data.user.id)
//   // }

//   // パスワードリセット
//   const handleReset = async () => {
//     await axios.post('http://localhost:3000/reset-password', { email, newPassword: password })
//     alert('パスワード再設定が完了しました')
//     setPage('login')
//   }

//   // -------------------
//   // プラン作成（幹事）
//   const createPlan = async () => {
//     const res = await axios.post('http://localhost:3000/plans', {
//       organizer_id: user.id,
//       title,
//       start_date: '2025-08-25',
//       end_date: '2025-08-26',
//     })
//     alert('プラン作成完了！')
//     fetchPlans(user.id)
//   }

//   // プラン取得
//   // const fetchPlans = async (userId) => {
//   //   const res = await axios.get('http://localhost:3000/plans') // 後で userごとに絞る
//   //   setPlans(res.data)
//   // }

//   const fetchPlans = async (userId) => {
//     const res = await axios.get(`http://localhost:3000/user/${userId}/plans`)
//     setPlans(res.data)
//   }

//   // 招待リンク生成
//   const generateInvite = async (planId) => {
//     const res = await axios.post(`http://localhost:3000/plans/${planId}/invite`)
//     setInviteLink(`http://localhost:5173/join?token=${res.data.token}`)
//   }

//   // 招待リンクから参加
//   const joinPlan = async () => {
//     await axios.post('http://localhost:3000/plans/join', { token, user_id: user.id })
//     alert('参加完了！')
//   }

//   // 参加者取得
//   const fetchParticipants = async (planId) => {
//     const res = await axios.get(`http://localhost:3000/plans/${planId}/participants`)
//     setParticipants(res.data)
//     setSelectedPlan(planId)
//   }

//   // プロフィール編集保存
//   const handleProfileSave = async () => {
//     // ここはAPIが必要ですが、仮でstate更新のみ
//     setCrowdTolerance(editCrowdTolerance)
//     setInterests(editInterests)
//     setFoodConditions(editFoodConditions)
//     setTravelPace(editTravelPace)
//     setLanguage(editLanguage)
//     setEditingProfile(false)
//     alert('プロフィールを保存しました（API連携は別途実装）')
//   }

//   // プラン作成ボタン → フォームへ遷移
//   const handleStartCreatePlan = () => {
//     setCreatingPlan(true)
//     setPlanName(title)
//   }

//   // 日数計算と総予算自動計算
//   useEffect(() => {
//     if (departureDate && arrivalDate && dailyBudget) {
//       const start = new Date(departureDate)
//       const end = new Date(arrivalDate)
//       const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1)
//       setTotalBudget(String(days * Number(dailyBudget)))
//     }
//   }, [departureDate, arrivalDate, dailyBudget])

//   // プラン作成フォーム送信
//   const handleSubmitPlanForm = async () => {
//     const res = await axios.post('http://localhost:3000/ai/generate-plan', {
//       user: {
//         id: user.id,
//         name: user.name,
//         crowd_tolerance: crowdTolerance,
//         interests,
//         food_conditions: foodConditions,
//         travel_pace: travelPace,
//         language
//       },
//       plan: {
//         title: planName,
//         destination,
//         departure,
//         arrival,
//         departure_date: departureDate,
//         departure_time: departureTime,
//         arrival_date: arrivalDate,
//         arrival_time: arrivalTime,
//         transport,
//         daily_budget: dailyBudget,
//         total_budget: totalBudget
//       }
//     })
//     setAiPlanResult(res.data)
//     setCreatingPlan(false)
//     alert('AIプランが作成されました！')
//   }

//   // プラン作成フォーム一時保存
//   const handleSaveDraft = async () => {
//     const res = await axios.post('http://localhost:3000/plans/draft', {
//       organizer_id: user.id,
//       title: planName,
//       destination,
//       departure,
//       arrival,
//       departure_date: departureDate,
//       departure_time: departureTime,
//       arrival_date: arrivalDate,
//       arrival_time: arrivalTime,
//       transport,
//       daily_budget: dailyBudget,
//       total_budget: totalBudget
//     })
//     alert('一時保存しました')
//     setCreatingPlan(false)
//     fetchPlans(user.id)
//   }

//   // プラン一覧から詳細表示
//   const showPlanDetail = async (plan) => {
//     await fetchParticipants(plan.id)
//     setPlanDetail(plan)
//     setEditPlan({
//       title: plan.title ?? '',
//       destination: plan.destination ?? '',
//       departure: plan.departure ?? '',
//       arrival: plan.arrival ?? '',
//       departure_date: plan.departure_date ?? '',
//       departure_time: plan.departure_time ?? '',
//       arrival_date: plan.arrival_date ?? '',
//       arrival_time: plan.arrival_time ?? '',
//       transport: plan.transport ?? '',
//       daily_budget: plan.daily_budget ?? '',
//       total_budget: plan.total_budget ?? '',
//       status: plan.status ?? 'draft'
//     })
//     setEditingPlan(false)
//   }

//   // -------------------
//   // ページ遷移
//   //if (page === 'login')
//   //  return (
//   //    <div style={{ padding: 20 }}>
//   //      <h2>ログイン</h2>
//   //      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//   //      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//   ///     <button onClick={handleLogin}>ログイン</button>
//   //      <p onClick={() => setPage('signup')}>新規登録はこちら</p>
//   //    </div>
//   //  )

//   if (page === 'login')
//     return (
//       <div style={{ padding: 20 }}>
//         <h2>ログイン</h2>
//         <input placeholder="ユーザー名" value={name} onChange={e => setName(e.target.value)} />
//         <input placeholder="パスワード" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//         <button onClick={handleLogin}>ログイン</button>
//         <p onClick={() => setPage('signup')}>新規登録はこちら</p>
//         <p onClick={() => setPage('reset')}>パスワードを忘れた方はこちら</p>
//       </div>
//     )

//   //if (page === 'signup')
//   //  return (
//   //    <div style={{ padding: 20 }}>
//   //      <h2>サインアップ</h2>
//   //      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//   //      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//   //      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//   //      <button onClick={handleSignup}>登録</button>
//   //      <p onClick={() => setPage('login')}>ログインはこちら</p>
//   //    </div>
//   //  )

//   if (page === 'signup')
//     return (
//       <div style={{ padding: 20, maxWidth: 400 }}>
//         <h2>サインアップ</h2>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>ユーザー名</b><br />
//               <span style={{ fontSize: 12, color: '#555' }}>表示名として使われます</span><br />
//               <input value={name} onChange={e => setName(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>Email（任意）</b><br />
//               <span style={{ fontSize: 12, color: '#555' }}>パスワード再設定時に必要です</span><br />
//               <input value={email} onChange={e => setEmail(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>パスワード</b><br />
//               <span style={{ fontSize: 12, color: '#555' }}>8文字以上推奨</span><br />
//               <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>人混み耐性（1〜5）</b><br />
//               <span style={{ fontSize: 12, color: '#555' }}>混雑した場所が苦手な方は低めに</span><br />
//               <input type="number" min="1" max="5" value={crowdTolerance} onChange={e => setCrowdTolerance(Number(e.target.value))} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <b>興味カテゴリ（複数選択可）</b><br />
//             <span style={{ fontSize: 12, color: '#555' }}>好きなジャンルを選んでください</span><br />
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
//               {interestOptions.map(opt => (
//                 <button
//                   key={opt}
//                   type="button"
//                   style={{
//                     padding: '4px 12px',
//                     borderRadius: 16,
//                     border: interests.includes(opt) ? '2px solid #007bff' : '1px solid #ccc',
//                     background: interests.includes(opt) ? '#e3f2fd' : '#fff',
//                     cursor: 'pointer'
//                   }}
//                   onClick={() =>
//                     setInterests(
//                       interests.includes(opt)
//                         ? interests.filter(i => i !== opt)
//                         : [...interests, opt]
//                     )
//                   }
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </div>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>食事条件</b><br />
//               <span style={{ fontSize: 12, color: '#555' }}>アレルギーやベジタリアン等</span><br />
//               <input value={foodConditions} onChange={e => setFoodConditions(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>旅行ペース</b><br />
//               <span style={{ fontSize: 12, color: '#555' }}>ゆったり or アクティブ</span><br />
//               <select value={travelPace} onChange={e => setTravelPace(e.target.value)}>
//                 <option value="ゆったり">ゆったり</option>
//                 <option value="アクティブ">アクティブ</option>
//               </select>
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>言語設定</b><br />
//               <span style={{ fontSize: 12, color: '#555' }}>表示言語</span><br />
//               <select value={language} onChange={e => setLanguage(e.target.value)}>
//                 <option value="ja">日本語</option>
//                 <option value="en">英語</option>
//               </select>
//             </label>
//           </li>
//         </ul>
//         <button onClick={handleSignup}>登録</button>
//         <p onClick={() => setPage('login')}>ログインはこちら</p>
//       </div>
//     )

//   // ダッシュボードでプロフィール表示・編集
//   if (page === 'dashboard' && !creatingPlan) {
//     return (
//       <div style={{ padding: 20 }}>
//         <h2>ダッシュボード ({user.name})</h2>
//         <h3>プロフィール</h3>
//         {!editingProfile ? (
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             <li><b>人混み耐性:</b> {user.crowd_tolerance ?? '未設定'}</li>
//             <li>
//               <b>興味カテゴリ:</b> {
//                 Array.isArray(user.interests) && user.interests.length > 0
//                   ? user.interests.join(', ')
//                   : (typeof user.interests === 'string' && user.interests ? user.interests : '未設定')
//               }
//             </li>
//             <li><b>食事条件:</b> {user.food_conditions ?? '未設定'}</li>
//             <li><b>旅行ペース:</b> {user.travel_pace ?? '未設定'}</li>
//             <li><b>言語設定:</b> {user.language === 'ja' ? '日本語' : user.language === 'en' ? '英語' : '未設定'}</li>
//           </ul>
//         ) : (
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             <li style={{ marginBottom: 16 }}>
//               <label>
//                 <b>人混み耐性（1〜5）</b><br />
//                 <input type="number" min="1" max="5" value={editCrowdTolerance} onChange={e => setEditCrowdTolerance(Number(e.target.value))} />
//               </label>
//             </li>
//             <li style={{ marginBottom: 16 }}>
//               <b>興味カテゴリ（複数選択可）</b><br />
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
//                 {interestOptions.map(opt => (
//                   <button
//                     key={opt}
//                     type="button"
//                     style={{
//                       padding: '4px 12px',
//                       borderRadius: 16,
//                       border: editInterests.includes(opt) ? '2px solid #007bff' : '1px solid #ccc',
//                       background: editInterests.includes(opt) ? '#e3f2fd' : '#fff',
//                       cursor: 'pointer'
//                     }}
//                     onClick={() =>
//                       setEditInterests(
//                         editInterests.includes(opt)
//                           ? editInterests.filter(i => i !== opt)
//                           : [...editInterests, opt]
//                       )
//                     }
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             </li>
//             <li style={{ marginBottom: 16 }}>
//               <label>
//                 <b>食事条件</b><br />
//                 <input value={editFoodConditions} onChange={e => setEditFoodConditions(e.target.value)} />
//               </label>
//             </li>
//             <li style={{ marginBottom: 16 }}>
//               <label>
//                 <b>旅行ペース</b><br />
//                 <select value={editTravelPace} onChange={e => setEditTravelPace(e.target.value)}>
//                   <option value="ゆったり">ゆったり</option>
//                   <option value="アクティブ">アクティブ</option>
//                 </select>
//               </label>
//             </li>
//             <li style={{ marginBottom: 16 }}>
//               <label>
//                 <b>言語設定</b><br />
//                 <select value={editLanguage} onChange={e => setEditLanguage(e.target.value)}>
//                   <option value="ja">日本語</option>
//                   <option value="en">英語</option>
//                 </select>
//               </label>
//             </li>
//           </ul>
//         )}
//         <button onClick={() => {
//           if (editingProfile) {
//             handleProfileSave()
//           } else {
//             setEditingProfile(true)
//             setEditCrowdTolerance(user.crowd_tolerance ?? 3)
//             setEditInterests(user.interests ?? [])
//             setEditFoodConditions(user.food_conditions ?? '')
//             setEditTravelPace(user.travel_pace ?? 'ゆったり')
//             setEditLanguage(user.language ?? 'ja')
//           }
//         }}>
//           {editingProfile ? '保存' : '編集'}
//         </button>

//         <h3>プラン作成（幹事）</h3>
//         <input placeholder="プラン名" value={title} onChange={e => setTitle(e.target.value)} />
//         <button onClick={handleStartCreatePlan}>作成</button>

//         <h3>自分のプラン一覧</h3>
//         <ul>
//           {plans.map(plan => (
//             <li key={plan.id}>
//               {plan.title} {plan.status === 'draft' && <span style={{color:'orange'}}>（一時保存）</span>}
//               <button onClick={() => generateInvite(plan.id)}>招待リンク生成</button>
//               <button onClick={() => fetchParticipants(plan.id)}>参加者を見る</button>
//               <button onClick={() => {
//                 // プラン作成フォームに遷移し、編集用stateをセット
//                 setCreatingPlan(true)
//                 setPlanName(plan.title ?? '')
//                 setDestination(plan.destination ?? '')
//                 setDeparture(plan.departure ?? '')
//                 setArrival(plan.arrival ?? '')
//                 setDepartureDate(plan.departure_date ?? '')
//                 setDepartureTime(plan.departure_time ?? '')
//                 setArrivalDate(plan.arrival_date ?? '')
//                 setArrivalTime(plan.arrival_time ?? '')
//                 setTransport(plan.transport ?? '公共交通')
//                 setDailyBudget(plan.daily_budget ?? '')
//                 setTotalBudget(plan.total_budget ?? '')
//               }}>詳細</button>
//             </li>
//           ))}
//         </ul>
//         {inviteLink && <p>招待リンク: {inviteLink}</p>}
//       </div>
//     )
//   }

//   // プラン作成フォーム
//   if (creatingPlan) {
//     return (
//       <div style={{ padding: 20, maxWidth: 400 }}>
//         <h2>プラン作成フォーム</h2>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>プラン名</b><br />
//               <input value={planName} onChange={e => setPlanName(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>目的地</b><br />
//               <input value={destination} onChange={e => setDestination(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>出発地</b><br />
//               <input value={departure} onChange={e => setDeparture(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>帰宅地</b><br />
//               <input value={arrival} onChange={e => setArrival(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>出発日時</b><br />
//               <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
//               <input type="time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>帰宅日時</b><br />
//               <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} />
//               <input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>移動手段の希望</b><br />
//               <select value={transport} onChange={e => setTransport(e.target.value)}>
//                 <option value="徒歩">徒歩</option>
//                 <option value="公共交通">公共交通</option>
//                 <option value="車">車</option>
//               </select>
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>一日の予算</b><br />
//               <input type="number" min="0" value={dailyBudget} onChange={e => setDailyBudget(e.target.value)} />
//             </label>
//           </li>
//           <li style={{ marginBottom: 16 }}>
//             <label>
//               <b>総予算（自動計算）</b><br />
//               <input type="number" min="0" value={totalBudget} readOnly />
//               <span style={{ fontSize: 12, color: '#555' }}>
//                 出発日と帰宅日から日数を計算し、一日の予算×日数で自動算出されます
//               </span>
//             </label>
//           </li>
//         </ul>
//         <button onClick={handleSubmitPlanForm}>AIにプラン作成を依頼</button>
//         <button onClick={handleSaveDraft}>一時保存</button>
//         <button onClick={() => setCreatingPlan(false)}>キャンセル</button>
//         <button onClick={() => { setCreatingPlan(false); setPage('dashboard'); }}>ダッシュボードに戻る</button>
//         {draftPlan && (
//           <div style={{ marginTop: 20, background: '#f9f9f9', padding: 10, borderRadius: 8 }}>
//             <b>一時保存内容:</b>
//             <ul>
//               <li>プラン名: {draftPlan.planName}</li>
//               <li>目的地: {draftPlan.destination}</li>
//               <li>出発地: {draftPlan.departure}</li>
//               <li>帰宅地: {draftPlan.arrival}</li>
//               <li>出発日時: {draftPlan.departureDate} {draftPlan.departureTime}</li>
//               <li>帰宅日時: {draftPlan.arrivalDate} {draftPlan.arrivalTime}</li>
//               <li>移動手段: {draftPlan.transport}</li>
//               <li>一日の予算: {draftPlan.dailyBudget}</li>
//               <li>総予算: {draftPlan.totalBudget}</li>
//             </ul>
//           </div>
//         )}
//       </div>
//     )
//   }

//   // プラン詳細＋編集＋参加者表示
//   if (planDetail) {
//     // 編集保存
//     const handleSavePlanEdit = async () => {
//       const res = await axios.post(`http://localhost:3000/plans/${planDetail.id}/edit`, editPlan)
//       alert('プランを保存しました')
//       setEditingPlan(false)
//       fetchPlans(user.id)
//       setPlanDetail(res.data) // ← 編集後の最新データで更新
//     }

//     return (
//       <div style={{ padding: 20 }}>
//         <h2>プラン詳細</h2>
//         {!editingPlan ? (
//           <ul>
//             <li><b>プラン名:</b> {planDetail.title}</li>
//             <li><b>目的地:</b> {planDetail.destination}</li>
//             <li><b>出発地:</b> {planDetail.departure}</li>
//             <li><b>帰宅地:</b> {planDetail.arrival}</li>
//             <li><b>出発日時:</b> {planDetail.departure_date} {planDetail.departure_time}</li>
//             <li><b>帰宅日時:</b> {planDetail.arrival_date} {planDetail.arrival_time}</li>
//             <li><b>移動手段:</b> {planDetail.transport}</li>
//             <li><b>一日の予算:</b> {planDetail.daily_budget}</li>
//             <li><b>総予算:</b> {planDetail.total_budget}</li>
//           </ul>
//         ) : (
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             <li><b>プラン名:</b> <input value={editPlan.title} onChange={e => setEditPlan({ ...editPlan, title: e.target.value })} /></li>
//             <li><b>目的地:</b> <input value={editPlan.destination} onChange={e => setEditPlan({ ...editPlan, destination: e.target.value })} /></li>
//             <li><b>出発地:</b> <input value={editPlan.departure} onChange={e => setEditPlan({ ...editPlan, departure: e.target.value })} /></li>
//             <li><b>帰宅地:</b> <input value={editPlan.arrival} onChange={e => setEditPlan({ ...editPlan, arrival: e.target.value })} /></li>
//             <li>
//               <b>出発日時:</b>
//               <input type="date" value={editPlan.departure_date} onChange={e => setEditPlan({ ...editPlan, departure_date: e.target.value })} />
//               <input type="time" value={editPlan.departure_time} onChange={e => setEditPlan({ ...editPlan, departure_time: e.target.value })} />
//             </li>
//             <li>
//               <b>帰宅日時:</b>
//               <input type="date" value={editPlan.arrival_date} onChange={e => setEditPlan({ ...editPlan, arrival_date: e.target.value })} />
//               <input type="time" value={editPlan.arrival_time} onChange={e => setEditPlan({ ...editPlan, arrival_time: e.target.value })} />
//             </li>
//             <li>
//               <b>移動手段:</b>
//               <select value={editPlan.transport} onChange={e => setEditPlan({ ...editPlan, transport: e.target.value })}>
//                 <option value="徒歩">徒歩</option>
//                 <option value="公共交通">公共交通</option>
//                 <option value="車">車</option>
//               </select>
//             </li>
//             <li>
//               <b>一日の予算:</b>
//               <input type="number" value={editPlan.daily_budget} onChange={e => setEditPlan({ ...editPlan, daily_budget: e.target.value })} />
//             </li>
//             <li>
//               <b>総予算:</b>
//               <input type="number" value={editPlan.total_budget} onChange={e => setEditPlan({ ...editPlan, total_budget: e.target.value })} />
//             </li>
//           </ul>
//         )}
//         <h3>参加者一覧</h3>
//         <ul>
//           {participants.map(p => (
//             <li key={p.id}>{p.name}</li>
//           ))}
//         </ul>
//         <button onClick={() => setEditingPlan(!editingPlan)}>
//           {editingPlan ? '編集をやめる' : '編集する'}
//         </button>
//         {editingPlan && (
//           <button onClick={handleSavePlanEdit}>保存</button>
//         )}
//         <button onClick={() => setPlanDetail(null)}>ダッシュボードに戻る</button>
//       </div>
//     )
//   }
// }

export default App
