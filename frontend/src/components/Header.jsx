// ヘッダー
import { Link } from "react-router-dom";
import { useState } from "react";
import Login from '../pages/Login'

export default function Header({ user, onLogin, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password }); // App 側に渡す
    setUsername("");
    setPassword("");
  };

  return (
    <header style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <h1>Travel App</h1>

      {user ? (
        <div>
          <span>こんにちは、{user.name} さん</span>
          <button onClick={onLogout}>ログアウト</button>
        </div>
      ) : (
        <Login onLogin={onLogin} />
      )}

      <nav>
        <Link to="/dashboard">ダッシュボード</Link> |{" "}
        <Link to="/plans">プラン一覧</Link> |{" "}
        <Link to="/profile">プロフィール</Link>
      </nav>
    </header>
  );
}
