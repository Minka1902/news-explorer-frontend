import * as React from 'react';

export default function Article(props) {
	const { article, isLoggedIn, isSaved, toggleSave } = props;
	const [isHovering, setIsHovering] = React.useState(false);
	const [didSave, setDidSave] = React.useState(isSaved || false);

	const onSaveClicked = (evt) => {
		if(isLoggedIn){
			if(!didSave){
				toggleSave(evt);
				setDidSave(true);
				// TODO add to saved
			} else {
				toggleSave(evt);				
				setDidSave(false);
				// TODO remove from saved
			}
		}
	}

	const handleMouseOver = () => {
		setIsHovering(true);
	};
	
	const handleMouseOut = () => {
		setIsHovering(false);
	};

	const onArticleClick = (evt) => {
		if((!evt.target.classList.contains("article__saved")) && (!evt.target.classList.contains("article__delete_active"))){
			window.open(article.url, '_blank', 'noopener,noreferrer');
		}
	}

  	return (
  	  <li className="article" id={article.url} key={article.id} onMouseUp={onArticleClick}>
			<button className={`${isSaved?"article__delete":"article__saved"}${didSave?'_active':''}`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={onSaveClicked} />
			<h3 className={`article__save-massage ${isHovering?'article__save-massage_active':''}${isLoggedIn?'_not':''}`}>{isSaved?'Remove from saved':'Sign in to save article'}</h3>
			{isSaved ? <h3 className='article__saved_keyword'>{article.keyword}</h3> : <></>}
			<img className="article__image" src={article.urlToImage} alt={article.source.name} />
			<div className="article__container">
				<h3 className="article__date">{article.publishedAt}</h3>
				<h2 className="article__title">{article.title}</h2>
				<p className="article__text">{article.content}</p>
				<p className="article__author text-hiding">{article.author?article.author:"No author found"}</p>
			</div>
		</li>
  	);
}
