import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { Client } from 'pg'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

const app = new Hono()

// 全ルートに CORS を適用
app.use('*', cors({
  origin: '*' // ここでどのオリジンからもアクセス可能に
}))

// PostgreSQL クライアント
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'travel_db'
})
await client.connect()

app.get('/users', async (c) => {
  const result = await client.query('SELECT * FROM users')
  return c.json(result.rows)
})

app.get('/users01', async (c) => {
  const result = await client.query('SELECT * FROM users01')
  return c.json(result.rows)
})

app.get('/plan_participants', async (c) => {
  const result = await client.query('SELECT * FROM plan_participants')
  return c.json(result.rows)
})

app.get('/plan_invites', async (c) => {
  const result = await client.query('SELECT * FROM plan_invites')
  return c.json(result.rows)
})
// user追加
//app.post('/users', async (c) => {
//  try {
//    const body = await c.req.json()
//    console.log('POST body:', body)
//    const { name } = body
//    if (!name) return c.json({ error: '名前は必須です' }, 400)
//    
//    const result = await client.query(
//      'INSERT INTO users (name) VALUES ($1) RETURNING *',
//      [name]
//    )
//    return c.json(result.rows[0])
//  } catch (err) {
//    console.error(err)
//    return c.json({ error: 'ユーザー追加に失敗しました' }, 500)
//  }
//})

// ユーザー登録
//app.post('/signup', async (c) => {
//  const { name, email, password } = await c.req.json()
//  const hash = await bcrypt.hash(password, 10)
//  await client.query(
//    'INSERT INTO users01 (name, email, password_hash) VALUES ($1, $2, $3)',
//    [name, email, hash]
//  )
//  return c.json({ message: 'User created' })
//})

// app.post('/signup', async (c) => {
//   const { name, email, password } = await c.req.json()
//   if (!name || !password) {
//     return c.json({ error: 'Name and password are required' }, 400)
//   }
//   const hash = await bcrypt.hash(password, 10)
//   await client.query(
//     'INSERT INTO users01 (name, email, password_hash) VALUES ($1, $2, $3)',
//     [name, email || null, hash]
//   )
//   return c.json({ message: 'User created' })
// })

app.post('/signup', async (c) => {
  const { name, email, password, crowd_tolerance, interests, food_conditions, travel_pace, language } = await c.req.json()
  if (!name || !password) {
    return c.json({ error: 'Name and password are required' }, 400)
  }
  const hash = await bcrypt.hash(password, 10)
  await client.query(
    `INSERT INTO users01 (name, email, password_hash, crowd_tolerance, interests, food_conditions, travel_pace, language)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [name, email || null, hash, crowd_tolerance, interests, food_conditions, travel_pace, language]
  )
  return c.json({ message: 'User created' })
})

// ログイン
//app.post('/login', async (c) => {
//  const { email, password } = await c.req.json()
//  const res = await client.query('SELECT * FROM users01 WHERE email=$1', [email])
//  if (res.rowCount === 0) return c.json({ error: 'User not found' }, 401)
//  const user = res.rows[0]
//  const match = await bcrypt.compare(password, user.password_hash)
//  if (!match) return c.json({ error: 'Incorrect password' }, 401)
//  // 仮にJWTを返す形
//  const token = uuidv4()
//  return c.json({ token, user: { id: user.id, name: user.name } })
//})

//app.post('/login', async (c) => {
//  const { email, password } = await c.req.json()
//  const res = await client.query('SELECT * FROM users01 WHERE email=$1', [email])
//  if (res.rowCount === 0) {
//    return c.json({ error: 'User not found', email }, 401)
//  }
//  const user = res.rows[0]
//  const match = await bcrypt.compare(password, user.password_hash)
//  if (!match) {
//    return c.json({ error: 'Incorrect password', email }, 401)
//  }
//  const token = uuidv4()
//  return c.json({ token, user: { id: user.id, name: user.name } })
//})

app.post('/login', async (c) => {
  const { name, password } = await c.req.json()
  const res = await client.query('SELECT * FROM users01 WHERE name=$1', [name])
  if (res.rowCount === 0) {
    return c.json({ error: 'User not found', name }, 401)
  }
  const user = res.rows[0]
  const match = await bcrypt.compare(password, user.password_hash)
  if (!match) {
    return c.json({ error: 'Incorrect password', name }, 401)
  }
  const token = uuidv4()
  // すべての基本情報を返す
  return c.json({ token, user })
})


// パスワードリセット申請（仮実装）
app.post('/reset-password', async (c) => {
  const { email, newPassword } = await c.req.json()
  const res = await client.query('SELECT * FROM users01 WHERE email=$1', [email])
  if (res.rowCount === 0) {
    return c.json({ error: 'Email not found' }, 404)
  }
  const hash = await bcrypt.hash(newPassword, 10)
  await client.query('UPDATE users01 SET password_hash=$1 WHERE email=$2', [hash, email])
  return c.json({ message: 'Password reset successful' })
})

// プラン作成（幹事）
// app.post('/plans', async (c) => {
//   const { organizer_id, title, start_date, end_date } = await c.req.json()
//   const res = await client.query(
//     'INSERT INTO plans (organizer_id, title, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
//     [organizer_id, title, start_date, end_date]
//   )
//   return c.json(res.rows[0])
// })

app.post('/plans', async (c) => {
  const { organizer_id, title, start_date, end_date } = await c.req.json()
  // プラン作成
  const res = await client.query(
    'INSERT INTO plans (organizer_id, title, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [organizer_id, title, start_date, end_date]
  )
  const plan = res.rows[0]
  // 幹事をplan_participantsに追加
  await client.query(
    'INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)',
    [plan.id, organizer_id]
  )
  return c.json(plan)
})

// 下書きプラン作成
app.post('/plans/draft', async (c) => {
  const {
    organizer_id,
    title,
    destination,
    departure,
    arrival,
    departure_date,
    departure_time,
    arrival_date,
    arrival_time,
    transport,
    daily_budget,
    total_budget
  } = await c.req.json()
  const res = await client.query(
    `INSERT INTO plans (
      organizer_id, title, destination, departure, arrival,
      departure_date, departure_time, arrival_date, arrival_time,
      transport, daily_budget, total_budget, status
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13
    ) RETURNING *`,
    [
      organizer_id,
      title,
      destination,
      departure,
      arrival,
      departure_date,
      departure_time,
      arrival_date,
      arrival_time,
      transport,
      daily_budget,
      total_budget,
      'draft'
    ]
  )
  const plan = res.rows[0]
  // 幹事をplan_participantsに追加
  await client.query(
    'INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)',
    [plan.id, organizer_id]
  )
  return c.json(plan)
})

// 招待トークン生成
app.post('/plans/:id/invite', async (c) => {
  const plan_id = c.req.param('id')
  const token = uuidv4()
  await client.query(
    'INSERT INTO plan_invites (plan_id, token) VALUES ($1, $2)',
    [plan_id, token]
  )
  return c.json({ token })
})

// 招待リンクで参加
app.post('/plans/join', async (c) => {
  const { token, user_id } = await c.req.json()
  const res = await client.query('SELECT * FROM plan_invites WHERE token=$1 AND used=FALSE', [token])
  if (res.rowCount === 0) return c.json({ error: 'Invalid or used token' }, 400)
  const plan_id = res.rows[0].plan_id
  await client.query('INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)', [plan_id, user_id])
  await client.query('UPDATE plan_invites SET used=TRUE WHERE token=$1', [token])
  return c.json({ message: 'Joined plan', plan_id })
})

// プラン一覧取得
app.get('/plans', async (c) => {
  const res = await client.query('SELECT * FROM plans')
  return c.json(res.rows)
})

// 追加: ユーザーが参加しているプラン一覧取得
app.get('/user/:userId/plans', async (c) => {
  const userId = c.req.param('userId')
  const res = await client.query(
    `SELECT p.*
     FROM plan_participants pp
     JOIN plans p ON pp.plan_id = p.id
     WHERE pp.user_id = $1`,
    [userId]
  )
  return c.json(res.rows)
})

// プラン参加者一覧取得API
app.get('/plans/:id/participants', async (c) => {
  const plan_id = c.req.param('id')
  const res = await client.query(
    `SELECT u.id, u.name
     FROM plan_participants pp
     JOIN users01 u ON pp.user_id = u.id
     WHERE pp.plan_id = $1`,
    [plan_id]
  )
  return c.json(res.rows)
})

app.get('/invite-info', async (c) => {
  const token = c.req.query('token')
  if (!token) return c.json({ error: 'Token is required' }, 400)
  const res = await client.query(
    `SELECT p.title AS plan_title, u.name AS organizer_name
     FROM plan_invites i
     JOIN plans p ON i.plan_id = p.id
     JOIN users01 u ON p.organizer_id = u.id
     WHERE i.token = $1 AND i.used = FALSE`,
    [token]
  )
  if (res.rowCount === 0) return c.json({ error: '招待情報が見つかりません' }, 404)
  return c.json(res.rows[0])
})

// プラン編集
app.post('/plans/:id/edit', async (c) => {
  const plan_id = c.req.param('id')
  const {
    title,
    destination,
    departure,
    arrival,
    departure_date,
    departure_time,
    arrival_date,
    arrival_time,
    transport,
    daily_budget,
    total_budget,
    status
  } = await c.req.json()

  await client.query(
    `UPDATE plans SET
      title = $1,
      destination = $2,
      departure = $3,
      arrival = $4,
      departure_date = $5,
      departure_time = $6,
      arrival_date = $7,
      arrival_time = $8,
      transport = $9,
      daily_budget = $10,
      total_budget = $11,
      status = COALESCE($12, status)
     WHERE id = $13`,
    [
      title,
      destination,
      departure,
      arrival,
      departure_date,
      departure_time,
      arrival_date,
      arrival_time,
      transport,
      daily_budget,
      total_budget,
      status,
      plan_id
    ]
  )
  // 更新後のプラン情報を返す
  const res = await client.query('SELECT * FROM plans WHERE id = $1', [plan_id])
  return c.json(res.rows[0])
})

// Node.js 用サーバ起動
serve({
  fetch: app.fetch,
  port: 3000,
})

console.log('🚀 Server running on http://localhost:3000')

