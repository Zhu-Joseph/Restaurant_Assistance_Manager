import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ReservationSeats from "../reservations/ReservationSeats";
import NotFound from "./NotFound";
import NewReservations from "../reservations/NewReservations"
import NewTables from "../tables/NewTables";
import Search from "../search/Search"
import EditReservations from "../reservations/EditReservations";
import { today } from "../utils/date-time";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>                 
      <Route path="/reservations/:reservation_id/seat">
        <ReservationSeats />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservations />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/reservations/new">
        <NewReservations />
      </Route>
      <Route path="/tables/new">
        <NewTables />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
