import { actions as searchActions } from "./SearchContacts";
import { actions as contactDetailsActions } from "./ContactDetails";

export const updateSearchPhrase = newPhrase =>
  (dispatch, getState, { httpApi }) => {
    dispatch(
      searchActions.updateSearchPhraseStart({ newPhrase }),
    );
    httpApi.getFirst5MatchingContacts({ namePart: newPhrase })
      .then(({ data }) => {
        
        const matchingContacts = data.map(contact => ({
          id: contact.id,
          value: contact.name,
        }));
        // TODO something is wrong here - fixed
      
        dispatch(
          searchActions.updateSearchPhraseSuccess({ matchingContacts: matchingContacts }),
        );
      })
      .catch(() => {
        // this doesn't work well with debounce, removing... faker still provides closest matching with diminishing returns
        //dispatch(
        //  searchActions.updateSearchPhraseFailure(),
        //);
      });
  };

  export const selectMatchingContact = selectedMatchingContact =>
  (dispatch, getState, { httpApi, dataCache }) => {

    // TODO something is missing here - fixed, contactId:id
    const getContactDetails = ({ id }) => {
      return httpApi
          .getContact({ contactId: id })
          .then(({ data }) => ({
            id: data.id,
            name: data.name,
            phone: data.phone,
            addressLines: data.addressLines,
          }));
    };

    dispatch(
      searchActions.selectMatchingContact({ selectedMatchingContact }),
    );

    dispatch(
      contactDetailsActions.fetchContactDetailsStart({ selectedMatchingContact }),
    );

    getContactDetails({ id: selectedMatchingContact.id})
      .then((contactDetails) => {
        // TODO something is missing here - fixed added value
        dataCache.store({
          key: contactDetails.id,
          value: contactDetails.value
        });
        // TODO something is wrong here - fixed added contactDetails
        dispatch(
          contactDetailsActions.fetchContactDetailsSuccess({contactDetails}),
        );
       
      })
      .catch(() => {
        dispatch(
          contactDetailsActions.fetchContactDetailsFailure(),
        );
      });
  };