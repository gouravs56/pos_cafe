import React from "react";
import { Card } from "antd";
const { Meta } = Card;
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  // update cart handler
  const handleAddToCart = () => {
    dispatch({
      type: "AddToCart",
      payload: { ...item, quantity: 1 } ,/* changing state */
    });
  };
  return (
    <div>
      <Card
        style={{
          width: 200,
          height:250,
          marginBottom: 30 /* card style */,
          marginLeft: 30 
        }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{ height: 120, position: "inherit" }}
          />
        }
      >
        <Meta
          title={item.name}
          style={{ padding: 6, margin: 6, textAlign: "center" }}
        />
        <button
          type="button"
          onClick={handleAddToCart}
          className="btn btn-success"
          style={{ padding: 6, marginLeft: 16, textAlign: "center" }}
        >
          Add To Cart
        </button>
      </Card>
    </div>
  );
};

export default ItemList;
