// ヘッダー
import { Link, useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="p-2 bg-gray-100">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between">
        <h1 className="m-0 text-xl font-bold">Travel App</h1>
        <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
          {user && (
            <>
              <Link to="/dashboard">ダッシュボード</Link>
              <Link to="/plan/new">プラン作成</Link>
              <Link to="/profile/edit">プロフィール編集</Link>
              <div className="flex items-center gap-2">
                <span>こんにちは、{user.name} さん</span>
                <button onClick={handleLogoutClick} className="px-2 py-1 bg-blue-500 text-white rounded">ログアウト</button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
