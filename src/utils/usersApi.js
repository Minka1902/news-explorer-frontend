class usersApi {
  constructor(props) {
    this._authToken = props.auth;
    this._rootUrl = props.rootUrl;
  }

  _fetch = ({ method = "POST", url = '/', data }) =>
    fetch(`${this._rootUrl}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Host": "<calculated when request is sent>",
        "Content-Length": "<calculated when request is sent>",
        "api-key": this._authToken
      },
      body: JSON.stringify(data),
      }).then(this._handleResponse)

  _handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  _getUserInfo = () => this._fetch({ method: "POST", url: "/signin" });

  login = ({email, password}) => this._fetch({ method: "POST", url: "/signin", data: { email, password }});

  signUp = ({email, password, username}) => this._fetch({ method: "POST", url: "/signup", data: { email, password, username }})

  submitNewArticle = ({ name, link }) => this._fetch({ url: '/articles', method: 'POST', data: { name, link } });

  unsaveArticle = (articleId) => this._fetch({ url: `/articles/${articleId}`, method: 'DELETE' });

  saveArticle = (article) => this._fetch('/articles', 'POST', article);
}

const usersApiOBJ = new usersApi({ auth: '4den6CaDRe58L5Jx85R7E38xpVcn8TZcyqznqZVpKFAjeqqG80eZQc1WCtRNM1Aq', rootUrl: 'https://michaelscharff-api.herokuapp.com' });
export default usersApiOBJ;
