import { useNavigate } from 'react-router';
import { FiX } from 'react-icons/fi';
import Modal from './modal';
import Login from '../login/login';

const AuthRequiredModal = ({onClose}: {onClose: () => void}) => {
  const navigate = useNavigate();
return (
    <Modal onClose={onClose}>
      <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">Authorization required</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <FiX size={24} />
          </button>
        </div>
        <p className="text-gray-700 mb-6">
          "Favorites are accessible for the authorized users only."
        </p>
        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
          {/* <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Увійти
          </button> */}
          <Login/>
        </div>
      </div>
    </Modal>
  );
}

export default AuthRequiredModal;