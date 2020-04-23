import React, { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import SearchField from "./components/SearchField/SearchField";
import { Company } from "./types/types";
import CompanyDisplay from "./components/CompanyDisplay/CompanyDisplay";

type AppLocalState = {
  company: Company | undefined;
};
function App() {
  const [localState, setLocalState]: [
    AppLocalState,
    Dispatch<SetStateAction<AppLocalState>>
  ] = useState({
    company: undefined,
  } as AppLocalState);

  function onCompanySelect(company: Company) {
    setLocalState({ company });
  }
  return (
    <div className="App">
      <SearchField onSelect={onCompanySelect}></SearchField>
      {localState.company !== undefined ? (
        <CompanyDisplay company={localState.company} />
      ) : null}
    </div>
  );
}

export default App;
