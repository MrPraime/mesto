let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let editProfileButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form'); 
let nameInput = document.querySelector('.popup__input_type_name'); 
let jobInput = document.querySelector('.popup__input_type_about');
let profileName = document.querySelector('.popup__form').elements.name;
let about = document.querySelector('.popup__form').elements.about;
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const popUpNew = document.querySelector('.popup_new-item-form');
const closePopupButtonNew = document.querySelector('.popup__close-button-new');
const elements = document.querySelector('.elements');
const createButton = document.querySelector('.popup__create-button');
const likeButton = document.querySelector('.element__like-button');
const cardTemplate = document.querySelector('#cards').content;
const imageCloseButton = document.querySelector(".popup__close-button_modal");
const titleCard = document.querySelector('.popup__input_type_title');
const url = document.querySelector('.popup__input_type_url');
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
	}
  ]; 
/* функция загрузка карточек из массива*/
  initialCards.forEach(function(cards) {
	const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

	cardElement.querySelector('.element__image').src = cards.link;
	cardElement.querySelector('.element__text').textContent = cards.name;

	elements.prepend(cardElement);
  });

/* Функции создания новой карточки */

function loadCard(imageValue, textValue) {
	const cardElement = document.querySelector('.element').cloneNode(true);

	cardElement.querySelector('.element__image').src = imageValue;
	cardElement.querySelector('.element__text').textContent = textValue;
	
	
	elements.prepend(cardElement);

	document.querySelectorAll('.element__like-button').forEach(function(evt){
		evt.addEventListener('click', like);
	 });
	
	document.querySelectorAll('.element__delete-button').forEach(function(evt){
		evt.addEventListener('click', del);
	 });

	document.querySelectorAll('.element__image').forEach(function(evt) {
		evt.addEventListener('click', openImage);
	});
}

/* функция добавления новой карточки */
function load() {
	loadCard(url.value, titleCard.value);
	titleCard.value = '';
	url.value = '';
	closePopupNew()
}

/*Функция открытия попапа со значениями передаваемыми из profile__title  */
function openPopup() {
	popup.classList.add('popup_is-opened');
	profileName.value = title.textContent;
	about.value = subtitle.textContent;
}
/*Функция закрытия*/

function closePopup() {
	popup.classList.remove('popup_is-opened');
}

/* Функции открытия и закрытия нового попапа*/

function openPopupNew() {
	popUpNew.classList.add('popup_is-opened');
}

function closePopupNew() {
	popUpNew.classList.remove('popup_is-opened');
}

/*Функция внесения новых значений из инпутов*/
function formSubmitHandler(evt) {
    evt.preventDefault();
	
	let name = nameInput.value
	let job = jobInput.value;
	
	title.textContent = name;
	subtitle.textContent = job;
	
	closePopup()
}

/* Функция открытия картинки */
const modal = document.querySelector('.popup_modal');
const img = document.querySelectorAll('.element__image');
const modalImg = document.querySelector(".popup__image");
const modalText = document.querySelector(".popup__text");

function openImage (e) {
		modal.style.display = "block";
		modalImg.src = this.src;
		modalText.textContent = this.parentElement.querySelector('.element__text').textContent;
	}
/*Функция закрытия картинки*/
function closeImage() {
	modal.style.display = "none";
}

/*Функция лайков*/
function like(e) {
	e.target.classList.toggle('element__like-button_active');
}

/*Функция удаления карточки */
function del(e) {
	e.target.closest('.element').remove();
}



document.querySelectorAll('.element__image').forEach(function(evt) {
	evt.addEventListener('click', openImage);
});

document.querySelectorAll('.element__like-button').forEach(function(evt){
	evt.addEventListener('click', like);
 });

document.querySelectorAll('.element__delete-button').forEach(function(evt){
	evt.addEventListener('click', del);
 });
imageCloseButton.addEventListener('click', closeImage);
createButton.addEventListener('click', load);
editProfileButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
closePopupButton.addEventListener('click', closePopup);
addButton.addEventListener('click', openPopupNew);
closePopupButtonNew.addEventListener('click', closePopupNew);

