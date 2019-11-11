import "./App.css";
import React,{useEffect} from "react";
import { Provider } from "react-redux";
import Form from "./components/Form";
import store from "./components/store/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import api from "./components/utils/api";
import { connect } from "react-redux";
import { addPerson } from "./components/actions/index";

import routes from "./components/routes";
import SearchAppBar from "./components/forms/SearchAppBar";

const App = connect(
  null,
  mapDispatchToProps
)(props => {
  useEffect(() => {
    api.get("/person").then(result => {
      console.log("resultado",result)
      props.addPerson(result.data.response);
    });
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.form} component={Form} />
      </Switch>
    </BrowserRouter>
  );
});
function mapDispatchToProps(dispatch) {
  return {
    addPerson: person => dispatch(addPerson(person))
  };
}
const ConnectedApp = props => {
  return (
    <Provider store={store}>
      <SearchAppBar/>
      <App />
    </Provider>
  );
};
export default ConnectedApp;
