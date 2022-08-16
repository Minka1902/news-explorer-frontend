export default function SearchBar(props) {
	const { onSubmit } = props;

	return (
		<div className="search-bar">
			<h1 className="search-bar__title">What's going on in the world?</h1>
			<h3 className="search-bar__subtitle">Find the latest news on any topic and save them in your personal account.</h3>
			<form className="search-bar__form" onSubmit={onSubmit} name="search-bar-form" id="search-bar-form">
				<input className="search-bar__input" type="text" id="search-bar-input" name="search-bar-input" placeholder="Nature" />
				<button className="search-bar__button" type="submit">Search</button>
			</form>
		</div> 
	);
  }
  