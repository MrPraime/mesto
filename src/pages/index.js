import '../pages/index.css';


import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"
import Section from "../components/Section.js";


const popupProfile = document.querySelector('.popup_edit-form');
const editProfileButton = document.querySelector('.profile__edit-button');
const formProfileElement = document.querySelector('.popup__form-profile'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_about');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const addNewCardPopUp = document.querySelector('.popup_new-item-form');
const elements = document.querySelector('.elements');
const modal = document.querySelector('.popup_modal');
const titleImput = document.querySelector('.popup__input_type_title');
const urlImput = document.querySelector('.popup__input_type_url');
const formNewCard = document.querySelector('.popup__form_new_card');
const cardListSelector = '.elements';

const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	},
	
  ]; 
//   console.log(modal);
// const cardList = new Section({
// 	data: initialCards, 
// 	renderer: (item)=> {
// 		const card = new Card({
// 			data: item,
// 			handleCardClick: () => {
// 				const openedImage = new PopupWithImage(item, modal);
// 				console.log(item)
// 				openedImage.setEventListeners()
// 				openedImage.open();
// 			}
// 		}, '.card-template');
//         const cardElement = card.generateCard();

//         cardList.addItem(cardElement);
// 	}
//  }, 
//  cardListSelector);

const imagePopup = new PopupWithImage(modal);

const cardList = new Section({
	data: initialCards, 
	renderer: (item)=> {
		const card = new Card({
			data: item,
			handleCardClick: () => {
				imagePopup.open(item);			
			}
		}, '.card-template');
        const cardElement = card.generateCard();

        cardList.addItem(cardElement);
	}
 }, 
 cardListSelector);
 
cardList.rendererItem();



/* Функции редактирования профилья */
const userInfo = new UserInfo({
	nameSelector: title,
	aboutSelector: subtitle
});


const setUserInfo = () => {
	const userData = userInfo.getUserInfo();
	
	nameInput.value = userData.name;
	jobInput.value = userData.about;
  };

const openedProfileForm = new PopupWithForm({
	popUpSelector: popupProfile,
	formSelector: formProfileElement,
	handleFormSubmit: (data) => {
		userInfo.setUserInfo(data);

		openedProfileForm.close();
	}
});


openedProfileForm.setEventListeners();

editProfileButton.addEventListener('click', ()=> {
	setUserInfo();
	openedProfileForm.open()
});


/* функция открытия попапа и добавления новой карточки */

const openedAddCardForm = new PopupWithForm({ 
	popUpSelector: addNewCardPopUp,
	formSelector: formNewCard,
	handleFormSubmit:() => { 
		const newCardUrl = urlImput.value;
		const newCardTitle = titleImput.value;
		const NewCardItem = {
			name: newCardTitle,
			link: newCardUrl
		}
		const newCard = new Card({data:NewCardItem,
			handleCardClick: () => {
				const openedImage = new PopupWithImage(NewCardItem ,modal);
				openedImage.setEventListeners()
				openedImage.open();
			}
		
		}, '.card-template');
		const cardElement = newCard.generateCard();
		elements.prepend(cardElement);

		addFormValidator.handleSubmitBtnDisabled();

    	openedAddCardForm.close();
}
});

openedAddCardForm.setEventListeners();
	
addButton.addEventListener('click', () => {
	openedAddCardForm.open();
});


const formAdd = document.forms.newItemForm;
const formProfile = document.forms.profileForm;

export const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__save-button',
	inactiveButtonClass: 'popup__save-button_inactive',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active',
}

const addFormValidator  = new FormValidator (config, formAdd);
const editProfileFormValidator  = new FormValidator (config, formProfile);

addFormValidator.handleSubmitBtnDisabled();
addFormValidator.enableValidation();
editProfileFormValidator.enableValidation();


