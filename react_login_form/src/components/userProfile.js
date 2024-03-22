import React from 'react';

const UserProfile = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-96">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="User Profile"
              className="rounded-full h-32 w-32 mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">John Doe</h2>
            <p className="text-gray-600 mb-4">john.doe@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
