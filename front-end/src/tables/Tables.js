import React from "react"
import {deleteTable, updateStatus} from "../utils/api";
import { v4 } from "uuid";

export default function Tables (props) {
    const {table} = props
    const table_id = "id"//TO MAKE SURE TEST PASSES AND RUNS
 
    function finishHandler() {
      const abortController = new AbortController();
      const result = window.confirm("Is this table ready to seat new guests? This cannot be undone.")

      if(result) {
        updateStatus(table.reservation_id, {data: {"status": "finished"}}, abortController.signal)
        deleteTable(table[table_id])              
        .then(props.loadTables)
        .then(props.loadDashboard)
        .catch(props.setReservationsError)
      }
    }

    return (
      <div>
        {table.occupied ? 
          <li key={v4} className="list-group-item list-group-item-warning">
            Table: {table.table_name} 
            <span className="col-md">Status:</span> 
              <span data-table-id-status={`${table[table_id]}`}>Occupied</span>
              <button data-table-id-finish={table[table_id]} className="btn btn-danger"
              onClick={finishHandler}>
                Finish
              </button>
            
          </li> : 

          <li key={v4} className="list-group-item list-group-item-success">
            Table: {table.table_name}
            <span className="col-md">Status:</span> 
            <span className="col" data-table-id-status={`${table[table_id]}`}>Free</span> 
          </li>
        }
      </div>
    )
}