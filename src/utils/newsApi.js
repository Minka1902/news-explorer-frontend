import { reduceDays } from './timeDiff.ts';

class newsApi {
  constructor(props) {
    const date = new Date();
    this._todaysDate = reduceDays(date, 0);
    this._fromDate = reduceDays(date, 7);
    this._authToken = props.auth;
    this._rootUrl = props.rootUrl;
    this._q = 'news';
  }
  
  _fetch = ({ method, data = this._q }) =>
    fetch(`${this._rootUrl}${this._authToken}&from=${this._fromDate}&to=${this._todaysDate}&q=${data}`, {
      method,
    }).then(this._handleResponse)

  _handleResponse = (res) => ( res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  _handleError = (err) => Promise.reject(err);
  
  init = () => Promise.all([this._getInitialArticles(), this._getUserInfo()]);

  getInitialArticles = () => this._fetch({method: "GET"});
  
  searchNewTopic = ( q ) => this._fetch({method: "GET", data: q});

  setQForApi = ( q ) => this._q = q;
}

const newsApiOBJ = new newsApi({auth: 'f848c73aab6d4e34b9fe63f40eff22ed', rootUrl:'https://nomoreparties.co/news/v2/everything?pageSize=51&apiKey='});
export default newsApiOBJ; 
