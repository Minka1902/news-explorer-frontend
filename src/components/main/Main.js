import Article from "../article/Article.js";
import * as React from 'react';
import Preloader from "../preloader/Preloader.js";

export default function Main(props) {
	const { isLoggedIn, onArticleSave, showLessArray, articles, isPreloader } = props;
	const [ isShowenMore, setIsShowenMore ] = React.useState(false);
	const [ buttonText, setButtonText ] = React.useState('Show more');

	const handleButtonClick = () => {
		if(isShowenMore){
			setIsShowenMore(false);
			setButtonText('Show more');
		} else {
			setIsShowenMore(true);
			setButtonText('Show less');
		}
	}
	
	return (
		<section className='main'>
			<h3 className="main__title">Search results</h3>
			{isPreloader? <Preloader />: <></>}
			<ul className={`main__list${isPreloader?'_closed':''}`}>
				{(isShowenMore?articles:showLessArray).map((article) => {
					return <Article key={article.source._id} isLoggedIn={isLoggedIn} toggleSave={onArticleSave} article={article} />;
				})}
			</ul>
			<button className={`main__button${isPreloader?'_closed':''}`} onClick={handleButtonClick}>{buttonText}</button>
		</section>
	);
  }
