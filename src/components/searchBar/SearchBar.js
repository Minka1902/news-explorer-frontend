import React from "react";

export default function SearchBar(props) {
	const { onSubmit } = props;
	const [q, setQ] = React.useState('');

	const mouseUp = (evt) => {
		evt.target.classList.remove('search-bar__button_active');
	}

	const mouseDown = (evt) => {
		evt.target.classList.add('search-bar__button_active');
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onSubmit(q);
	}

	return (
		<div className="search-bar">
			<h1 className="search-bar__title">What's going on in the world?</h1>
			<h3 className="search-bar__subtitle">Find the latest news on any topic and save them in your personal account.</h3>
			<form className="search-bar__form" onSubmit={handleSubmit} name="search-bar-form" id="search-bar-form">
				<input
					value={q}
					onChange={(evt) => setQ(evt.currentTarget.value)}
					className="search-bar__input"
					type="text" id="search-bar-input"
					name="search-bar-input"
					placeholder="Nature" />
				<button className="search-bar__button" type="submit" onClick={mouseDown} onMouseUp={mouseUp}>Search</button>
			</form>
		</div>
	);
}
