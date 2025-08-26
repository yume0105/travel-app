import { Link, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm')); // 640px以上

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <div
        style={{
          display: isSmUp ? "flex" : "block",
          alignItems: isSmUp ? "center" : undefined,
          justifyContent: isSmUp ? "space-between" : undefined,
        }}
      >
        <h1 style={{ margin: 0, textAlign: isSmUp ? "left" : "left" }}>Travel App</h1>
        <nav>
          {user && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              sx={{
                justifyContent: isSmUp ? "flex-end" : "flex-start",
                textAlign: isSmUp ? "right" : "left",
              }}
            >
              <Link style={{ textAlign: isSmUp ? "right" : "left" }} to="/dashboard">ダッシュボード</Link>
              <Link style={{ textAlign: isSmUp ? "right" : "left" }} to="/plan/new">プラン作成</Link>
              <Link style={{ textAlign: isSmUp ? "right" : "left" }} to="/profile/edit">プロフィール編集</Link>
              <span style={{ textAlign: isSmUp ? "right" : "left" }}>こんにちは、{user.name} さん</span>
              <button style={{ textAlign: isSmUp ? "right" : "left" }} onClick={handleLogoutClick}>ログアウト</button>
            </Stack>
          )}
        </nav>
      </div>
    </header>
  );
}
