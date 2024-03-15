/*
Building a naive implementation of a client side ag grid table:
- fetches all data at once
- on row click triggers callback to parent compoent (setId)
- needs to limit rerendering for row specific events to a minimum:
    - needs a way to take row update injections
    - needs a way to add a single row injection
    - needs a way to delete a row from grid
*/

import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useCallback, useRef, memo } from "react";

const CustomTable = memo(
  ({
    columns,
    rows,
    colorMode = "light",  // Select color Scheme (light | dark)
    tableStyle = "compact", // Select tableStyle(compact | comfort)
    rowSelectCallback = (p) => {
      console.log(p);
    },
    getRowId,
  }) => {
    console.log("Table rendered");

    const gridRef = useRef();

    // Functions that we plan on using for set state need to be defined above. otherwise runtime error;
    const cssThemes = {
      compact: "ag-theme-balham",
      comfort: "ag-theme-quartz",
    };

    const CustomTableClass = () => {
      // make style setable from outside
      const base = cssThemes[tableStyle];
      if (colorMode === "dark") {
        return `${base}-dark`;
      }
      return base;
    };

    const customColumnDefiner = (columns) => {
      // define filter mapping inside
      const mappedCols = columns.map((item) => {
        if (item.filter) {
          item.floatingFilter = true;
        }
        return item;
      });
      return mappedCols;
    };

    // Set Styling
    const [css] = useState(CustomTableClass());

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState(customColumnDefiner(columns));

    const onRowSelected = useCallback((event) => {
      // wrapping the rowSelecCallback so it only fires on the newly selected row.
      // otherwise it would fire also on deselect which happens later and in turn has the wrong callback effect
      if (event.node.isSelected()) {
        rowSelectCallback(event.node.data);
      }
    });

    return (
      // wrapping container with theme & size
      <div
        className={css + " " + "fullWidth"} // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          enableCellChangeFlash={true}
          animateRows={true}
          ref={gridRef}
          getRowId={getRowId}
          rowData={rows}
          columnDefs={colDefs}
          rowSelection="single"
          onRowSelected={onRowSelected}
        />
      </div>
    );
  }
);

export default CustomTable;
