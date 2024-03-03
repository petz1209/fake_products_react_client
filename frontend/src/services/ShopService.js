

class ShopService{
    constructor(){
        //this.$api = "https://fakestoreapi.com/products";
        this.$api = "http://localhost:8000";
    }

    async find_by_name(query) {

        console.log(query)
        //console.log(this.$api);
        const response = await fetch( this.$api + "/products" + "?" + new URLSearchParams({title: query}));
        if (!response.ok){
            throw new Error("Could not get data from ShopService");
        }
        return await response.json();
    }


    async get() {
        const response = await fetch( this.$api + "/products");
        if (!response.ok){
            throw new Error("Could not get data from ShopService");
        }
        return await response.json();

    }

    async patch(productId, body){
        const response = await fetch(this.$api + `/products/${productId}` , {
            method: 'PATCH',
            headers: {"Content-Type": "application/json", },
            body: JSON.stringify(body),
          });
          if (!response.ok){
              throw new Error("Could not fetch shop data for table")
          }
          return await response.json();





    }

    async post(body){
        const response = await fetch(this.$api + `/products` , {
            method: 'POST',
            headers: {"Content-Type": "application/json", },
            body: JSON.stringify(body),
          });
          if (!response.ok){
              throw new Error("Could not fetch shop data for table")
          }
          return await response.json();
    }

    async tableFetch(paginationModel, sortModel, filterModel) {
    
        const body = {
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
            sorting: sortModel,
            filters: filterModel.items,
          }
        
        //const body = {body: orig_body}

        console.log(body)
        console.log(JSON.stringify(body))
    const response = await fetch(this.$api + "/products/pagination", {
      method: 'POST',
      headers: {"Content-Type": "application/json", },
      body: JSON.stringify(body),
    });
    if (!response.ok){
        throw new Error("Could not fetch shop data for table")
    }
    const data = await response.json();
    return data;






    }
}


export default ShopService;