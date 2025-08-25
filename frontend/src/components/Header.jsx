// ヘッダー
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from '../pages/Login'

export default function Header({ user, onLogin, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <h1 style={{ margin: 0 }}>Travel App</h1>
        <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {user && (
            <>
              <Link to="/dashboard">ダッシュボード</Link>
              <Link to="/plan/new">プラン作成</Link>
              <Link to="/profile/edit">プロフィール編集</Link>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span>こんにちは、{user.name} さん</span>
                <button onClick={handleLogoutClick}>ログアウト</button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
