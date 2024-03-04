import { useState } from 'react'
import 'App.css'
import ShopService from 'services/ShopService.js'
import CategoryService from 'services/CategoryService';
import Table from 'components/Table';
import Form from 'components/Form';

export default function Home() {

  const shopService = new ShopService();
  

  const [product_id, setProductId] = useState(null);
  const [productName, setProductName] = useState("Yo Bruno How Are you"); 

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(null);

  const rowSelection = "single";   // this can be multiple or single
  // define the way columns look
  const columns = [
    {field: 'id', flex: 1, filter: false},
    {field: 'title', flex: 2, filter: true},
    {field: 'price', flex: 2, filter: true},
    {field: 'category', flex: 2, filter: true},
    {field: 'description', flex: 2, filter: true},
    {field: 'rating_value', flex: 2, filter: true},
    {field: 'rating_count', flex: 2, filter: true},
    {field: 'image', flex: 2, filter: false},
    /*
    {field: "action", flex: 1,
    cellRenderer:(p) => { return <button onClick={() => {console.log(p.data.make); window.alert(p.data.id);} }>Push Me!</button>;}  
    }
    */
  ]; 

  // Callback to set the producId whenever a row is selected in the table
  const rowSelectCallback = (row) => {
    // the row object looks like event.node.data
    setProductId(row.id);
  }
  // Load data from server and render in table --> this could be adjusted to have some previous set filters.
  const loadTable = async () => {
    setLoading(true);
    const rawData = await shopService.get()
    // calculate
    setRows(rawData);
    setLoading(false);
  }


  const addItem = async (body) => {

    // adjust body due to faked category autocomplete logic
    body.category = body.category.name;
    const data = await shopService.post(body);
    console.log(data);
    //todo we need a way to hook this so only the specific row in < AgGridReact /> is updated, rather then the whole table

  }
  const updateItem = async (id, body) => {
    // adjust body due to faked category autocomplete logic
    body.category = body.category.name;
    const data = await shopService.patch(id, body);
    console.log(data);
    //todo we need a way to hook this so only the specific row in < AgGridReact /> is updated, rather then the whole table
  }


  return (
      
    <div>
      <div>product_id: {product_id}</div>
      <Form primaryId={product_id} setPrimaryId={setProductId}
            updateItem={updateItem} addItem={addItem}
      />

      <button onClick={(e) => {setProductId(null)}}>new</button>
      <button onClick={(e) => {loadTable()}}>getData</button>

      {rows ?
        <Table columns={columns} rows={rows}
         rowSelection={rowSelection}
         rowSelectCallback={rowSelectCallback}
        />
        :
          // render loading if data is currently fetched. else don't render anything
          loading ? <div>Loading</div> :  null
      }
      

    </div>

    )
}

