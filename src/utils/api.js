import { reduceDays } from './timeDiff.ts';

class Api {
  constructor(props) {
    const date = new Date();
    this._todaysDate = reduceDays(date, 0);
    this._fromDate = reduceDays(date, 7);
    this._authToken = props.auth;
    this._rootUrl = props.rootUrl;
    this._q = 'news';
  }
  
  _fetch = ({ url, method, data = this._q }) =>
    fetch(`${this._rootUrl}${this._authToken}&from=${this._fromDate}&to=${this._todaysDate}&q=${data}`, {
      method,
      // headers: {
      //   // authorization: this._authToken,
      //   'Content-Type': 'application/json',
      // },
    }).then(this._handleResponse)

  _handleResponse = (res) => ( res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  _handleError = (err) => Promise.reject(err);

  _getUserInfo = () => this._fetch({ url: 'users/me' });
  
  init = () => Promise.all([this._getInitialArticles(), this._getUserInfo()]);

  getInitialArticles = () => this._fetch({method: "GET"});
  
  searchNewTopic = ( q ) => this._fetch({method: "GET", data: q});

  setQForApi = ( q ) => this._q = q;

  submitNewArticle = ({ name, link }) => this._fetch({ url: 'articles', method: 'POST', data: { name, link } });

  deleteArticle = (articleId) => this._fetch({ url: `articles/${articleId}`, method: 'DELETE' });
  
  saveArticle = (article) => this._fetch('/articles', 'POST', article);
}

export const userApi = new Api('http://localhost:27017/users');
export const newsApi = new Api({auth: 'f848c73aab6d4e34b9fe63f40eff22ed', rootUrl:'https://nomoreparties.co/news/v2/everything?pageSize=50&apiKey='});
