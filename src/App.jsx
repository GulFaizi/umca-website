import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import OurTeam from './pages/OurTeam';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Login from './pages/Login';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-wrapper">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/programs" element={<Programs />} />
                            <Route path="/our-team" element={<OurTeam />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/news/:id" element={<NewsDetail />} />
                            <Route path="/get-involved" element={<GetInvolved />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/donate" element={<Donate />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}



export default App;
