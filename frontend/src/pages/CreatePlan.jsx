// プラン作成フォーム
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function CreatePlan({ user, onSave }) {
  const location = useLocation()
  const initialPlan = location.state?.initialPlan || {}
  const [title, setTitle] = useState(initialPlan.title || '')
  const [destination, setDestination] = useState(initialPlan.destination || '')
  const [departure, setDeparture] = useState(initialPlan.departure || '')
  const [arrival, setArrival] = useState(initialPlan.arrival || '')
  const [departureDate, setDepartureDate] = useState(toDateInputFormat(initialPlan.departure_date))
  const [departureTime, setDepartureTime] = useState(initialPlan.departure_time || '')
  const [arrivalDate, setArrivalDate] = useState(toDateInputFormat(initialPlan.arrival_date))
  const [arrivalTime, setArrivalTime] = useState(initialPlan.arrival_time || '')
  const [transport, setTransport] = useState(initialPlan.transport || '公共交通')
  const [dailyBudget, setDailyBudget] = useState(initialPlan.daily_budget || '')
  const [totalBudget, setTotalBudget] = useState(initialPlan.total_budget || '')
  const navigate = useNavigate()

  const handleSubmit = async () => {
      await onSave({
          title,
          destination,
          departure,
          arrival,
          departureDate,
          departureTime,
          arrivalDate,
          arrivalTime,
          transport,
          dailyBudget,
          totalBudget
      })
      navigate('/dashboard')
  }

  //日数計算と総予算自動計算
  useEffect(() => {
      if (departureDate && arrivalDate && dailyBudget) {
      const start = new Date(departureDate)
      const end = new Date(arrivalDate)
      const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1)
      setTotalBudget(String(days * Number(dailyBudget)))
      }
  }, [departureDate, arrivalDate, dailyBudget])

  return (
      <div style={{ padding: 20 }}>
      <h2>{initialPlan.title ? 'プラン編集' : 'プラン作成'}</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="プラン名" />
          </li>
          <li>
          <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="目的地" />
          </li>
          <li>
          <input value={departure} onChange={e => setDeparture(e.target.value)} placeholder="出発地" />
          </li>
          <li>
          <input value={arrival} onChange={e => setArrival(e.target.value)} placeholder="到着地" />
          </li>
          <li>
          <label>出発日: <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} /></label>
          </li>
          <li>
          <label>出発時刻: <input type="time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} /></label>
          </li>
          <li>
          <label>到着日: <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} /></label>
          </li>
          <li>
          <label>到着時刻: <input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} /></label>
          </li>
          <li>
          <label>
              移動手段:
              <select value={transport} onChange={e => setTransport(e.target.value)}>
              <option value="徒歩">徒歩</option>
              <option value="公共交通">公共交通</option>
              <option value="車">車</option>
              </select>
          </label>
          </li>
          <li>
          <input type="number" value={dailyBudget} onChange={e => setDailyBudget(e.target.value)} placeholder="一日の予算" />
          </li>
          <li>
              <label>
              <b>総予算（自動計算）</b><br />
              <input type="number" min="0" value={totalBudget} readOnly />
              <span style={{ fontSize: 12, color: '#555' }}>
                  出発日と帰宅日から日数を計算し、一日の予算×日数で自動算出されます
              </span>
              </label>
          </li>
          <li>
          <button onClick={handleSubmit}>{initialPlan.title ? '保存' : '作成'}</button>
          </li>
          <li>
          <button type="button" onClick={() => navigate('/dashboard')}>ダッシュボードに戻る</button>
          </li>
      </ul>
      </div>
  )
}

function toDateInputFormat(value) {
  if (!value) return ''
  // すでにYYYY-MM-DDならそのまま
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  // ISO文字列の場合
  const d = new Date(value)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default CreatePlan;
