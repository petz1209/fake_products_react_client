import { useState, useEffect } from "react";
//import { categoryService }  from "services/CategoryService";
import LiveSearch from "./LiveSearch";

export default function Form({primaryId, updateItem, addItem, categoryService, formReset}){

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState({id: null, name: ""});
    const [description, setDescription] = useState("test description");
    const [image, setImage] = useState("null")

    useEffect(() => {

        const dataCollector = async () => {
            
            const response = await fetch(`http://localhost:8000/products/${primaryId}`);
            const data = await response.json();
            setTitle(data.title);
            setPrice(data.price);
            setDescription(data.description);
            setImage(data.image);


            const categoryResponse = await fetch(`http://localhost:8000/categories/by_name/${data.category}`);
            const category_data = await categoryResponse.json();
            setCategory({...category_data});

            return data;
        }

        if (primaryId && primaryId !== null){
            dataCollector();
            
        } else {
            setTitle("");
            setPrice("");
            setCategory({id: null, name: ""});
            setDescription("test desc");
            setImage("");
        }
    }, [primaryId, formReset])


    console.log(`stateCategory: ${JSON.stringify(category)}`);

    return(
        <div Style={{margin: 100}}>
            <input type="text" placeholder="title" 
            value={title}
            onChange={(e) => {setTitle(e.target.value)}} />

            <input type="number" placeholder="price"
            value={price}
            onChange={(e) => {setPrice(e.target.value)}} />

            <h3>cateogyId: {category.id}</h3>
            
            <LiveSearch 
                componentId="categories"
                width={80}
                primary={category}
                setPrimary={setCategory}
                searchService={categoryService.find_by_name}
                onSearchFieldValueChangeHandlers={setCategory}
                empty_interface={{id: null, name: ""}}
                sleepMs={0}
                minChars={1}
                
            />

            
        
            {
                primaryId ?
                <button onClick={(e) => {updateItem(primaryId, {title: title, price: price,
                                                     category: category, description: description,
                                                     image: image, rating: {rate: 0, count:0}}
                                                    )}
                                }>upate</button>
                :
                <button onClick={(e) => {addItem({title: title, price: price,
                    category: category, description: description,
                    image: image, rating: {rate: 0, count:0}})}}>add</button>
            }

            <img src={image} alt="Sku display"
            Style={"width: 200px; height: atuo"}
            
            />

        </div>




    )

}