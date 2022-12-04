import newsApiOBJ from '../../utils/newsApi';
import usersApiOBJ from '../../utils/usersApi';
import findMonth from '../../constants/constants';
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
import NotFound from '../notFound/NotFound';

function App() {
  // eslint-disable-next-line
  const currentUserContext = React.useContext(CurrentUserContext);
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState();
  const [articlesArray, setArticlesArray] = React.useState([]);
  const [showLessArray, setShowLessArray] = React.useState([]);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [isHomePage, setIsHomePage] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isResultsOpen, setIsResultsOpen] = React.useState(true);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState();
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSigninPreloader, setIsSigninPreloader] = React.useState(false);
  const [isSignupPreloader, setIsSignupPreloader] = React.useState(false);
  const [q, setQ] = React.useState('news');

  const handleSignUpClick = () => setIsSignUpPopupOpen(true);

  const handleLoginClick = () => setIsLoginPopupOpen(true);

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    if (window.innerWidth < 520) {
      noScroll();
    }
    history.push('/');
  };

  const noScroll = () => html.classList.add('no-scroll');

  const scroll = () => html.classList.remove('no-scroll');

  // * Handling the logout click
  const handleLogout = () => {
    setLoggedIn(false);
    setIsHomePage(true);
    setSavedArticles([]);
    localStorage.removeItem('jwt');
    history.push("/");
  };

  // * close popup by ESCAPE 
  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
    // eslint-disable-next-line
  }, []);

  // ! Adding event listener for the page
  // ! Mouse event
  React.useEffect(() => {
    const closeByClick = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }

    document.addEventListener('mouseup', closeByClick);
    return () => document.removeEventListener('mouseup', closeByClick);
  });

  // * Handling login form submit
  const handleLoginSubmit = (email, password) => {
    usersApiOBJ
      .login({ email, password })
      .then((data) => {
        setIsSigninPreloader(true);
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
        }
        if (data.user._id) {
          findUserInfo();
        }
      })
      .catch((err) => {
        setIsSigninPreloader(true);
        console.log(`Error type: ${err.message}`);
        setLoggedIn(false);
      })
      .finally(() => {
        setIsSigninPreloader(false);
        gettingSavedArticles();
      })
  };

  const findUserInfo = () => {
    usersApiOBJ
      .getCurrentUser()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(`Error type: ${err.message}`);
          setLoggedIn(false);
        }
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  // * Handling signup form submit
  const handleSignupSubmit = (email, password, username) => {
    usersApiOBJ
      .signUp({ email, password, username })
      .then(() => {
        setIsSignupPreloader(true);
      })
      .catch((err) => {
        console.log(`Error type: ${err.message}`)
      })
      .finally(() => {
        setIsSignupPreloader(false);
        closeAllPopups();
        setIsLoginPopupOpen(true);
      })
  };

  // * checking if should auto-login
  const isAutoLogin = () => {
    handleSearch();
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(`Check token error: ${err}`);
        })
        .finally(() => {
          gettingSavedArticles();
        });
    }
  }

  // * Handling the serch form submit
  const handleSearch = (qInput = q) => {
    if (qInput && (qInput.length > 2)) {
      setIsPreloader(true);
      setQ(qInput);
      newsApiOBJ
        .searchNewTopic(qInput)
        .then((data) => {
          if (data.totalResults !== 0) {
            setArticlesArray(data.articles);
            setIsResultsOpen(true);
          } else {
            setArticlesArray(data.articles);
            setShowLessArray(data.articles);
            setIsResultsOpen(false);
          }
        })
        .catch((err) => {
          if (err.message === 'Failed to fetch') {
            if (isResultsOpen) {
              setIsNotFound(true);
            }
          }
          setIsResultsOpen(true);
        })
        .finally(() => { setIsPreloader(false) });
    }
  };

  // * creating the correct date format
  const createDateText = (date, isMain = true) => {
    let day, month, year;
    if (isMain) {
      day = Number(`${date[8]}${date[9]}`);
      month = findMonth(`${date[5]}${date[6]}`);
      year = Number(`${date[0]}${date[1]}${date[2]}${date[3]}`);
    } else {
      day = Number(`${date[8]}${date[9]}`);
      month = findMonth(`${date[4]}${date[5]}${date[6]}`);
      year = Number(`${date[11]}${date[12]}${date[13]}${date[14]}`);
    }
    return `${month} ${day}, ${year}`;
  };

  // * Setting the partial articles array
  React.useEffect(() => {
    if (articlesArray) {
      articlesArray.map((article) => article.publishedAt = createDateText(article.publishedAt));
      if (articlesArray[2]) {
        setShowLessArray([articlesArray[0], articlesArray[1], articlesArray[2]]);
      } else {
        if (articlesArray[1]) {
          setShowLessArray([articlesArray[0], articlesArray[1]]);
        }
      }
    }
  }, [articlesArray]);

  // ! Nav bar handling
  // * Handling saved articles click
  const savedArticlesClick = () => {
    history.push("/saved-articles");
    setIsHomePage(false);
    if (window.innerWidth < 520) {
      scroll();
    }
  };

  // * Handling home click
  const homeClick = () => {
    history.push("/");
    setIsHomePage(true);
    if (window.innerWidth < 520) {
      scroll();
    }
  };

  const gettingSavedArticles = () => {
    if (currentUser) {
      usersApiOBJ
        .getArticles()
        .then((articles) => {
          if (articles) {
            currentUser.savedArticles = [];             // eslint-disable-next-line
            articles.map((article) => {
              article.publishedAt = createDateText(article.publishedAt, false);
              if (article.ownerId === currentUser.id) {
                currentUser.savedArticles.push(article);
              }
              setSavedArticles(currentUser.savedArticles);
            })
          }
        })
        .catch((err) => {
          console.log(`getArticles function Error type: ${err}`);
        });
    }
  };

  // * running the 'isAutoLogin' function in the beggining
  React.useEffect(() => {
    isAutoLogin();            // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    gettingSavedArticles();            // eslint-disable-next-line
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path="/saved-articles" loggedIn={loggedIn}>
          <Header
            isLoggedIn={loggedIn}
            isHomePage={isHomePage}
            homeClick={homeClick}
            savedArticlesClick={savedArticlesClick}
            handleLogout={handleLogout}
            noScroll={noScroll}
            scroll={scroll}
            theme={true}
          />
          <SavedArticles
            savedArticles={savedArticles}
            gettingSavedArticles={gettingSavedArticles}
          />
        </ProtectedRoute>

        <Route path="/">
          <Header
            isLoggedIn={loggedIn}
            isHomePage={isHomePage}
            homeClick={homeClick}
            savedArticlesClick={savedArticlesClick}
            handleLogout={handleLogout}
            noScroll={noScroll}
            scroll={scroll}
            handleButtonClick={handleLoginClick}
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
              isHomePage={isHomePage}
              articles={articlesArray}
              showLessArray={showLessArray}
              isPreloader={isPreloader}
              gettingSavedArticles={gettingSavedArticles}
              q={q}
            />
          }
          <SignUpPopup
            isOpen={isSignUpPopupOpen}
            onClose={closeAllPopups}
            handleSignup={handleSignupSubmit}
            linkText="Sign up"
            buttonText="Sign up"
            handleSwitchPopup={handleLoginClick}
            isPreloader={isSignupPreloader}
          />
          <LoginPopup
            isOpen={isLoginPopupOpen}
            onClose={closeAllPopups}
            linkText="Sign up"
            buttonText="Sign in"
            handleSwitchPopup={handleSignUpClick}
            handleLogin={handleLoginSubmit}
            isPreloader={isSigninPreloader}
          />
          <AboutTheAuthor />
        </Route>
      </Switch>

      <Footer homeClick={homeClick} />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
