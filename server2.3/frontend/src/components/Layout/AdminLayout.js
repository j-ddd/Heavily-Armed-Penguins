import React from "react";
import {
  Route,
  Switch,
  withRouter,
  
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";


// map with redux
import Map from "../../pages/map";
import AddForm from "../../pages/map/form/AddForm";
import EditForm from "../../pages/map/form/EditForm";

// user
import User from "../../pages/user";

// template builder
import Builder from "../../pages/builder";

// builder with context
import BuilderWithContext from "../../pages/builder-context";
import AddBuilderForm from "../../pages/builder-context/form/AddBuilderForm";
import EditBuilderForm from "../../pages/builder-context/form/EditBuilderForm";
import DeployBuilderForm from "../../pages/builder-context/form/DeployBuilderForm";

// Machine
import Machine from "../../pages/machine";
//import AddMachineForm from "../../pages/machine-context/form/AddMachineForm";
//import EditMachineForm from "../../pages/machine-context/form/EditMachineForm";

// context
import { useLayoutState } from "../../context/LayoutContext";
import { UserProvider } from "../../pages/user-context/context/UserContext";
import { MachineProvider } from "../../pages/machine-context/context/MachineContext";
import { BuilderProvider } from "../../pages/builder-context/context/BuilderContext";

function AdminLayout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
              <Switch>

                <Route path="/admin/dashboard" component={Dashboard} />
                
                <Route exact path="/admin/user/" component={User} />

                <Route exact path="/admin/machine/" component={Machine} />

                <BuilderProvider>
                <MachineProvider>
                  <Route exact path="/admin/builder-context" component={BuilderWithContext} />
                  <Route path="/admin/builder-context/add" component={AddBuilderForm} />
                  <Route path="/admin/builder-context/edit/:id" component={EditBuilderForm} />
                  <Route path="/admin/builder-context/deploy/:id" component={DeployBuilderForm} />
                </MachineProvider>
                </BuilderProvider>
            
              </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(AdminLayout);
