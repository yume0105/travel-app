import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { Client } from 'pg'
// import bcrypt from 'bcrypt'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai"

const app = new Hono()

// 全ルートに CORS を適用
app.use('*', cors({
  origin: '*' // ここでどのオリジンからもアクセス可能に
}))

// PostgreSQL クライアント
// const client = new Client({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'postgres',
//   database: 'travel_db'
// })
// await client.connect()

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Render PostgreSQLはSSL必須
  },
})
await client.connect()

app.get('/users', async (c) => {
  const result = await client.query('SELECT * FROM users')
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

app.get('/users/:id/plans', async (c) => {
  const userId = c.req.param('id')
  const res = await client.query(
    `SELECT p.*
     FROM plans p
     JOIN plan_participants pp ON p.id = pp.plan_id
     WHERE pp.user_id = $1
     ORDER BY p.id DESC`,
    [userId]
  )
  return c.json(res.rows)
})

app.get('/plans/:id', async (c) => {
  const planId = c.req.param('id')
  const res = await client.query('SELECT * FROM plans WHERE id = $1', [planId])
  if (res.rows.length === 0) {
    return c.notFound()
  }
  return c.json(res.rows[0])
})

app.put('/users/:id', async (c) => {
  const id = c.req.param('id')
  const {
    name,
    email,
    crowd_tolerance,
    interests,
    food_conditions,
    travel_pace,
    language
  } = await c.req.json()

  await client.query(
    `UPDATE users SET
      name = $1,
      email = $2,
      crowd_tolerance = $3,
      interests = $4,
      food_conditions = $5,
      travel_pace = $6,
      language = $7
     WHERE id = $8`,
    [
      name,
      email,
      crowd_tolerance,
      interests,
      food_conditions,
      travel_pace,
      language,
      id
    ]
  )
  const res = await client.query('SELECT * FROM users WHERE id = $1', [id])
  return c.json(res.rows[0])
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
//    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
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
//     'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
//     [name, email || null, hash]
//   )
//   return c.json({ message: 'User created' })
// })

app.post('/signup', async (c) => {
  try {
    const { name, email, password, crowd_tolerance, interests, food_conditions, travel_pace, language } = await c.req.json()
    if (!name || !password) {
      return c.json({ error: 'Name and password are required' }, 400)
    }
    const hash = await bcrypt.hash(password, 10)
    const result = await client.query(
      `INSERT INTO users (name, email, password_hash, crowd_tolerance, interests, food_conditions, travel_pace, language)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, email || null, hash, crowd_tolerance, interests, food_conditions, travel_pace, language]
    )
    const user = result.rows[0]
    console.log('New user ID:', result.rows[0].id);
    return c.json({ user })
  } catch (err) {
    console.error('Signup error:', err);
    return c.json({ error: 'Signup failed' }, 500)
  }
})

// ログイン
//app.post('/login', async (c) => {
//  const { email, password } = await c.req.json()
//  const res = await client.query('SELECT * FROM users WHERE email=$1', [email])
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
//  const res = await client.query('SELECT * FROM users WHERE email=$1', [email])
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
  const res = await client.query('SELECT * FROM users WHERE name=$1', [name])
  if (res.rowCount === 0) {
    console.log('Login failed: User not found for name', name)
    return c.json({ error: 'User not found', name }, 401)
  }
  const user = res.rows[0]
  const match = await bcrypt.compare(password, user.password_hash)
  if (!match) {
    console.log('Login failed: Incorrect password for name', name)
    return c.json({ error: 'Incorrect password', name }, 401)
  }
  const token = uuidv4()
  // すべての基本情報を返す
  console.log('user:', user)
  return c.json({ token, user })
})


// パスワードリセット申請（仮実装）
app.post('/reset-password', async (c) => {
  const { email, newPassword } = await c.req.json()
  const res = await client.query('SELECT * FROM users WHERE email=$1', [email])
  if (res.rowCount === 0) {
    return c.json({ error: 'Email not found' }, 404)
  }
  const hash = await bcrypt.hash(newPassword, 10)
  await client.query('UPDATE users SET password_hash=$1 WHERE email=$2', [hash, email])
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

  // プラン作成
  const res = await client.query(
    `INSERT INTO plans (
      organizer_id, title, destination, departure, arrival,
      departure_date, departure_time, arrival_date, arrival_time,
      transport, daily_budget, total_budget, status
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, 'confirmed'
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
      total_budget
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
  const plan_id = await getPlanIdFromToken(token)
  if (!plan_id) {
    return c.json({ error: '無効な招待トークンです' }, 400)
  }

  // すでに参加済みかチェック
  const exists = await client.query(
    'SELECT 1 FROM plan_participants WHERE plan_id = $1 AND user_id = $2',
    [plan_id, user_id]
  )
  if (exists.rows.length > 0) {
    return c.json({ error: 'すでに参加済みです' }, 400)
  }

  // 参加登録
  await client.query(
    'INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)',
    [plan_id, user_id]
  )
  return c.json({ message: '参加しました' })
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
     JOIN users u ON pp.user_id = u.id
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
     JOIN users u ON p.organizer_id = u.id
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

// Gemini APIキーを環境変数から取得
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

// APIキーを使ってGoogleGenerativeAIを初期化
const genAI = new GoogleGenerativeAI(apiKey);

// これでモデルを利用できます
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post('/ai/generate-plan', async (c) => {
  const { participants, plan, user_id } = await c.req.json()
  // 型を明示
  const typedParticipants: { name: string; age?: number; interests?: string; food_conditions?: string; travel_pace?: string; language?: string }[] = participants

  const prompt = `
参加者情報:
${typedParticipants.map(p => `名前: ${p.name}, 年齢: ${p.age || "不明"}, 興味: ${p.interests || "不明"}, 食事条件: ${p.food_conditions || "不明"}, 旅行ペース: ${p.travel_pace || "不明"}, 言語: ${p.language || "不明"}`).join('\n')}

プラン詳細:
プラン名: ${plan.title}
目的地: ${plan.destination}
出発地: ${plan.departure}
到着地: ${plan.arrival}
出発日: ${plan.departure_date}
出発時刻: ${plan.departure_time}
到着日: ${plan.arrival_date}
到着時刻: ${plan.arrival_time}
移動手段: ${plan.transport}
一日の予算: ${plan.daily_budget}
総予算: ${plan.total_budget}

この情報をもとに、参加者全員が楽しめる旅行プランを日本語で提案してください。
`

  try {
    const result = await model.generateContent(prompt)
    console.log("Gemini API result:", result)
    const aiPlan = result.response.text()

    // AI結果をDBに保存
    await client.query(
      `INSERT INTO ai_plan_results (plan_id, user_id, gemini_result)
       VALUES ($1, $2, $3)`,
      [plan.id, user_id, aiPlan]
    )

    return c.json({ aiPlan })
  } catch (err) {
    console.error("Gemini API error:", err)
    return c.json({ error: "Gemini API呼び出しに失敗しました" }, 500)
  }
})

// AI提案履歴取得API
app.get('/ai/plan-results', async (c) => {
  const plan_id = c.req.query('plan_id')
  if (!plan_id) {
    return c.json({ error: 'plan_id is required' }, 400)
  }
  const res = await client.query(
    `SELECT id, plan_id, user_id, gemini_result, created_at
     FROM ai_plan_results
     WHERE plan_id = $1
     ORDER BY created_at DESC`,
    [plan_id]
  )
  // 存在しない場合も空配列を返す
  return c.json(res.rows)
})

const PORT = process.env.PORT || 3000

serve({
  fetch: app.fetch,
  port: Number(PORT),
})

console.log(`🚀 Server running on http://localhost:${PORT}`)

async function getPlanIdFromToken(token: string): Promise<number | null> {
  const res = await client.query(
    'SELECT plan_id FROM plan_invites WHERE token = $1',
    [token]
  )
  return res.rows[0]?.plan_id ?? null
}

