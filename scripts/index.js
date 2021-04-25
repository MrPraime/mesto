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

/*Функция внесения новых значений из инпутов*/
function formSubmitHandler(evt) {
    evt.preventDefault();
	
	let name = nameInput.value
	let job = jobInput.value;
	
	title.textContent = name;
	subtitle.textContent = job;
	
	closePopup()
}

editProfileButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
closePopupButton.addEventListener('click', closePopup);