import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider}  from './context/UserContext';
import Layout from './pages/Layout';
import UserProfileReservas from './components/UserProfileReservas';
import Home from './pages/Home';
function App() {
    return (
      <Router>
        <UserProvider>
        <Layout title="Costa Rica Hills">
              <Routes>
                <Route path="/"element={<Home />} />
                <Route path="profile" element={<UserProfileReservas />} />
                <Route path="tours" element={<div>Tours Page</div>} />
                <Route path="about" element={<div>About Page</div>} />
              </Routes>   
            </Layout>
        </UserProvider>
      </Router>
    );
  }

export default App
