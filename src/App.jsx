import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider}  from './context/UserContext';
import Layout from './pages/Layout';
import UserProfileReservas from './components/UserProfileReservas';
function App() {
    return (
      <Router>
        <UserProvider>
        <Layout title="Costa Rica Hills">
              <Routes>
                <Route path="/"element={<Layout title="Costa Rica Hills" />} />
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
