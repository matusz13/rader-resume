import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import AddressBook from "./AddressBook";
import { FakeHttpApi } from "./httpApi";
import { setupStore } from "./store";



const reduxStore = setupStore({
  httpApi: new FakeHttpApi(),
});

const ABApp = () => (
  <ReduxProvider store={reduxStore}>
    <main className="ABApp">
      <AddressBook />
    </main>
  </ReduxProvider>
);

export default ABApp;