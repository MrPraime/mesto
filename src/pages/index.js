import "../pages/index.css";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { Api } from "../components/Api.js";
import {
  editProfileButton,
  nameInput,
  jobInput,
  addButton,
  elements,
  cardListSelector,
  config,
  formAdd,
  formProfile,
  formProfileAvatar,
  editAvatarButton,
} from "../utils/constants.js";

let userId

const imagePopup = new PopupWithImage(".popup_modal");
const openedConfirmDelCard = new PopupWithConfirmation(".popup_delCard");

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-28",
  headers: {
    authorization: "ba6ef579-9515-4d2f-b022-6632d7d5b3fd",
    "Content-Type": "application/json",
  },
});


const cardList = new Section({
  items: [],
  renderer: (item) => {
    const postElement = createCard(item);
      cardList.addItem(postElement);
  }
},  cardListSelector);


/* открытие попАпов */
// const openedProfileForm = new PopupWithForm(
//   ".popup_edit-form",
//   ({ name, about }) => {
//     api.patchUserInfo(name, about, (wait) => {
//         handleWaitLoading(openedProfileForm, wait);
//       })
//       .then(() => {
//         userInfoMethods.setUserInfo(name, about), 
//         openedProfileForm.close();
//       })
//       .catch((err) => {
//         console.log(err);
//         return [];
//       })
//       .finally((wait) => {
//         handleWaitLoading(openedProfileForm, wait)
//       });
//   }
// );


const openedProfileForm = new PopupWithForm(
  ".popup_edit-form",
  ({ name, about }) => {
    openedProfileForm.renderLoadingSave(true);
    api.patchUserInfo(name, about, )
      .then(() => {
        userInfoMethods.setUserInfo(name, about), 
        openedProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
        return [];
      })
      .finally(() => {
        openedProfileForm.renderLoadingSave(false);
      });
  }
);






const openedAddCardForm = new PopupWithForm(
  ".popup_new-item-form",
  ({ title, imageUrl }) => {
    openedAddCardForm.renderLoadingCreate(true)
    api.postNewCard(title, imageUrl,)
      .then((res) => {
        elements.prepend(createCard(res))
        addFormValidator.handleSubmitBtnDisabled()
        openedAddCardForm.close()
      })
      .catch((err) => {
        console.log(err);
        return [];
      })
      .finally(() => {
        openedAddCardForm. renderLoadingCreate(false);
      });
  }
);

// const openedEditAvatarForm = new PopupWithForm(
//   ".popup_edit-avatar",
//   ({ newAvatarUrl }) => {
//     api.patchNewAvatar(newAvatarUrl, (wait) => {
//       handleWaitLoading(openedEditAvatarForm, wait)
//       })
//       .then(() => {
//         userInfoMethods.setUserAvatar(newAvatarUrl);
//         editProfileAvatarformFormValidator.handleSubmitBtnDisabled();
//         openedEditAvatarForm.close();
//       })
//       .catch((err) => {
//         console.log(err);
//         return [];
//       }).finally((wait) => {
//         handleWaitLoading(openedEditAvatarForm, wait)
//       });
//   }
// );


const openedEditAvatarForm = new PopupWithForm(
  ".popup_edit-avatar",
  ({ newAvatarUrl }) => {
    openedEditAvatarForm.renderLoadingSave(true);
    api.patchNewAvatar(newAvatarUrl)
      .then(() => {
        userInfoMethods.setUserAvatar(newAvatarUrl);
        editProfileAvatarformFormValidator.handleSubmitBtnDisabled();
        openedEditAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
        return [];
      }).finally(() => {
        openedEditAvatarForm.renderLoadingSave(false);
      });
  }
);





// /*Функция отображения загрузки */
function handleWaitLoading(popup, wait) {
  popup.loading(wait);
  if (!wait) {
    popup.close();
  }
}


// /*Функция создания карточки *

function createCard(item, myCard = false) {
  const cardElement = new Card(
    {
      data: item,
      handleCardClick: () => {
        imagePopup.open(item.name, item.link);
      },
    },
    (id, evt) => {
      openedConfirmDelCard.open();
      openedConfirmDelCard.setSubmitAction(() => {
        api.deleteCard(id)
          .then(() => {
            cardElement.delCard(evt);
            openedConfirmDelCard.close();
          })
          .catch((err) => {
            console.log(err);
            return [];
          });
      });
    },
    userInfoMethods.getUserInfo()._id,
    () => {
      const likeStatus = cardElement.isLiked();
      api.changeLikeCardStatus(item._id, likeStatus)
      .then((res) => {
        cardElement.setLikesInfo(res.likes, likeStatus);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    },
    ".card-template"
  );
  return cardElement.generateCard(myCard);
}

/* профиль */
const userInfoMethods = new UserInfo(
  { nameSelector: ".profile__title", aboutSelector: ".profile__subtitle" },
  ".profile", ".profile__avatar",
  () => {}
);

/*Добавление слушателей */
openedAddCardForm.setEventListeners();
openedProfileForm.setEventListeners();
imagePopup.setEventListeners();
openedConfirmDelCard.setEventListeners();
openedEditAvatarForm.setEventListeners();

addButton.addEventListener("click", () => {
  openedAddCardForm.open();
  addFormValidator.resetValidation();
});
editProfileButton.addEventListener("click", () => {
  const userData = userInfoMethods.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.about;

  // userInformation();
  openedProfileForm.open();
  addFormValidator.resetValidation();
});

editAvatarButton.addEventListener("click", () => {
  openedEditAvatarForm.open();
  editProfileAvatarformFormValidator.resetValidation();
});

/*валидация */

const addFormValidator = new FormValidator(config, formAdd);
const editProfileFormValidator = new FormValidator(config, formProfile);
const editProfileAvatarformFormValidator = new FormValidator(
  config,
  formProfileAvatar
);

/*включение валидации */
editProfileAvatarformFormValidator.enableValidation();
addFormValidator.enableValidation();
editProfileFormValidator.enableValidation();


Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([res, initialCards]) => {
    userInfoMethods.setUserInfo(res.name, res.about);
    userInfoMethods.setUserInfoId(res._id)
    userInfoMethods.setUserAvatar(res.avatar);
    cardList.renderItems(initialCards)
  }
) .catch((err) => {
  console.log(err);
  return [];
}) 

