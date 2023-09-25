import React from "react";
import { FaUser, FaShoppingCart, FaBox } from "react-icons/fa";
import axios from "axios";

export const InfoBox = [
  {
    title: "Customers",
    icon: <FaUser />,
  },
  {
    title: "Products",
    icon: <FaShoppingCart />,
  },
  {
    title: "Orders",
    icon: <FaBox />,
  },
];

export const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export async function DataBoxUsers() {
  return await axios
    .get("https://dummyjson.com/carts")
    .then((response) => {
      const updatedData = response.data.carts.map((order) => {
        return order.products.map((product) => {
          return {
            id: product.id,
            amount: product.price,
          };
        });
      });
      return updatedData;
    })
    .catch((error) => {
      throw error;
    });
}

export async function DataBoxOrders() {
  return await axios
    .get("https://dummyjson.com/comments")
    .then((response) => {
      const updatedData = response.data.comments.map((user) => {
        return {
          id: user.id,
          amount: user.postId,
        };
      });
      return updatedData;
    })
    .catch((error) => {
      throw error;
    });
}

export async function DataBoxProducts() {
  return await axios
    .get("https://dummyjson.com/products")
    .then((response) => {
      const products = response.data.products;
      const totalProducts = products.length;
      const updatedData = products.map((user) => {
        return {
          id: user.id,
          amount: user.stock,
        };
      });
      return [
        {
          count: totalProducts,
        },
        ...updatedData,
      ];
    })
    .catch((error) => {
      throw error;
    });
}
