import {createStore} from 'redux';

const initialState = {
  businessCards: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BUSINESS_CARD':
      return addBusinessCard(state, action.businessCard);
    case 'REMOVE_BUSINESS_CARD':
      return removeBusinessCard(state, action.uuid);
    case 'SET_BUSINESS_CARDS':
      return setBusinessCards(state, action.businessCards);
  }
  return state;
};

function addBusinessCard(state, businessCard) {
  let businessCards = state.businessCards;
  businessCards.push(businessCard);
  return {businessCards: businessCards};
}

function removeBusinessCard(state, uuid) {
  let businessCards = state.businessCards;
  let index = businessCards.findIndex(object => {
    return object.uuid === uuid;
  });

  businessCards.splice(index, 1);
  return {businessCards: businessCards};
}

function setBusinessCards(state, businessCards) {
  return {businessCards: businessCards};
}

const store = createStore(reducer);

export default store;
