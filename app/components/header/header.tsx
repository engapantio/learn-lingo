import { NavLink } from 'react-router';
import { FiLogIn } from 'react-icons/fi';
import logo from './logo.svg';
interface HeaderProps {
  openLogin: () => void;
  openRegistration: () => void;
}

const Header = ({ openLogin, openRegistration }: HeaderProps) => {
  return (
    <header className="flex justify-between px-16 mx-auto">
      <div className="flex  gap-2  py-2.5">
        <img src={logo} alt="Logo" className="block w-full h-full" />
        <p className="font-medium text-logo">LearnLingo</p>
      </div>
      <nav>
        <ul className="flex gap-7 py-3.5">
          <li>
            <NavLink to="/teachers">Teachers</NavLink>
          </li>
          <li>
            <NavLink to="/favorites">Favorites</NavLink>
          </li>
        </ul>
      </nav>
      <ul className="flex gap-4">
        <li className="py-3.5">
          <button
            type="button"
            onClick={openLogin}
            className="flex items-center gap-2 font-bold cursor-pointer"
          >
            <FiLogIn className="text-primary-green" />
            Log in
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={openRegistration}
            className="block bg-bg-dark text-bg rounded-xl h-full py-3.5 px-9.75 font-family font-bold leading-5 cursor-pointer"
          >
            Registration
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
