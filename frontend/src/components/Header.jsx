import { Link, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <div>
        <h1 style={{ margin: 0 }}>Travel App</h1>
        <nav>
          {user && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
            >
              <Link to="/dashboard">ダッシュボード</Link>
              <Link to="/plan/new">プラン作成</Link>
              <Link to="/profile/edit">プロフィール編集</Link>
              <span>こんにちは、{user.name} さん</span>
              <button onClick={handleLogoutClick}>ログアウト</button>
            </Stack>
          )}
        </nav>
      </div>
    </header>
  );
}
