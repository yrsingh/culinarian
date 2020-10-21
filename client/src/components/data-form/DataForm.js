import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "antd/dist/antd.css";
import { Form, Input, Button, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../../api";

import "./DataForm.css";

const { Title } = Typography;

/*
	Version: 3.5
	Author: Yash Raj Singh
*/

const DataForm = (props) => {
  const { slug } = useParams();
  const [form] = Form.useForm();
  const [apiCall, setApiCall] = useState(() => api.addData);
  const [recipeId, setRecipeId] = useState(null);

  const clearFields = () => {
    form.setFieldsValue({
      name: "",
      imageURL: "",
      ingredients: [
        {
          ingredient: "",
        },
      ],
      steps: [
        {
          step: "",
        },
      ],
    });
  };

  useEffect(() => {
    clearFields();
    if (slug) {
      let recipe = props.selectedRecipe;
      setApiCall(() => api.updateData);

      if (Object.keys(recipe).length === 0 && recipe.constructor === Object) {
        api.getRecipe(slug).then((res) => {
          recipe = res.data.data;
          setRecipeId(recipe._id);
          form.setFieldsValue({
            name: recipe.name,
            imageURL: recipe.imageURL,
            ingredients: recipe.ingredients.map((ingredient) => {
              return {
                ingredient: ingredient,
              };
            }),
            steps: recipe.steps.map((step) => {
              return {
                step: step,
              };
            }),
          });
        });
      } else {
        form.setFieldsValue({
          name: recipe.name,
          imageURL: recipe.imageURL,
          ingredients: recipe.ingredients.map((ingredient) => {
            return {
              ingredient: ingredient,
            };
          }),
          steps: recipe.steps.map((step) => {
            return {
              step: step,
            };
          }),
        });
      }
    }
  }, []);

  const onFinish = (values) => {
    const ingredients = values.ingredients.map((obj) => obj.ingredient);
    const steps = values.steps.map((obj) => obj.step);
    apiCall(values.name, values.imageURL, ingredients, steps, recipeId);
    props.openNotification();
    clearFields();
  };

  return (
    <>
      <Form
        name="RecipeEdit"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="name"
          label="Recipe Name"
          rules={[{ required: true, message: "Missing recipe name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="imageURL"
          label="Image Link"
          rules={[{ required: true, message: "Missing recipe image" }]}
        >
          <Input placeholder="image link" />
        </Form.Item>
        <Title level={4}>Ingredients</Title>
        <Form.List name="ingredients">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <div
                    className="list-input"
                    key={field.key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="start"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "ingredient"]}
                      rules={[
                        { required: true, message: "Missing ingredient" },
                      ]}
                      style={{ flexGrow: 1 }}
                    >
                      <Input placeholder="Ingredient" />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: "0 8px" }}
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Title level={4}>Steps</Title>
        <Form.List name="steps">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <div className="list-input" key={field.name}>
                    <Form.Item
                      {...field}
                      name={[field.name, "step"]}
                      rules={[{ required: true, message: "Missing step" }]}
                      style={{ flexGrow: 1 }}
                    >
                      <Input placeholder="Step" />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: "0 8px" }}
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </div>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DataForm;
