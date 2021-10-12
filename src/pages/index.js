import '../pages/index.css';

import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithConfirmation} from "../components/PopupWithConfirmation.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"
import Section from "../components/Section.js";
import {Api} from "../components/Api.js";
import {  editProfileButton,  nameInput, jobInput, addButton, 
     elements, cardListSelector, config, formAdd,formProfile, formProfileAvatar, editAvatarButton} from '../utils/constants.js'


const imagePopup = new PopupWithImage('.popup_modal');
const openedConfirmDelCard = new PopupWithConfirmation(".popup_delCard")


  const api = new Api({
	  url: 'https://mesto.nomoreparties.co/v1/cohort-28',
	  headers: {
		authorization: 'ba6ef579-9515-4d2f-b022-6632d7d5b3fd', 
		"Content-Type": "application/json",
	  }
  })




/* Загружаем и отрисовываем карточки с сервера */
api.getInitialCards().then(data => {
	const cardList = new Section({
		data: data, 	
		renderer: (item)=> {
			cardList.addItem(createCard(item))
		}
	 }, 
	 cardListSelector);
	cardList.rendererItem();

});



  /* открытие попАпов */
  const openedProfileForm = new PopupWithForm('.popup_edit-form', ({name, about}) => {
	  api.patchUserInfo(name, about, (wait) => {
		handleWaitLoading(openedProfileForm, wait)
	})
	  .then(
		userInfo.setUserInfo({
		  name: name,
		  about: about,
		}),
		openedProfileForm.close()
	)
    userInfo.setUserInfo(name, about);
    openedProfileForm.close();
});



const openedAddCardForm = new PopupWithForm('.popup_new-item-form', ({title, imageUrl }) => {
	api.postNewCard(title, imageUrl, (wait) => {
		handleWaitLoading(openedAddCardForm, wait)
	})
	.then((res) =>
		elements.prepend(createCard(res)),
		addFormValidator.handleSubmitBtnDisabled(),
		openedAddCardForm.close()
	
	)
});


const openedEditAvatarForm = new PopupWithForm('.popup_edit-avatar', ({newAvatarUrl}) => {
	api.patchNewAvatar(newAvatarUrl, (wait) => {
		handleWaitLoading(openedEditAvatarForm, wait)
	})
	.then(() => {
		userInfo.setUserAvatar(newAvatarUrl);
		editProfileAvatarformFormValidator.handleSubmitBtnDisabled();
		openedEditAvatarForm.close();
	})
});


// /*Функция отображения загрузки */
function handleWaitLoading(popup, wait) {
	popup.loading(wait)
	if(!wait){
		popup.close()
	}
}

// /*Функция создания карточки */


function createCard (item, myCard = false) {
 
	const cardElement = new Card({data: item, handleCardClick: () => {imagePopup.open(item.name, item.link)
		}, 
	},  (id, evt) => {
		openedConfirmDelCard.open();
		openedConfirmDelCard.confirmDeleteCard(() => {
			api.deleteCard(id).then(() =>{
			cardElement.DelCard(evt);
			openedConfirmDelCard.close();
		})
		});
	}, userInfo.getUserInfo().name,
	(liked) => {
		if (liked) {
		  api.removeLike(item._id);
		  return false;
		} else {
		  api.addLike(item._id);
		  return true;
		}
	  },

	'.card-template');
	return cardElement.generateCard(myCard);
}


/* профиль */

api.getUserInfo();

const userInfo = new UserInfo({nameSelector: '.profile__title', aboutSelector: '.profile__subtitle'},
'.profile',
() => {}
);

const userInformation = () => {
	const userData = userInfo.getUserInfo();

	nameInput.value = userData.name;
	jobInput.value = userData.about;
  };





/*Добавление слушателей */
openedAddCardForm.setEventListeners();
openedProfileForm.setEventListeners();
imagePopup.setEventListeners();
openedConfirmDelCard.setEventListeners();
openedEditAvatarForm.setEventListeners();

addButton.addEventListener('click', () => {
	openedAddCardForm.open();
	addFormValidator.resetValidation();
});
editProfileButton.addEventListener('click', ()=> {

	
	userInformation();
	openedProfileForm.open()
	editProfileFormValidator.resetValidation();
});

editAvatarButton.addEventListener('click', ()=> {
	openedEditAvatarForm.open();
	editProfileAvatarformFormValidator.resetValidation();
});




/*валидация */

const addFormValidator  = new FormValidator (config, formAdd);
const editProfileFormValidator  = new FormValidator (config, formProfile);
const editProfileAvatarformFormValidator = new FormValidator (config, formProfileAvatar);

/*включение валидации */
editProfileAvatarformFormValidator.enableValidation();
addFormValidator.enableValidation();
editProfileFormValidator.enableValidation();


