export class Api {
    constructor({url, headers}) {
      this._url = url;
      this._headers = headers;
    }


    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
       })
       .then((result) => {
        return {
          name: result.name,
          about: result.about,
          avatarUrl: result.avatar,
        };
      }).catch(err => {
        console.error(err);
        
        return [];
    });
    }
  
    getInitialCards() {
       return  fetch(`${this._url}/cards `,  {
        headers: {
          authorization: 'ba6ef579-9515-4d2f-b022-6632d7d5b3fd',
        }
      })
       .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);

      }).catch(err => {
        console.error(err);
        
        return [];
    });
  } 


    patchUserInfo(name, about, loading){
      loading(true);
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            'Content-Type': 'application/json',

            body: JSON.stringify({
                name: name,
                about: about
            })
                 })
                 .then(res => {
                  if (res.ok) {
                    return res.json();
                  }
          
                  return Promise.reject(`Ошибка: ${res.status}`);
                })
            .catch(err => {
                   console.error(err);
                 return [];
                 }) 
            .finally(() => {
                  loading(false);
                })
                 
    };

    postNewCard(name, link, loading){
      loading(true);
      return fetch(`${this._url}/cards `, {
        method: 'POST',
        headers: this._headers,

        body: JSON.stringify({
            name: name,
            link: link
        })
             }).then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
             .catch(err => {
              console.error(err);
            return [];
            })
            .finally(() => {
              loading(false);
            })

    }


    deleteCard(id){
      return fetch(`${this._url}/cards/${id}`,  {
        method: "DELETE",
        headers: this._headers

      }).then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }
 
    patchNewAvatar(avatarUrl, loading){
      loading(true);
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,

        body: JSON.stringify({
           avatar: avatarUrl,
        })
             }).then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
             .catch((err) => {
              console.log(err);
            }) 
            .finally(() => {
              loading(false);
            })
    }


    addLike(id){
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
             }).then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
             
             .catch((err) => {
              console.log(err);
            }) 
    }

    removeLike(id){
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
             })
             .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
             .catch((err) => {
              console.log(err);
            }) 
    }


   }

   