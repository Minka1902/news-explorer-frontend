import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as React from 'react'
import usersApiOBJ from '../../utils/usersApi';
import Article from '../article/Article';

export default function SavedArticles(props) {
	const currentUser = React.useContext(CurrentUserContext);
	let [savedArticles, setSavedArticles] = React.useState([]);
	const { onArticleSave, generateKey } = props;
	const [isSavedArticles] = React.useState(savedArticles.length > 0);
	const keywordsArray = [];
	let needToAdd = true;

	React.useEffect(() => {
		usersApiOBJ
			.getArticles()
			.then((data) => {
				if (data.articles) {
					const tempArray = [];
					data.articles.map((article) => {
						if(article.ownerId === currentUser.id){
							tempArray[tempArray.length] = article;
						}
					})
					setSavedArticles(tempArray);
				}
			})
			.catch((err) => {
				console.log(`Error type: ${err.message}`);
			});
	}, []);

	function checkAuthors() {
		if (savedArticles[0]) {
			// eslint-disable-next-line
			savedArticles.map((article) => {
				for (let i = 0; i < keywordsArray.length; i++) {
					if (article.keyword === keywordsArray[i]) {
						needToAdd = false;
					}
				}
				if (needToAdd) {
					keywordsArray[keywordsArray.length] = article.keyword;
				} else {
					needToAdd = true;
				}
			});
			let finalText = '';
			if (keywordsArray.length <= 3) {
				if (keywordsArray.length === 3) {
					finalText = `${keywordsArray[0]}, ${keywordsArray[1]} and ${keywordsArray[2]}`;
				} else {
					if (keywordsArray.length === 2) {
						finalText = `${keywordsArray[0]} and ${keywordsArray[1]}`;
					} else {
						if (keywordsArray.length === 1) {
							finalText = keywordsArray[0];
						}
					}
				}
			} else {
				finalText = `${keywordsArray[0]}, ${keywordsArray[1]}, ${keywordsArray[2]} and ${keywordsArray.length - 3} others`
			}

			return finalText;
		}
		return 'You have no saved articles.'
	}

	return (
		<section className="saved-articles">
			<h1 className='saved-articles__title'>Saved articles</h1>
			<h2 className='saved-articles__subtitle'>{currentUser.username}, you have {savedArticles.length} saved articles</h2>
			<p className='saved-articles__by'>By keywords: <span className='saved-articles__by_keywords'>{checkAuthors()}</span></p>
			<ul className={`saved-articles__list${isSavedArticles ? '' : '_closed'}`}>
				{savedArticles.map((article) =>
					<Article key={generateKey(article)} toggleSave={onArticleSave} isSaved={true} article={article} />
				)}
			</ul>
		</section>
	);
}
