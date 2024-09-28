import { useState } from 'react';

const Login = ({ setAuthenticated }) => {
     const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            // Simulate login
            setAuthenticated();
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (username && password && password === confirmPassword) {
            // Simulate registration logic here
            console.log('User registered:', { username, password });
            setAuthenticated();
        } else {
            console.error('Passwords do not match');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">
                    {isRegistering ? 'Register' : 'Login'}
                </h2>
                {isRegistering ? (
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                                Username
                            </label>
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
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                        >
                            Register
                        </button>
                        <p className="mt-4 text-sm text-center">
                            Already have an account?{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:underline"
                                onClick={() => setIsRegistering(false)}
                            >
                                Login
                            </button>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                                Username
                            </label>
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
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
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
                        <p className="mt-4 text-sm text-center">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:underline"
                                onClick={() => setIsRegistering(true)}
                            >
                                Register
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
