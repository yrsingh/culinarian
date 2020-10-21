import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

import { List, Divider } from "antd";

const RecipePage = (props) => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    setRecipe(props.selectedRecipe);
    /*api.getRecipe(slug).then((res) => {
      setRecipe(res.data.data);
    }); */
  }, []);

  return (
    <>
      {JSON.stringify(recipe) === "{}" ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <Divider orientation="left">Steps</Divider>
          <List
            bordered
            dataSource={recipe.steps}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          ></List>
        </>
      )}
    </>
  );
};

export default RecipePage;
