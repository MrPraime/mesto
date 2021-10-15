
// export default class UserInfo {
//     constructor({nameSelector, aboutSelector}, profileSelector,){
//        this._name = document.querySelector(nameSelector);
//        this._about = document.querySelector(aboutSelector);
//        this._profile = document.querySelector(profileSelector);
//        this._profileAvatar = this._profile.querySelector(".profile__avatar");
//     }

//     getUserInfo() {
//         return {name: this._name.textContent, about: this._about.textContent};
//     }

//     setUserInfo(name, about) {
//         this._name.textContent = name;
//         this._about.textContent = about;
//     }

//     setUserAvatar(avatarUrl) {
//         this._profileAvatar.setAttribute("src", avatarUrl);
//     }

// }



export default class UserInfo {
    constructor({nameSelector, aboutSelector}, profileSelector, profileAvatarSelector){
       this._name = document.querySelector(nameSelector);
       this._about = document.querySelector(aboutSelector);
       this._profile = document.querySelector(profileSelector);
       this._profileAvatar = this._profile.querySelector(profileAvatarSelector);
       this._userID = 0;
    }

    getUserInfo() { 
        return {name: this._name.textContent, about: this._about.textContent, _id: this._userID,};  
    }


    setUserInfo(name, about, avatarUrl, _id) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._profileAvatar.src = avatarUrl;
        this._userID = _id;

    }

    setUserAvatar(avatarUrl) {
        this._profileAvatar.setAttribute("src", avatarUrl);
    }

}




