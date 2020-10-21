import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../../api";

import "antd/dist/antd.css";
import { Layout, notification } from "antd";

import "./App.css";

import Query from "../query";
import DataForm from "../data-form";
import Header from "../header";
import RecipePage from "../recipe-page";

/*
	Version: 3.5
	Author: Yash Raj Singh
*/

class App extends React.Component {
  constructor(props) {
    super(props);

    // Manages all the data for the app.
    this.state = {
      recipes: [],
      selectedRecipe: {},
      selectedNav: "1",
    };
  }
  getRecipes = (query, mode) => {
    api
      .getData(query, mode)
      .then((res) => this.setState({ recipes: res.data.data }));
  };

  changeSelectedNav = (e) => {
    this.setState({
      selectedNav: e.key,
    });
  };

  openNotification = () => {
    notification.open({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  setRecipes = (index) => {
    const newRecipes = [...this.state.recipes];
    newRecipes.splice(index, 1);
    this.setState({
      recipes: newRecipes,
    });
  };

  selectRecipe = (recipe) => {
    this.setState({
      selectedRecipe: recipe,
    });
  };

  // controlls the rendered content
  render() {
    // props passed into each component act like arguments

    return (
      <>
        <Layout className="site">
          <Router>
            <Layout.Header className="header">
              <Header
                current={this.state.selectedNav}
                handleClick={this.changeSelectedNav}
              />
            </Layout.Header>
            <Layout.Content className="content">
              <Switch>
                <Route exact path="/">
                  <Query
                    recipes={this.state.recipes}
                    getRecipes={this.getRecipes}
                    openNotification={this.openNotification}
                    setRecipes={this.setRecipes}
                    selectRecipe={this.selectRecipe}
                    changeSelectedNav={this.changeSelectedNav}
                  />
                </Route>
                <Route path="/add">
                  <DataForm openNotification={this.openNotification} />
                </Route>
                <Route path="/edit/:slug">
                  <DataForm
                    openNotification={this.openNotification}
                    selectedRecipe={this.state.selectedRecipe}
                  />
                </Route>
                <Route path="/recipes/:slug">
                  <RecipePage selectedRecipe={this.state.selectedRecipe} />
                </Route>
              </Switch>
            </Layout.Content>
          </Router>

          <Layout.Footer className="footer">
            Culinarian © 2020 created by Yash Raj Singh
          </Layout.Footer>
        </Layout>
      </>
    );
  }
}

export default App;
