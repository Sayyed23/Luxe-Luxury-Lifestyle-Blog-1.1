import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Fashion from '../pages/Fashion';
import Travel from '../pages/Travel';
import Lifestyle from '../pages/Lifestyle';
import About from '../pages/About';
import ArticleDetail from '../pages/ArticleDetail';
import AllArticles from '../pages/AllArticles';
import Feed from '../pages/Feed';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'fashion',
        element: <Fashion />,
      },
      {
        path: 'travel',
        element: <Travel />,
      },
      {
        path: 'lifestyle',
        element: <Lifestyle />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: ':category/articles',
        element: <AllArticles />,
      },
      {
        path: ':category/article/:slug',
        element: <ArticleDetail />,
      },
      {
        path: 'community',
        element: <Feed />,
      },
      {
        path: 'profile/:username',
        element: <Profile />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
]);