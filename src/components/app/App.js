import { newsApi, userApi } from '../../utils/api';
import monthArray from '../../constants/constants';
import * as React from 'react'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Header from '../header/Header';
import AboutTheAuthor from '../aboutTheAuthor/AboutTheAuthor';
import Footer from '../footer/Footer';
import SignUpPopup from '../popup/SignUpPopup';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import LoginPopup from '../popup/LoginPopup';
import Main from '../main/Main';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import SavedArticles from '../savedArticles/SavedArticles';
import SearchBar from '../searchBar/SearchBar';
import searchBarImage from '../../images/search-bar-image.png';
import NotFound from '../notFound/NotFound';

function App() {
  const currentUserContext = React.useContext(CurrentUserContext);
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({ savedArticles: [], name: 'Michael', _id: 'asdasdasd', email: 'minka.scharff@gmail.com', password: 'm19023012' });
  const [articlesArray, setArticlesArray] = React.useState([]);
	const [showLessArray, setShowLessArray] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState();
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [canDeleteCard, setCanDeleteCard] = React.useState(false);
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [q, setQ] = React.useState('news');

  const handleSignUpClick = () => setIsSignUpPopupOpen(true);

  const handleLoginClick = () => setIsLoginPopupOpen(true);

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setSelectedArticle(null);
  };

  const handleLogin = (jwt) => {
    setLoggedIn(true);
    localStorage.setItem('token', jwt);
    history.push("/signup");
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push("/");
  }

  React.useEffect(() => {
    newsApi
      .getInitialArticles()
      .then((data) => {
        setArticlesArray(data.articles);
        // localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => setIsNotFound(true))
      .finally(() => setIsPreloader(false));

    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  React.useEffect(() => {
    const closeByClick = (evt) => {
      if(evt.target.classList.contains("popup")){
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeByClick);
    return () => document.removeEventListener('click', closeByClick);
  });

  const handleLoginSubmit = () => {
    const inputEmail = document.getElementById('login-email-input').value;
    const inputPassword = document.getElementById('login-password-input').value;

  }

  const isAutoLogin = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(() => {
          handleLogin(jwt);
          history.push('/');
        });
    }
  }

  const onArticleDelete = (evt) => {
    if (evt.target.parentElement.owner._id === currentUser._id) {
      // TODO Delete card
    } else {
      setCanDeleteCard(true);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const qInput = document.getElementById('search-bar-input');
    if (qInput && (qInput.value.length > 2)) {
      setIsPreloader(true);
      setQ(qInput.value);
      newsApi
        .searchNewTopic(qInput.value)
        .then((data) => {
          if(data.totalResults !== 0){
            setArticlesArray(data.articles);
          } else {
            setArticlesArray(data.articles);
            setShowLessArray(data.articles);
          }
        })
        .finally(() => { setIsPreloader(false) });
    }
  }

  const createDateText = (date) => {
    const day = Number(`${date[8]}${date[9]}`);
    const month = monthArray[Number(`${date[5]}${date[6]}`) - 1];
    const year = Number(`${date[0]}${date[1]}${date[2]}${date[3]}`);
    return `${month} ${day}, ${year}`;
  }

  React.useEffect(() => {
    if(articlesArray[2]){
      articlesArray.map((article)=> article.publishedAt = createDateText(article.publishedAt));
      setShowLessArray([articlesArray[0], articlesArray[1], articlesArray[2]]);
    }
  }, [articlesArray]);

  const savedArticleClick = () => {
    history.push("/saved-articles");
  }

  const homeClick = () => {
    history.push("/");
  }

  const toggleSaveArticle = (evt) => {
    const parent = evt.target.parentElement;
    if (evt.target.classList.contains('article__saved')) {
      currentUser.savedArticles.push({
        urlToImage: `${parent.children[2].currentSrc}`,
        publishedAt: parent.children[3].children[0].textContent,
        url: `${parent.id}`,
        author: parent.children[3].children[3].textContent,
        content: parent.children[3].children[2].textContent,
        title: parent.children[3].children[1].textContent,
        source: { name: `${parent.children[2].alt}` },
        keyword: q,
      });
      // TODO create article in finalDB 
    } else {
      const index = currentUser.savedArticles.findIndex((article) => article.url === parent.id);
      currentUser.savedArticles.splice(index, 1);
      // TODO remove article from finalDB
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser} className="app">
      <Switch>
        <ProtectedRoute exact path="/saved-articles" loggedIn={loggedIn}>
          <Header
            handleLogout={handleLogout}
            isLoggedIn={true}
            savedArticleClick={savedArticleClick}
            homeClick={homeClick}
            theme={true}
          />
          <SavedArticles 
            onArticleSave={toggleSaveArticle}
            />
        </ProtectedRoute>

        <Route path="/">
          <img className='app__image' src={searchBarImage} alt='phone in the hand of a woman' />
          <Header
            isLoggedIn={loggedIn}
            handleButtonClick={setIsLoginPopupOpen}
            handleLogout={handleLogout}
            savedArticleClick={savedArticleClick}
            homeClick={homeClick}
          />
          <SearchBar
            onSubmit={handleSearch}
          />
          
          {isNotFound ?
            <NotFound />
            :
            <Main
              isLoggedIn={loggedIn}
              onArticleSave={toggleSaveArticle}
              articles={articlesArray}
              showLessArray={showLessArray}
              isPreloader={isPreloader}
            />
          }
          <AboutTheAuthor />
          <SignUpPopup
            isOpen={isSignUpPopupOpen}
            onClose={closeAllPopups}
            linkText="Sign in"
            buttonText="Sign in"
            handleSwitchPopup={handleLoginClick}
          />
          <LoginPopup
            isOpen={isLoginPopupOpen}
            onClose={closeAllPopups}
            linkText="Sign up"
            buttonText="Sign in"
            handleSwitchPopup={handleSignUpClick}
          />
        </Route>
      </Switch>

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
