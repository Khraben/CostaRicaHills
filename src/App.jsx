import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider}  from './context/UserContext';
import Layout from './pages/Layout';
import UserProfileReservas from './components/UserProfileReservas';
import SearchTours from './components/SearchTours';
import Home from './pages/Home';
import TourView from './components/TourView';
import About from './pages/About';
import { ThemeProvider } from './context/ThemeContext';
function App() {
    return (
      <Router>
        <UserProvider>
        <ThemeProvider>
        <Layout title="Costa Rica Hills">
              <Routes>
                <Route path="/"element={<Home />} />
                <Route path="/profile" element={<UserProfileReservas />} />
                <Route path="/tours" element={<SearchTours />} />
                <Route path="/tour-view" element={<TourView />} />
                <Route path="/about" element={<About/>} />
              </Routes>   
            </Layout>
            </ThemeProvider>   
        </UserProvider>
      </Router>
    );
  }

export default App
