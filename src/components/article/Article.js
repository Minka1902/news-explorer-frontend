import * as React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import usersApiOBJ from '../../utils/usersApi';

export default function Article(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const { article, isLoggedIn, q, isHomePage, gettingSavedArticles } = props;
	const [isHovering, setIsHovering] = React.useState(false);
	const [isSaved, setIsSaved] = React.useState(false);
	let idToDelete = '';

	// ! Article handling
	// * Handling save article click
	const saveArticleClick = (evt) => {
		if (currentUser) {
			if (evt.target.classList.contains('article__saved')) {
				const articleToSave = {
					keyword: `${q}`,
					author: `${article.author}`,
					title: `${article.title}`,
					content: `${article.content}`,
					publishedAt: `${article.publishedAt}`,
					url: `${article.url}`,
					urlToImage: `${article.urlToImage}`,
					ownerId: `${currentUser.id}`,
					source: `${article.source.name}`,
				};
				usersApiOBJ 					// * saving the article
					.saveArticle(articleToSave)
					.then((savedArticle) => {
						if (savedArticle) {
							setIsSaved(true);
						}
					})
					.catch((err) => {
						console.log(`Error type: ${err.message ? err.message : err}`);
					})
					.finally(() => {
						gettingSavedArticles();
					});
			} else {
				if ((evt.target.classList.contains('article__delete')) || (evt.target.classList.contains('article__saved_active'))) {
					for (let i = 0; i < currentUser.savedArticles.length; i++) {
						if (currentUser.savedArticles[i].urlToImage === evt.target.parentElement.children[2].currentSrc) {
							idToDelete = currentUser.savedArticles[i]._id;
						} else {
							if (currentUser.savedArticles[i].urlToImage === evt.target.parentElement.children[3].currentSrc) {
								idToDelete = currentUser.savedArticles[i]._id;
							}
						}
					}
					const jwt = localStorage.getItem('jwt');
					if (jwt && idToDelete !== '') {
						usersApiOBJ 			// * unsaving the article
							.unsaveArticle(idToDelete)
							.then((deletedArticle) => {
								if (deletedArticle) {
									setIsSaved(false);
								}
							})
							.catch((err) => {
								console.log(`Unsave article, ${err}`)
							})
							.finally(() => {
								gettingSavedArticles();
							});
					}
				}
			}
		}
	};

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	// * opens the article in a new window
	const onArticleClick = (evt) => {
		if ((!evt.target.classList.contains("article__saved")) && (!evt.target.classList.contains("article__delete")) && (!evt.target.classList.contains("article__saved_active"))) {
			window.open(article.url, '_blank', 'noopener,noreferrer');
		}
	}

	// * determines if the article is saved or not
	React.useEffect(() => {
		if (isHomePage) {
			if (article && currentUser) {			// eslint-disable-next-line
				currentUser.savedArticles.map((savedArticle) => {
					if (article.url === savedArticle.url) {
						setIsSaved(true);
					}
				});
			}
		}											// eslint-disable-next-line
	}, []);

	return (
		<li className="article" id={article._id ? article._id : article.url} onClick={onArticleClick}>
			<button className={`${isHomePage ? "article__saved" : "article__delete "}${isSaved ? '_active' : ''}`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={saveArticleClick} />
			<h3 className={`article__save-massage ${isHovering ? 'article__save-massage_active' : ''}${isLoggedIn ? '_not' : ''}`}>{!isHomePage ? 'Remove from saved' : 'Sign in to save article'}</h3>
			{!isHomePage ? <h3 className='article__saved_keyword'>{article.keyword}</h3> : <></>}
			<img className="article__image" src={article.urlToImage} alt={article.source.name ? article.source.name : article.source} />
			<div className="article__container">
				<h3 className="article__date">{article.publishedAt}</h3>
				<h2 className="article__title">{article.title}</h2>
				<p className="article__text">{article.content}</p>
				<p className="article__author text-hiding">{article.author ? article.author : "No author found"}</p>
			</div>
		</li>
	);
};
