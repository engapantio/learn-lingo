import { Link, NavLink, useNavigate } from 'react-router';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '~/services/context/authContext';
interface HeaderProps {
  openLogin: () => void;
  openRegistration: () => void;
}

const Header = ({ openLogin, openRegistration }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('You have been successfully logged out.');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message ?? 'Logout failed. Please try again.');
    }
  };

  return (
    <header className="flex bg-transparent justify-between mx-16">
      <Link to="/" className="font-medium text-logo flex  gap-2  py-2.5 mr-30.5">
        <img src="/logo.svg" alt="Logo" className="block w-full h-full" />
        LearnLingo
      </Link>
      <nav>
        <ul className="flex gap-7 py-3.5">
          <li className="hover:bg-green-200 rounded-xl">
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'text-bg-button font-medium' : 'text-bg-dark font-normal'}`
              }
            >
              Teachers
            </NavLink>
          </li>
          <li className="hover:bg-green-200 rounded-xl">
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'text-bg-button font-medium' : 'text-bg-dark font-normal'}`
              }
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
      <ul className="flex gap-4">
        {user ? (
          <li className="py-3.5 rounded-xl hover:bg-green-200">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 font-bold cursor-pointer "
            >
              <FiLogOut className="text-bg-button" />
              Log out
            </button>
          </li>
        ) : (
          <>
            <li className="py-3.5 rounded-xl hover:bg-green-200">
              <button
                type="button"
                onClick={openLogin}
                className="flex items-center gap-2 font-bold cursor-pointer "
              >
                <FiLogIn className="text-bg-button" />
                Log in
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={openRegistration}
                className="block bg-bg-dark text-bg rounded-xl h-full py-3.5 px-9.75 font-family font-bold leading-5 cursor-pointer hover:bg-bg-dark/75"
              >
                Registration
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
