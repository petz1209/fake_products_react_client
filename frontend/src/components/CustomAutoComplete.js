import {useEffect, useState} from "react";
import { AutoComplete } from 'primereact/autocomplete';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
 

export default function CustomAutoComplete({primary, setPrimary, 
                                            label = "Search",
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
        <div className="p-field">
            <span className="p-float-label">
                <AutoComplete
                    inputStyle={{width: "80rem"}}
                    id={label}
                    field={"name"} value={text} suggestions={items} completeMethod={callback} 
                    onSelect={(e) => {
                        setPrimary({...e.value})
                    }}
                    
                    onChange={(e) => {

                        if (!e.value || e.value === "" || e.value === undefined){
                            
                            setPrimary({...empty_interface});
                        }
                        setText(e.value)}}  
                        
                />
                <label htmlFor={label}>{label}</label>
            </span>
        </div>
            )












}