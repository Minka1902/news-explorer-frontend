import newsApiOBJ from '../../utils/newsApi';
import usersApiOBJ from '../../utils/usersApi';
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
import NotFound from '../notFound/NotFound';

function App() {
  // eslint-disable-next-line
  const currentUserContext = React.useContext(CurrentUserContext);
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();
  localStorage.setItem('history', history);
  const [currentUser, setCurrentUser] = React.useState();
  const [articlesArray, setArticlesArray] = React.useState([]);
  const [showLessArray, setShowLessArray] = React.useState([]);
  const [isHomePage, setIsHomePage] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isResultsOpen, setIsResultsOpen] = React.useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState();
  const [, setSelectedArticle] = React.useState(null);
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [q, setQ] = React.useState('israel');

  const handleSignUpClick = () => setIsSignUpPopupOpen(true);

  const handleLoginClick = () => setIsLoginPopupOpen(true);

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setSelectedArticle(null);
    if (window.innerWidth < 520) {
      noScroll();
    }
    history.push('/');
  };

  const toggleNoScroll = () => html.classList.toggle('no-scroll');

  // const scroll = () => html.classList.remove('no-scroll');

  const noScroll = () => html.classList.add('no-scroll');

  // ! Header handling
  // * Handling the logout click
  const handleLogout = () => {
    setLoggedIn(false);
    setIsHomePage(true);
    localStorage.removeItem('jwt');
    history.push("/");
  };

  // * getting articles
  React.useEffect(() => {
    newsApiOBJ
      .getInitialArticles()
      .then((data) => {
        if (data.totalResults !== 0) {
          setArticlesArray(data.articles);
        } else {
          setArticlesArray(data.articles);
          setShowLessArray(data.articles);
        }
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          if (isResultsOpen) {
            setIsNotFound(true);
          }
        }
      })
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
        if (data.email === email) {
          setCurrentUser({ username: data.username, email: data.email, id: data._id, savedArticles: [] });
        } else {
          //open error message
        }
      })
      .catch((err) => {
        console.log(`Error type: ${err.message}`);
        setCurrentUser({});
        setLoggedIn(false);
      })
      .finally(() => {
        closeAllPopups();
        setLoggedIn(true);
      });
  };

  // * Handling signup form submit
  const handleSignupSubmit = (email, password, username) => {
    usersApiOBJ
      .signUp({ email, password, username })
      .catch((err) => {
        console.log(`Error type: ${err.message}`)
      })
      .finally(() => {
        closeAllPopups();
        setIsLoginPopupOpen(true);
      })
  };

  // * checking if should auto-login
  const isAutoLogin = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(() => {
          history.push('/');
        });
    }
  }

  React.useEffect(() => {
    isAutoLogin()
  });

  // * Handling the serch form submit
  const handleSearch = (e) => {
    e.preventDefault();
    let qInput = document.getElementById('search-bar-input');
    if (qInput && (qInput.value.length > 2)) {
      setIsPreloader(true);
      setQ(qInput.value);
      newsApiOBJ
        .searchNewTopic(qInput.value)
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

  // * Handling the article date creation
  const createDateText = (date) => {
    const day = Number(`${date[8]}${date[9]}`);
    const month = monthArray[Number(`${date[5]}${date[6]}`) - 1];
    const year = Number(`${date[0]}${date[1]}${date[2]}${date[3]}`);
    return `${month} ${day}, ${year}`;
  };

  // * Setting the partial articles array
  React.useEffect(() => {
    if (articlesArray[2]) {
      articlesArray.map((article) => article.publishedAt = createDateText(article.publishedAt));
      setShowLessArray([articlesArray[0], articlesArray[1], articlesArray[2]]);
    } else {
      if (articlesArray[1]) {
        articlesArray.map((article) => article.publishedAt = createDateText(article.publishedAt));
        setShowLessArray([articlesArray[0], articlesArray[1]]);
      }
    }
  }, [articlesArray]);

  // * Generating key for article
  const generateKey = (article) => {
    let tempKey = '';
    if (article) {
      tempKey += article.url;
      tempKey += (Math.random(0, 9) * Math.random(0, 9)).toString();
      tempKey += article.title;
      tempKey += article.urlToImage;
    }
    return tempKey.replace(/ /g, '');
  };

  // ! Nav bar handling
  // * Handling the logout click
  const savedArticlesClick = () => {
    history.push("/saved-articles");
    setIsHomePage(false);
    if (window.innerWidth < 520) {
      toggleNoScroll();
    }
  };

  // * Handling home click
  const homeClick = () => {
    history.push("/");
    setIsHomePage(true);
    if (window.innerWidth < 520) {
      toggleNoScroll();
    }
  };

  // ! Article handling
  // * Handling save article click
  const saveArticleClick = (evt) => {
    const parent = evt.target.parentElement;
    if (evt.target.classList.contains('article__saved')) {
      const articleToSave = {
        keyword: q,
        title: parent.children[3].children[1].textContent,
        date: parent.children[3].children[0].textContent,
        image: `${parent.children[2].currentSrc}`,
        source: `${parent.children[2].alt}`,
        link: `${parent.id}`,
        author: parent.children[3].children[3].textContent,
        text: parent.children[3].children[2].textContent,
        ownerId: currentUser.id,
      };
      usersApiOBJ
        .saveArticle(articleToSave)
        .then((data) => {
          if (data.data) {
            articleToSave._id = data.data._id;
            currentUser.saveArticles[currentUser.savedArticles.length] = articleToSave;
          }
        })
        .catch((err) => {
          console.log(`Error type: ${err}`);
        })

    } else {
      const index = currentUser.savedArticles.findIndex((article) => {
        if(article){
          if(article.link === parent.id){
            
          }
        }
      });
      // usersApiOBJ
      //   .unsaveArticle()
      //   .catch((err) => {
      //     console.log(`Error: ${err}`);
      //   })
      //   .finally(() => {
      //     currentUser.savedArticles.splice(index, 1);
      //   })
      // TODO remove article from finalDB
    }
  };

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
            onArticleSave={saveArticleClick}
            generateKey={generateKey}
          />
        </ProtectedRoute>

        <Route path="/">
          <Header
            isLoggedIn={loggedIn}
            handleButtonClick={handleLoginClick}
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
              onArticleSave={saveArticleClick}
              articles={articlesArray}
              showLessArray={showLessArray}
              isPreloader={isPreloader}
              generateKey={generateKey}
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
          />
          <LoginPopup
            isOpen={isLoginPopupOpen}
            onClose={closeAllPopups}
            linkText="Sign up"
            buttonText="Sign in"
            handleSwitchPopup={handleSignUpClick}
            handleLogin={handleLoginSubmit}
          />
          <AboutTheAuthor />
        </Route>
      </Switch>

      <Footer homeClick={homeClick} />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
