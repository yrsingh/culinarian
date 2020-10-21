import React from "react";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
import { Card, Popconfirm } from "antd";
import {
  EditOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const RecipeCard = (props) => {
  const recipe = props.recipe;

  return (
    <Card
      className="card"
      cover={
        <img className="cover-img" alt={recipe.name} src={recipe.imageURL} />
      }
      key={recipe._id}
      actions={[
        <Popconfirm
          title="Are you sure？"
          onConfirm={() => props.deleteRecipe(recipe._id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined key="delete" />
        </Popconfirm>,
        <Link
          to={`/edit/${recipe._id}`}
          onClick={() => {
            props.changeSelectedNav({ key: 2 });
            props.selectRecipe(recipe);
          }}
        >
          <EditOutlined key="edit" />
        </Link>,
        <Link
          to={`/recipes/${recipe._id}`}
          onClick={() => props.selectRecipe(recipe)}
        >
          <InfoCircleOutlined key="more" />
        </Link>,
      ]}
    >
      <Card.Meta title={recipe.name} description="Great" />
    </Card>
  );
};

export default RecipeCard;
