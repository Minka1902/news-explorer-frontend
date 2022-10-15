import * as React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import usersApiOBJ from '../../utils/usersApi';

export default function Article(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const { article, isLoggedIn, q, isHomePage, gettingSavedArticles } = props;
	const [isHovering, setIsHovering] = React.useState(false);
	const [didSave, setDidSave] = React.useState(article.ownerId ? true : false);
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
					.then((data) => {
						if (data) {
							articleToSave._id = data._id;
							setDidSave(true);
						}
					})
					.catch((err) => {
						console.log(`Error type: ${err.message}`);
					})
					.finally(() => {
						gettingSavedArticles();
					});
			} else {
				if ((evt.target.classList.contains('article__delete')) || (evt.target.classList.contains('article__saved_active'))) {
					for (let i = 0; i < currentUser.savedArticles.length; i++) {
						if (currentUser.savedArticles[i]._id === evt.target.parentElement.id) {
							idToDelete = currentUser.savedArticles[i]._id;
						}
					}
					usersApiOBJ 			// * unsaving the article
						.unsaveArticle(idToDelete)
						.then((deletedArticle) => {
							if (deletedArticle) {
								setDidSave(false);
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
	};

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	const onArticleClick = (evt) => {
		if ((!evt.target.classList.contains("article__saved")) && (!evt.target.classList.contains("article__delete")) && (!evt.target.classList.contains("article__saved_active"))) {
			window.open(article.url, '_blank', 'noopener,noreferrer');
		// } else {
		// 	if ((evt.target.classList.contains("article__saved")) || (evt.target.classList.contains('article__delete')) || (evt.target.classList.contains('article__saved_active'))) {
		// 		// saveArticleClick(evt);
		// 	}
		}
	}

	React.useEffect(() => {
		if (isHomePage) {
			if (article && currentUser) {			// eslint-disable-next-line
				currentUser.savedArticles.map((savedArticle) => {
					if (article.url === savedArticle.url) {
						setDidSave(true);
					} else {
						setDidSave(false);
					}
				});
			}
		}											// eslint-disable-next-line
	}, [currentUser, didSave]);

	return (
		<li className="article" id={article._id ? article._id : ''} key={article.id} onClick={onArticleClick}>
			<button className={`${isHomePage ? "article__saved" : "article__delete "}${didSave ? '_active' : ''}`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={saveArticleClick} />
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
}
