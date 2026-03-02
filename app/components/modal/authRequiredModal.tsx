import { useState } from 'react';
import {  FiLogIn } from 'react-icons/fi';
import Modal from './modal';
import Login from '../login/login';

const AuthRequiredModal = ({onClose}: {onClose: () => void}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
return (
    <Modal onClose={onClose}>
      <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">Authorization required</h3>
        </div>
        <p className="text-bg-dark mb-6">
          Favorites are accessible for the authorized users only.
        </p>
        <div className="flex gap-3 justify-end">
          <button
                      type="button"
                      onClick={openModal}
                      className="flex items-center gap-2 font-bold cursor-pointer hover:bg-primary-green/75 rounded-[30px] py-2.5 px-2.5"
                    >
                      <FiLogIn className="text-primary-green" />
                      Log in
                    </button>
                        {isModalOpen && (
                            <Modal onClose={closeModal}>
                              <Login /> 
                            </Modal>
                        )}
        </div>
      </div>
    </Modal>
  );
}

export default AuthRequiredModal;