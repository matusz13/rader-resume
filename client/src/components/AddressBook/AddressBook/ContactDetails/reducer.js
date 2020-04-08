import {
  FETCH_CONTACT_DETAILS__FAILURE,
  FETCH_CONTACT_DETAILS__START,
  FETCH_CONTACT_DETAILS__SUCCESS,
} from "./actions";

const initialState = {
  fetchedContact: null,
  fetchFailure: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    // TODO something is missing here - fixed fetchfailure
    case FETCH_CONTACT_DETAILS__START:
      return {
        ...state,
      };

    // TODO something is wrong here - fixed added fetched contact
    case FETCH_CONTACT_DETAILS__SUCCESS:
      return {
        ...state,
        fetchedContact: payload.contactDetails,
      };

    case FETCH_CONTACT_DETAILS__FAILURE:
      return {
        ...state,
        fetchFailure: true,
      };

      

    default:
      return state;

  }
};

export default reducer;