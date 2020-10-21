import React from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Card, Radio, Empty, Popconfirm } from "antd";

import api from "../../api";

import "./query.css";

import RecipeCard from "../RecipeCard";

/*
	Version: 3.5
	Author: Yash Raj Singh
*/
const Query = (props) => {
  const onFinish = (value) => {
    if (value === "dev") {
      props.getRecipes(value, "dev");
    } else if (value.includes(",")) {
      props.getRecipes(value, "ingredients");
    } else {
      props.getRecipes(value, "name");
    }
  };

  const deleteRecipe = (id, index) => {
    api.deleteData(id);
    props.openNotification();
    props.setRecipes(index);
  };

  return (
    <>
      <Input.Search
        className="search-bar"
        size="large"
        enterButton
        defaultValue="dev"
        onSearch={onFinish}
      />

      {/*<Form
	name="find"
	onFinish={onFinish}
	initialValues={{
		mode: "name"
	}}
	onFinishFailed={onFinishFailed}
>

	<Form.Item
		name="query"
		rules={[
			{
				message: 'Please input the query!',
			},
		]}
	>
		<Input size="large"/>
	</Form.Item>

	<Form.Item name="mode">
		<Radio.Group>
			<Radio.Button value="name">Query by Name</Radio.Button>
			<Radio.Button value="ingredients">Query By Ingredients</Radio.Button>
			<Radio.Button value="dev">Query by Dev Power</Radio.Button>
		</Radio.Group>
	</Form.Item>

	<Form.Item>
		<Button type="primary" htmlType="submit">Submit</Button>
	</Form.Item>
	</Form>*/}

      <div className="card-container">
        {props.recipes.length < 1 ? (
          <Empty />
        ) : (
          props.recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              deleteRecipe={(id) => deleteRecipe(id, index)}
              selectRecipe={props.selectRecipe}
              changeSelectedNav={props.changeSelectedNav}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Query;
