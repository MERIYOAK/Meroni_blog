import React, { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import Loader from './utils/loader/Loader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
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
function App() {
  //Initialize state to store fetched data
  const [loading, setLoading] = useState(true);
  const [my_journey_posts, setMyJourneyPosts] = useState([]);
  const [daily_quote_post, setDailyQuotePost] = useState({});
  const [finance_posts, setFinancePosts] = useState([]);
  const [Slides, setSlides] = useState([]);
  const [philosophy_article_posts, setPhilosophyArticlePosts] = useState([]);
  const [philosophy_posts, setPhilosophyPosts] = useState([]);
  const [science_posts, setSciencePosts] = useState([]);
  const [sci_hero_posts, setSciHeroPosts] = useState([]);
  const [tech_posts, setTechPosts] = useState([]);
  const [tech_body_posts, setTechBodyPosts] = useState([]);
  const [tech_trending_box_posts, setTechTrendingBoxPosts] = useState([]);
  const [art_posts, setArtPosts] = useState([]);
  const [art_body_posts, setArtBodyPosts] = useState([]);
  const [politics_posts, setPoliticsPosts] = useState([]);
  const [black_body_content, setBlackBodyContent] = useState([]);
  const [hero_content_box_posts, setHeroContentBoxPosts] = useState([]);
  const { dispatch } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then((response) => {
        setMyJourneyPosts(response.data.my_journey_posts);
        setDailyQuotePost(response.data.daily_quote);
        setFinancePosts(response.data.finance_posts);
        setSlides(response.data.finance_slide_posts);
        setPhilosophyArticlePosts(response.data.philosophy_article_posts);
        setPhilosophyPosts(response.data.philosophy_posts);
        setSciencePosts(response.data.science_posts);
        setSciHeroPosts(response.data.sci_hero_posts);
        setTechPosts(response.data.tech_posts);
        setTechBodyPosts(response.data.tech_body_posts);
        setTechTrendingBoxPosts(response.data.tech_trending_box_posts);
        setArtPosts(response.data.art_posts);
        setArtBodyPosts(response.data.art_body_posts);
        setPoliticsPosts(response.data.politics_posts);
        setBlackBodyContent(response.data.black_body_content);
        setHeroContentBoxPosts(response.data.hero_content_box_posts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const action = {
        type: 'LOGIN',
        payload: {
          id: sessionStorage.getItem('userId'),
          userRole: sessionStorage.getItem('userRole'),
          email: sessionStorage.getItem('email'),
          imageUrl: sessionStorage.getItem('imageUrl')
        }
      };

      dispatch(action);
    } else {
      dispatch({ type: 'LOGOUT' });
    }

    setLoading(false);


  }, []);

  return (
    <Router>
      <Nav />
      <Toggler />
      <Suspense fallback={<Loader />}>
        {!loading && (
          <Routes>
            <Route path="/" element={<My_journey my_journey_posts={my_journey_posts} daily_quote_post={daily_quote_post} />} />
            <Route path="/finance" element={<Finance finance_posts={finance_posts} Slides={Slides} />} />
            <Route path="/philosophy" element={<Philosophy philosophy_posts={philosophy_posts} philosophy_article_posts={philosophy_article_posts} />} />
            <Route path="/science" element={<Science sci_hero_posts={sci_hero_posts} science_posts={science_posts} />} />
            <Route path="/tech" element={<Tech tech_posts={tech_posts} tech_trending_box_posts={tech_trending_box_posts} tech_body_posts={tech_body_posts} />} />
            <Route path="/art" element={<Art art_body_posts={art_body_posts} art_story_box_posts={art_posts} />} />
            <Route path="/politics" element={<Politics politics_posts={politics_posts} black_body_content={black_body_content} hero_content_box_posts={hero_content_box_posts} />} />
            <Route path="/sign_up" element={<Sign_up />} />
            <Route path="/user_profile" element={<User_profile />} />
          </Routes>
        )}
      </Suspense>
      {!loading && <Footer />}
    </Router >
  )
}

export default App