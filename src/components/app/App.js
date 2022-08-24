import { newsApi } from '../../utils/api';
import monthArray from '../../constants/constants';
import * as React from 'react'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Header from '../header/Header';
import AboutTheAuthor from '../aboutTheAuthor/AboutTheAuthor';
import Footer from '../footer/Footer';
import SignUpPopup from '../popup/SignUpPopup';
import CurrentUserContext from '../../contexts/CurrentUserContext';
// import * as auth from '../../utils/auth';
import LoginPopup from '../popup/LoginPopup';
import Main from '../main/Main';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import SavedArticles from '../savedArticles/SavedArticles';
import SearchBar from '../searchBar/SearchBar';
import NotFound from '../notFound/NotFound';

function App() {
  // const currentUserContext = React.useContext(CurrentUserContext);  
	const safeDocument = typeof document !== 'undefined' ? document : {};
	const html = safeDocument.documentElement;
  const history = useHistory();
  const [currentUser] = React.useState({ savedArticles: [], name: 'Michael', _id: 'asdasdasd', email: 'minka.scharff@gmail.com', password: 'm19023012' });
  const [articlesArray, setArticlesArray] = React.useState([]);
	const [showLessArray, setShowLessArray] = React.useState([]);
	const [isHomePage, setIsHomePage] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isResultsOpen, setIsResultsOpen] = React.useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState();
  const [, setSelectedArticle] = React.useState(null);
  // const [canDeleteCard, setCanDeleteCard] = React.useState(false);
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [q, setQ] = React.useState('israel');

  const handleSignUpClick = () => setIsSignUpPopupOpen(true);

  const handleLoginClick = () => setIsLoginPopupOpen(true);

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setSelectedArticle(null);
  };

  const toggleNoScroll = () => html.classList.toggle('no-scroll');

  // const handleLogin = (jwt) => {
  //   setLoggedIn(true);
  //   localStorage.setItem('token', jwt);
  //   history.push("/signup");
  // }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push("/");
  }

  React.useEffect(() => {
    newsApi
      .getInitialArticles()
      .then((data) => {
        if(data.totalResults !== 0){
          setArticlesArray(data.articles);
          currentUser.savedArticles[0] = data.articles[0];
          currentUser.savedArticles[0].keyword = 'news';
          currentUser.savedArticles[1] = data.articles[1];
          currentUser.savedArticles[1].keyword = 'news';
        } else {
          setArticlesArray(data.articles);
          setShowLessArray(data.articles);
        }
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
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const closeByClick = (evt) => {
      if(evt.target.classList.contains("popup")){
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeByClick);
    return () => document.removeEventListener('click', closeByClick);
  }, []);

  // const handleLoginSubmit = () => {
  //   const inputEmail = document.getElementById('login-email-input').value;
  //   const inputPassword = document.getElementById('login-password-input').value;

  // }

  // const isAutoLogin = () => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     auth.checkToken(jwt)
  //       .then(() => {
  //         handleLogin(jwt);
  //         history.push('/');
  //       });
  //   }
  // }

  // const onArticleDelete = (evt) => {
  //   if (evt.target.parentElement.owner._id === currentUser._id) {
  //     // TODO Delete card
  //   } else {
  //     setCanDeleteCard(true);
  //   }
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    let qInput = document.getElementById('search-bar-input');
    if (qInput && (qInput.value.length > 2)) {
      setIsPreloader(true);
      setQ(qInput.value);
      newsApi
        .searchNewTopic(qInput.value)
        .then((data) => {
          if(data.totalResults !== 0){
            setArticlesArray(data.articles);
            setIsResultsOpen(true);
          } else {
            setArticlesArray(data.articles);
            setShowLessArray(data.articles);
            setIsResultsOpen(false);
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

  const generateKey = (article) => {
		let tempKey = '';
		if(article){
			tempKey += article.url;
			tempKey += (Math.random(0, 9) * Math.random(0, 9)).toString();
			tempKey += article.title;
			tempKey += article.urlToImage;
		}
		return tempKey.replace(/ /g, '');
	}

  const savedArticlesClick = () => {
    history.push("/saved-articles");
    setIsHomePage(false);
    toggleNoScroll();
  }

  const homeClick = () => {
    history.push("/");
    setIsHomePage(true);
    toggleNoScroll();
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
            isLoggedIn={loggedIn}
            handleLogout={handleLogout}
            savedArticlesClick={savedArticlesClick}
            homeClick={homeClick}
            theme={true}
            isHomePage={isHomePage}
            toggleNoScroll={toggleNoScroll}
          />
          <SavedArticles 
            onArticleSave={toggleSaveArticle}
            generateKey={generateKey}
            />
        </ProtectedRoute>

        <Route path="/">
          <Header
            isLoggedIn={loggedIn}
            handleButtonClick={setIsLoginPopupOpen}
            handleLogout={handleLogout}
            savedArticlesClick={savedArticlesClick}
            homeClick={homeClick}
            isHomePage={isHomePage}
            toggleNoScroll={toggleNoScroll}
          >
            <SearchBar
              onSubmit={handleSearch}
            />
          </Header>
          {isNotFound ?
            <NotFound />
            :
            <Main
              isOpen={isResultsOpen}
              isLoggedIn={loggedIn}
              onArticleSave={toggleSaveArticle}
              articles={articlesArray}
              showLessArray={showLessArray}
              isPreloader={isPreloader}
              generateKey={generateKey}
            />
          }
          <AboutTheAuthor />
          <SignUpPopup
            isOpen={isSignUpPopupOpen}
            onClose={closeAllPopups}
            linkText="Sign up"
            buttonText="Sign up"
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
