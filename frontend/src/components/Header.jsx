import { Link, useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="p-2 bg-gray-200">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between">
        <h1 className="m-0 text-xl font-bold">Travel App</h1>
        <nav className="w-full sm:w-auto flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-6 mt-2 sm:mt-0">
          {user && (
            <>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto">
                <Link className="py-1 px-2 sm:py-0 sm:px-0" to="/dashboard">ダッシュボード</Link>
                <Link className="py-1 px-2 sm:py-0 sm:px-0" to="/plan/new">プラン作成</Link>
                <Link className="py-1 px-2 sm:py-0 sm:px-0" to="/profile/edit">プロフィール編集</Link>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
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
