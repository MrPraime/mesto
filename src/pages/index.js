import '../pages/index.css';

import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"
import Section from "../components/Section.js";
import {  editProfileButton,  nameInput, jobInput, addButton, 
     elements, cardListSelector, initialCards, config, formAdd,formProfile} from '../utils/constants.js'


  const imagePopup = new PopupWithImage('.popup_modal');



// /*Функция создания карточки */

function createCard (item) {
	const cardElement = new Card({data: item, handleCardClick: () => {imagePopup.open(item.name, item.link);
		}
	}, '.card-template');
	return cardElement.generateCard();
}



// /*Инициализация карточек из js */
const cardList = new Section({
	data: initialCards, 
	renderer: (item)=> {
        cardList.addItem(createCard(item))
	}
 }, 
 cardListSelector);
 
cardList.rendererItem();



/* редактировани профиля */

const userInfo = new UserInfo({nameSelector: '.profile__title', aboutSelector: '.profile__subtitle'});

const UserInformation = () => {
	const userData = userInfo.getUserInfo();

	nameInput.value = userData.name;
	jobInput.value = userData.about;
  };

const openedProfileForm = 	new PopupWithForm('.popup_edit-form', ({name, about}) => {
    userInfo.setUserInfo(name, about);
    openedProfileForm.close();
})



/*Открытия попАпа добавления карточки, с функцией добавления карточки */

const openedAddCardForm = new PopupWithForm('.popup_new-item-form', ({title, imageUrl }) => {
	elements.prepend(createCard({name: title, link: imageUrl})); 
		addFormValidator.handleSubmitBtnDisabled();
		openedAddCardForm.close();
	});



/*Добавление слушателей */
openedAddCardForm.setEventListeners();
openedProfileForm.setEventListeners();
imagePopup.setEventListeners();

addButton.addEventListener('click', () => {
	openedAddCardForm.open();
	addFormValidator.resetValidation();
});
editProfileButton.addEventListener('click', ()=> {
	UserInformation();
	openedProfileForm.open()
	editProfileFormValidator.resetValidation();
});




/*валидация */

const addFormValidator  = new FormValidator (config, formAdd);
const editProfileFormValidator  = new FormValidator (config, formProfile);

/*включение валидации */
addFormValidator.enableValidation();
editProfileFormValidator.enableValidation();


