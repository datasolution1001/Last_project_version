// src/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-7">
          <div className="bg-white px-4 pt-16 pb-16 sm:p-10 sm:pb-4">
            <div className="sm:flex justify-center sm:items-start">
              <div className="mt-3 text-center sm:mt-0  ">
                <h3 className="text-[23px] leading-6 font-bold text-gray-800 m-5 text-center">Camera Image</h3>
                <div className="mt-16">
                  <img src={imageSrc} alt="Base64" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-12 py-7 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-12 py-7 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
