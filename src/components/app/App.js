import newsApiOBJ from '../../utils/newsApi';
import usersApiOBJ from '../../utils/usersApi';
import { findMonth } from '../../constants/constants';
import * as React from 'react'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Header from '../header/Header';
import Projects from '../projects/Projects';
import AboutTheAuthor from '../aboutTheAuthor/AboutTheAuthor';
import Footer from '../footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import CurrentProjectContext from '../../contexts/CurrentProjectContext';
import * as auth from '../../utils/auth';
import SignUpPopup from '../popup/SignUpPopup';
import LoginPopup from '../popup/LoginPopup';
import PopupProject from '../popup/PopupProject';
import Main from '../main/Main';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import SavedArticles from '../savedArticles/SavedArticles';
import SearchBar from '../searchBar/SearchBar';
import NotFound from '../notFound/NotFound';
import Map from '../map/Map';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayersControl, useMap } from "react-leaflet";

function App() {
  // eslint-disable-next-line
  const currentUserContext = React.useContext(CurrentUserContext);
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState();
  const [currentProject, setCurrentProject] = React.useState();
  const [articlesArray, setArticlesArray] = React.useState([]);
  const [showLessArray, setShowLessArray] = React.useState([]);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [isHomePage, setIsHomePage] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isResultsOpen, setIsResultsOpen] = React.useState(true);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState();
  const [isProjectPopupOpen, setIsProjectPopupOpen] = React.useState();
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [q, setQ] = React.useState('news');
  const [isResults, setIsResults] = React.useState(true);
  const [isUserFound, setIsUserFound] = React.useState(true);
  const [position, setPosition] = React.useState([]);

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     SCROLL handling     !!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const noScroll = () => html.classList.add('no-scroll');
  const scroll = () => html.classList.remove('no-scroll');

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     POPUP handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const handleSignUpClick = () => {
    noScroll();
    setIsSignUpPopupOpen(true);
  };

  const handleProjectClick = () => {
    noScroll();
    setIsProjectPopupOpen(true);
    setIsHomePage(false);
  };

  const handleLoginClick = () => {
    noScroll();
    setIsLoginPopupOpen(true);
  };

  const closeAllPopups = ({ isProject }) => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsProjectPopupOpen(false);
    if ((window.innerWidth < 520) && (!isProject)) {
      noScroll();
    } else {
      scroll();
    }
  };

  function Locate() {
    const map = useMapEvents({});
    map.locate({ setView: true })
      .on('locationfound', function (e) {
        if (e) {
          setPosition(e.latlng)
          return map.removeEventListener('locationfound');
        }
      })
      .on('locationerror', function (e) {
        console.log(e);
        alert("Location access has been denied.");
      });
    map.setZoom(5);
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     USER handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const handleLogout = () => {
    setLoggedIn(false);
    setIsHomePage(true);
    setSavedArticles([]);
    localStorage.removeItem('jwt');
    history.push("/");
  };

  const handleLoginSubmit = (email, password) => {
    usersApiOBJ
      .login({ email, password })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
        }
        if (data.user._id) {
          setIsUserFound(true);
          findUserInfo();
        }
      })
      .catch((err) => {
        console.log(`Error type: ${err.message}`);
        if ((err === 'Error: 404') || (err.message === 'Failed to fetch')) {
          setIsUserFound(false);
        }
        setLoggedIn(false);
      })
      .finally(() => {
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
        closeAllPopups({ isProject: false });
      });
  };

  const handleSignupSubmit = (email, password, username) => {
    usersApiOBJ
      .signUp({ email, password, username })
      .catch((err) => {
        console.log(`Error type: ${err.message}`)
      })
      .finally(() => {
        closeAllPopups({ isProject: false });
        setIsLoginPopupOpen(true);
      })
  };

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
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     OTHER handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const handleSearch = (qInput = q) => {
    if (qInput && (qInput.length > 2)) {
      setIsPreloader(true);
      setQ(qInput);
      newsApiOBJ
        .searchNewTopic(qInput)
        .then((data) => {
          if (data.totalResults !== 0) {
            setArticlesArray(data.articles);
            setIsResults(true);
          } else {
            setArticlesArray(data.articles);
            setShowLessArray(data.articles);
            setIsResults(false);
          }
          setIsHomePage(true);
          history.push('/');
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

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     ROUTE handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const savedArticlesClick = () => {
    history.push("/saved-articles");
    setIsHomePage(false);
    if (window.innerWidth < 520) {
      scroll();
    }
  };

  const homeClick = () => {
    history.push("/");
    setIsHomePage(true);
    if (window.innerWidth < 520) {
      scroll();
    }
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     EVENT handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  React.useEffect(() => {     // * close popup by ESCAPE 
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups({ isProject: true });
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {     // * close popup by CLICK
    const closeByClick = (evt) => {
      if (evt.target.classList.contains('popup_type_project')) {
        closeAllPopups({ isProject: true });
      } else {
        if (evt.target.classList.contains("popup")) {
          closeAllPopups({ isProject: false });
        }
      }
    }

    document.addEventListener('mouseup', closeByClick);
    return () => document.removeEventListener('mouseup', closeByClick);
  });

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     INIT handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  React.useEffect(() => {
    isAutoLogin();            // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    gettingSavedArticles();            // eslint-disable-next-line
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentProjectContext.Provider value={{ currentProject, setCurrentProject }}>
        <Header
          isLoggedIn={loggedIn}
          isHomePage={isHomePage}
          homeClick={homeClick}
          handleButtonClick={handleLoginClick}
          savedArticlesClick={savedArticlesClick}
          handleLogout={handleLogout}
          noScroll={noScroll}
          scroll={scroll}
          theme={!isHomePage}
        >
          {isHomePage ? <SearchBar onSubmit={handleSearch} /> : <></>}
        </Header>

        <Switch>
          <ProtectedRoute exact path="/saved-articles" loggedIn={loggedIn}>
            <SavedArticles
              savedArticles={savedArticles}
              gettingSavedArticles={gettingSavedArticles}
            />
          </ProtectedRoute>

          <Route exact path="/">
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
                isResults={isResults}
              />
            }
            <Projects openProject={handleProjectClick} />
            <AboutTheAuthor />
          </Route>

          <Route exact path='/project'>
            <section id='project'>
              <div className='section__content'>
                <h1 className='section__title'>{currentProject ? currentProject.name : ''}</h1>
                <p className='section__description'>{currentProject ? currentProject.description : ''}</p>
              </div>

              <Map coords={position} >
                <Locate />
              </Map>
            </section>
          </Route>
        </Switch>

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
          isFound={isUserFound}
        />

        <PopupProject
          isOpen={isProjectPopupOpen}
          onClose={closeAllPopups}
        />
        <Footer homeClick={homeClick} />
      </CurrentProjectContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default withRouter(App);
