import {useEffect, useState} from "react";
import { AutoComplete } from 'primereact/autocomplete';

export default function CustomAutoComplete({primary, setPrimary, 
                                            searchService,
                                            empty_interface = {id: null, name: ""}
}){


    console.log("CustomAutoCompleteMounted");
    

    const [text, setText] = useState(() => {return primary.name});
    const [items, setItems] = useState([]);

    console.log(`text: ${text}`);

    const callback = async (text) => {
        const data = await searchService(text.query)
        setItems(data);
    }

    useEffect(() => {
        setText(primary.name);
    },[primary])

    
    

    return (
            <AutoComplete field={"name"} value={text} suggestions={items} completeMethod={callback} 
                onSelect={(e) => {
                    setPrimary({...e.value})
                }}
                
                onChange={(e) => {

                    if (!e.value || e.value === "" || e.value === undefined){
                        
                        setPrimary({...empty_interface});
                    }
                    setText(e.value)}}  
                    
            />
            )












}