import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as React from 'react';
import Article from '../article/Article';
import { sortArrayByFrequency, formatKeywordsString } from '../../constants/functions';

export default function SavedArticles(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const { savedArticles, gettingSavedArticles } = props;
	const [isSavedArticles] = React.useState(savedArticles.length > 0);

	function checkAuthors() {
		if (savedArticles[0]) {
			// eslint-disable-next-line
			const keywordsArray = sortArrayByFrequency(savedArticles);
			const finalText = formatKeywordsString(keywordsArray);
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
				{savedArticles.map((article, index) =>
					<Article gettingSavedArticles={gettingSavedArticles} key={index} isHomePage={false} article={article} />
				)}
			</ul>
		</section>
	);
}
