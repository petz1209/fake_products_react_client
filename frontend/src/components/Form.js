import { useState, useEffect } from "react";


export default function Form({primaryId, setPrimaryId, updateItem, addItem }){

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const [description, setDescription] = useState("test description");
    const [image, setImage] = useState("null")

    useEffect(() => {

        const dataCollector = async () => {
            
            const response = await fetch(`http://localhost:8000/products/${primaryId}`);
            console.log(response.status);
            const data = await response.json();
            console.log(`data: ${data}`);
            setTitle(data.title);
            setPrice(data.price);
            setCategory(data.category);
            setDescription(data.description);
            setImage(data.image);
            return data;
        }

        if (primaryId && primaryId !== null){
            dataCollector();
        } else {
            setTitle("");
            setPrice("");
            setCategory("");
            setDescription("test desc");
            setImage("");
        }
    }, [primaryId])


    return(
        <div>
            <input type="text" placeholder="title" 
            value={title}
            onChange={(e) => {setTitle(e.target.value)}} />

            <input type="number" placeholder="price"
            value={price}
            onChange={(e) => {setPrice(e.target.value)}} />

            <input type="text" placeholder="category" 
            value={category}
            onChange={(e) => {setCategory(e.target.value)}} />
        
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

            <img src={image} alt="product image"
            Style={"width: 200px; height:atuo"}
            
            />

            



        </div>




    )

}