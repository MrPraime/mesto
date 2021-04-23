const openPopupButton = document.querySelector('.profile__edit-button');
const Popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');


function toglePopup () {
	Popup.classList.toggle('popup_is-opened');
}
openPopupButton.addEventListener('click', toglePopup) 
closePopupButton.addEventListener('click', toglePopup)




function Profile(event) {
  if(event) {event.preventDefault();}
  const profileName = document.querySelector('.popup__form').elements.name;
  const about = document.querySelector('.popup__form').elements.about;
  profileName.value = document.querySelector('.profile__title').textContent;
  about.value = document.querySelector('.profile__subtitle').textContent;
}

Profile()

let formElement = document.querySelector('.popup__form'); 
let nameInput = document.querySelector('.popup__input_type_name'); 
let jobInput = document.querySelector('.popup__input_type_about');

function Open () {
	nameInput.value = document.querySelector('profile__title');
	toglePopup ()
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();
	
	let name = nameInput.value
	let job = jobInput.value;
	
	let title = document.querySelector('.profile__title');
	let subtitle = document.querySelector('.profile__subtitle');
	
	title.textContent = name;
	subtitle.textContent = job;
	
	toglePopup()
}

formElement.addEventListener('submit', formSubmitHandler); 