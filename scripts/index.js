const popupProfile = document.querySelector('.popup_edit-form');
const closePopupButton = document.querySelector('.popup__close-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = popupProfile.querySelector('.popup__form').elements.name;
const about = popupProfile.querySelector('.popup__form').elements.about;
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const popUpNew = document.querySelector('.popup_new-item-form');
const closePopupButtonNew = document.querySelector('.popup__close-button-new');
const elements = document.querySelector('.elements');
const createButton = document.querySelector('.popup__create-button');
const likeButton = document.querySelector('.element__like-button');
const cardTemplate = document.querySelector('#cards').content;
const imageCloseButton = document.querySelector(".popup__close-button_modal");
const modal = document.querySelector('.popup_modal');
const modalImg = document.querySelector(".popup__image");
const modalText = document.querySelector(".popup__text");
const titleImput = document.querySelector('.popup__input_type_title');
const urlImput = document.querySelector('.popup__input_type_url');
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

/* функция обработки инпутов */
  function imput() {
	const elementImg = document.querySelector('.element__image');
	const imputTitleValue = titleImput.value;
	const inputUrl = urlImput.value
	document.querySelector('.element__text').textContent = imputTitleValue;
	elementImg.src = inputUrl;
}
/* функция создания карточки */
  function createCard(cards) {
	const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
	cardElement.querySelector('.element__image').src = cards.link;
	cardElement.querySelector('.element__text').textContent = cards.name;
	cardElement.querySelector('.element__text').alt = cards.name;

	cardElement.querySelector('.element__like-button').addEventListener('click', like);
	cardElement.querySelector('.element__delete-button').addEventListener('click', del);
	cardElement.querySelector('.element__image').addEventListener('click', function() {
		modalImg.src = this.src;
		modalImg.alt = this.parentElement.querySelector('.element__text').textContent;
		modalText.textContent = this.parentElement.querySelector('.element__text').textContent;
		openPopup(modal)});
		
	return cardElement;
}

/* функция загрузка созданных карточек из массива*/

  initialCards.forEach(function(cards) {
	elements.prepend(createCard(cards));
  });


/* Функции создания новой карточки */

function loadCard() {
	elements.prepend(createCard(cards));
	imput();
	closePopup(popUpNew);
	titleImput.value = "";
	urlImput.value = "";
}

/* функция открытия попАпа*/

function openPopup(e) {
	e.classList.add('popup_is-opened');
}

/* функция закрытия попАпа*/

function closePopup(e) {
	e.classList.remove('popup_is-opened');
}

/*Функция внесения новых значений из инпутов*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
	
	const name = nameInput.value;
	const job = jobInput.value;
	
	title.textContent = name;
	subtitle.textContent = job;
	
	closePopup(popupProfile)
}

/*Функция лайков*/
function like(e) {
	e.target.classList.toggle('element__like-button_active');
}

/*Функция удаления карточки */
function del(e) {
	e.target.closest('.element').remove();
}

editProfileButton.addEventListener('click', function() {
	profileName.value = title.textContent;
	about.value = subtitle.textContent;
	openPopup(popupProfile)});
addButton.addEventListener('click', function() {openPopup(popUpNew)} );
closePopupButton.addEventListener('click',  function() {closePopup(popupProfile) });
closePopupButtonNew.addEventListener('click', function() {closePopup(popUpNew)});
imageCloseButton.addEventListener('click', function() {closePopup(modal)});
createButton.addEventListener('click', loadCard);
formElement.addEventListener('submit', handleProfileFormSubmit);


