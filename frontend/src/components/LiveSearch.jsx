import React, { useState, useCallback, useEffect } from "react";
import { TextField, debounce } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Box } from "@mui/system";


export default function LiveSearch({
  
  searchService,  // defines the backend service api
  primary,        // state object that holds state of the selected autocomplete
  setPrimary,     // state object setter
  empty_interface = {id: null, name: ""}, // the look of the state object if empty
  componentId = "autocomplete",   // defines component id as well as label
  sleepMs = 0,    // time between keystrokes until backend is queried
  minChars = 0,   // minimum number of characters that need to be inputted before backend is queried
  onSearchFieldValueChangeHandlers = [],
  width = 100,
  ...props
}) {
 
  // calculate object keys
  const idKey = Object.keys(empty_interface)[0];
  const valueKey = Object.keys(empty_interface)[1];
  // set internal state for text value and result items from backend
  const [text, setText] = useState(() => {return primary.name});
  const [items, setItems] = useState([]);


  // custom event hooks
  const search = async (query) => {
    if (query) {
      if (query.length >= minChars) {
        const data = await searchService(query);
        setItems(data);
      } else {
        setItems([]);
      }
    } else {
      setItems([]);
    }
  };
  const debouncedSearch= useCallback(
    debounce(search, sleepMs),[]
  );

  const onInputChange = (e, value, event_type) => {
    
    
    console.log(`onInputChange: ${value}`)
    
    if (event_type === "clear") {
      setText("");
      setPrimary(empty_interface);
    } else {
      setText(value);
      debouncedSearch(value);
    }

  }

  const onSelectOption = (e, value) => {
    
    if (value) { 
      setPrimary(value);
    } 
  }

  useEffect(() => {
    setText(primary.name);
  },[primary])

  return (
    <div style={{width: `${width}%`}}>
    <Autocomplete
      freeSolo
      id={componentId}
      onChange={onSelectOption}
      onInputChange={onInputChange}
      inputValue={text}
      getOptionLabel={(res) => `${res.name}`}
      options={items ? items : []}
      filterOptions={(x) => x}
      renderOption={(props, items) => (
        <Box component="li" {...props} key={items[idKey]}>
          {items[valueKey]}
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label={componentId} />
      )}
      
      sx={{width: "100%", }}
      {...props}
    />
    </div>
  );
}
