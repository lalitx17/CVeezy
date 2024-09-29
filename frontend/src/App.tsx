import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';
import { useAuth } from './components/useAuth.tsx';
import './App.css'


const App = () => {
 
    const { isAuthenticated } = useAuth();

    return (
        <div>
            {isAuthenticated ? (
                <Dashboard />
            ) : (
                <Login />
            )}
        </div>
    );
};

export default App;
