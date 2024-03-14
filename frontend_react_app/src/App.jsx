import React, { useEffect, lazy, Suspense } from 'react'
import './App.css'
import Loader from './utils/loader/Loader';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/common/nav/Nav';
import Toggler from './utils/toggler/Toggler';
const My_journey = lazy(() => import('./routes/my_journey/My_journey'));
const Finance = lazy(() => import('./routes/finance/Finance'));
const Philosophy = lazy(() => import('./routes/philosophy/Philosophy'));
const Science = lazy(() => import('./routes/science/Science'));
const Tech = lazy(() => import('./routes/tech/Tech'));
const Art = lazy(() => import('./routes/art/Art'));
const Politics = lazy(() => import('./routes/politics/Politics'));
const Footer = lazy(() => import('./components/common/footer/Footer'));
const Sign_up = lazy(() => import('./routes/sign_up/Sign_up'));
const User_profile = lazy(() => import('./routes/user_profile/User_profile'));
import { useAuth } from './context/AuthContext';
const Story_full_screen = lazy(() => import('./routes/story_full_screen/Story_full_screen'));

function App() {
  const { dispatch } = useAuth();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const action = {
        type: 'LOGIN',
        payload: {
          id: localStorage.getItem('userId'),
          userRole: localStorage.getItem('userRole'),
          email: localStorage.getItem('email'),
          imageUrl: localStorage.getItem('imageUrl')
        }
      };

      dispatch(action);
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  return (
    <Router>
      <Nav />
      <Toggler />
      <div style={{ minHeight: '80vh' }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<My_journey />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/science" element={<Science />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/art" element={<Art />} />
            <Route path="/politics" element={<Politics />} />
            <Route path="/sign_up" element={<Sign_up />} />
            <Route path="/user_profile" element={<User_profile />} />
            <Route path="/story_full_screen" element={<Story_full_screen />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router >
  )
}

export default App