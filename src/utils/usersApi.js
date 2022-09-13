class usersApi {
  constructor(props) {
    this._authToken = props.auth;
    this._rootUrl = props.rootUrl;
    this._body = { "dataSource": "finalProject", "database": "finalDB", "collection": "users" };
  }

  _fetch = ({ method = "POST" }) =>
    fetch(`https://data.mongodb-api.com/app/data-siulj/endpoint/data/v1/action/findOne`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Host": "<calculated when request is sent>",
        "Content-Length": "<calculated when request is sent>",
        "api-key": this._authToken
      },
      body: {
        "dataSource": "finalProject",
        "database": "finalDB",
        "collection": "users",
        "filter": { "username": "Michael" }
      }, // JSON.stringify(data)
      }).then(this._handleResponse)

  _handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  _handleError = (err) => Promise.reject(err);

  _getUserInfo = () => this._fetch({ method: "POST" });

  init = () => Promise.all(this._getUserInfo());

  submitNewArticle = ({ name, link }) => this._fetch({ url: 'articles', method: 'POST', data: { name, link } });

  unsaveArticle = (articleId) => this._fetch({ url: `articles/${articleId}`, method: 'DELETE' });

  saveArticle = (article) => this._fetch('/articles', 'POST', article);
}

const usersApiOBJ = new usersApi({ auth: '4den6CaDRe58L5Jx85R7E38xpVcn8TZcyqznqZVpKFAjeqqG80eZQc1WCtRNM1Aq', rootUrl: 'https://data.mongodb-api.com/app/data-siulj/endpoint/data/v1' });
export default usersApiOBJ;
