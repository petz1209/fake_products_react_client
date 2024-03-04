

class CategoryService{
    constructor(){
        this.$api = "http://localhost:8000";
    }

    async find_by_name(search) {

        //console.log(this.$api);
        const response = await fetch( this.$api + "/categories?" + new URLSearchParams({search: search}));
        if (!response.ok){
            throw new Error("Could not get data from ShopService");
        }
        return await response.json();
    }
}


export const categoryService = {

    find_by_name: async (search) => {
         //console.log(this.$api);
         const response = await fetch( "http://localhost:8000/categories?" + new URLSearchParams({search: search}));
         if (!response.ok){
             throw new Error("Could not get data from ShopService");
         }
         return await response.json();

    }


}



export default CategoryService;