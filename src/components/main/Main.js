import Article from "../article/Article.js";
import * as React from 'react';
import Preloader from "../preloader/Preloader.js";

export default function Main(props) {
	const { isLoggedIn, isOpen, isHomePage, isResults, showLessArray, articles, isPreloader, q, gettingSavedArticles } = props;
	const [isShowenMore, setIsShowenMore] = React.useState(false);
	const [buttonText, setButtonText] = React.useState('Show more');

	const handleButtonClick = () => {
		if (isShowenMore) {
			setIsShowenMore(false);
			setButtonText('Show more');
		} else {
			setIsShowenMore(true);
			setButtonText('Show less');
		}
	}

	return (
		<main className={`main ${isOpen ? 'main__opened' : ''}`}>
			{isResults ?
				<h3 className="main__title">Search results - <span className="main__title_q">'{q}'</span></h3>
				:
				<h3 className="main__title">We couldn't find anything related for <span className="main__title_q">'{q}'</span>. Please search something else.</h3>
			}
			{isPreloader ? <Preloader text="find relevant articles"/> : <></>}
			<ul className={`main__list${isPreloader ? '_closed' : ''}`}>
				{(isShowenMore ? articles : showLessArray).map((article, idnex) => {
					return <Article isHomePage={isHomePage} key={idnex} gettingSavedArticles={gettingSavedArticles} q={q} isLoggedIn={isLoggedIn} article={article} />;
				})}
			</ul>
			{isResults ?
				<button className={`main__button${isPreloader ? '_closed' : ''}`} onClick={handleButtonClick}>{buttonText}</button>
				:
				<></>
			}
		</main>
	);
}
