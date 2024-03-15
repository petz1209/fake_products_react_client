import { useState } from "react";
import { Stack, Autocomplete } from "@mui/material";
import LiveSearch from "./components/LiveSearch";
import axios from "axios";

const getData = async (query) => {
  try {
    let url = `http://localhost:8000/api/v1/sujets/find_by_name/at?application_id=1&name=${query}`;

    let { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

function App() {
  const [inputValue, setInputValue] = useState("Billa");
  const [sujet_id, setSujetId] = useState(null);

  const onSearchFieldValueChange = (value) => {
    console.log(value);
    if (value) {
      setSujetId(value.sujet_id);
    } else {
      setSujetId(null);
    }
  };

  return (
    <div className="App">
      <Stack sx={{ width: 300, margin: "auto" }}>
        <div>sujet. {sujet_id}</div>
        <LiveSearch
          searchFieldValue={inputValue}
          setSearchFieldValue={setInputValue}
          getData={getData}
          onSearchFieldValueChangeHandlers={[onSearchFieldValueChange]}
          sx={{ width: 300 }}
          id="search"
        />
      </Stack>
    </div>
  );
}

export default App;
