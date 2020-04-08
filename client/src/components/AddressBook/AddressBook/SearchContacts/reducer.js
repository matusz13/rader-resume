import {
  SELECT_MATCHING_CONTACT,
  UPDATE_SEARCH_PHRASE__FAILURE,
  UPDATE_SEARCH_PHRASE__START,
  UPDATE_SEARCH_PHRASE__SUCCESS,
  UPDATE_SEARCH_PHRASE__DEFAULT,
} from "./actions";

const initialState = {
  phrase: "",
  matchingContacts: [],
  searchFailure: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    case UPDATE_SEARCH_PHRASE__START:
      return {
        ...state,
        phrase: payload.newPhrase,
        searchFailure: false,
      };

    case UPDATE_SEARCH_PHRASE__SUCCESS:
      return {
        ...state,
        matchingContacts: payload.matchingContacts,
      };

    // TODO something is wrong here - fixed
    case UPDATE_SEARCH_PHRASE__FAILURE:
      return {
        ...state,
        searchFailure: true,
      };

    // TODO something is wrong here - might be fixed
    case SELECT_MATCHING_CONTACT:
      return {
        ...state,
        phrase: '',
        matchingContacts: [],
      };

    

    default:
      return state;

  }
};

export default reducer;