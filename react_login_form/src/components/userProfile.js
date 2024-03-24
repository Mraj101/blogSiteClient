import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const UserProfile = () => {
  const { usr, setUsr } = useAuthContext();

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
    setUsr(userDataFromStorage);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden w-96">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <img
              src={usr ? usr.img : "https://via.placeholder.com/150"}
              alt="User Profile"
              className="rounded-full h-32 w-32 mb-4 object-cover"
            />
            <h2 className="text-2xl font-semibold mb-2">{usr ? usr.fullName : "Loading..."}</h2>
            <p className="text-gray-600 mb-4">{usr ? usr.email : "Loading..."}</p>
            {usr && (
              <p className="text-gray-600 mb-4">Username: {usr.username}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
