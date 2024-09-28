import { useState } from 'react';

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle authentication (API call, etc.)
        // For demonstration, we'll just call onLogin if username/password are not empty
        if (username && password) {
            setAuthenticated();
        }
    };

    return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
                  <input
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                  />
              </div>
              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                  <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </div>
              <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
              >
                  Login
              </button>
          </form>
      </div>
  </div>
  );
};

export default Login;
