/*
	Version: 3.5
	Author: Yash Raj Singh
*/

import axios from "axios";

// Contains all urls the app is going to post to.
const endpoints = {
  get: "http://localhost:3001/api/getRecipes",
  update: "http://localhost:3001/api/updateRecipes",
  add: "http://localhost:3001/api/putRecipes",
  delete: "http://localhost:3001/api/deleteRecipes",
  getSingular: "http://localhost:3001/api/getRecipe",
};

export default {
  getData: (data, mode) => {
    // A get request to the url with the following parameters
    if (mode === "ingredients") {
      let ingredients = data.split(",").map((item) => item.trim());
      return axios.get(endpoints.get, {
        params: { ingredients: ingredients, mode: mode },
      });
    } else {
      return axios.get(endpoints.get, { params: { name: data, mode: mode } });
    }
  },

  getRecipe: (data) => {
    return axios.get(endpoints.getSingular, { params: { id: data } });
  },

  addData: (name, imageURL, ingredients, steps, id = null) => {
    // A post request to the url with the following body information
    return axios.post(endpoints.add, {
      name: name,
      ingredients: ingredients,
      steps: steps,
      imageURL: imageURL,
    });
  },

  updateData: (name, imageURL, ingredients, steps, id) => {
    // A post request to the url with the following body information
    return axios.post(endpoints.update, {
      id: id,
      name: name,
      ingredients: ingredients,
      steps: steps,
      imageURL: imageURL,
    });
  },

  deleteData: (id) => {
    // A delete request to the url with the following body information
    return axios.delete(endpoints.delete, {
      data: { id: id },
    });
  },
};
