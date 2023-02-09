import React, { useState, useEffect } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";

const cartPage = () => {
  // subTotal
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { cartItem } = useSelector((state) => state.rootReducer);
  const handleSubmit =async (value) => {
    try {
      const newObj={
        ...value,
        cartItem,
        subTotal,
       tax: Number(((subTotal / 100) * 10).toFixed(2)),
       totalAmount:Number((subTotal)+Number(((subTotal / 100) * 10).toFixed(2))),
      }
      await axios.post('http://localhost:9000/api/bills/add-bills',newObj)
      message.success('bills generated')
      navigate('/bills')
    } catch (error) {
      message.error('something went wrong')
      console.log(error)
    }
    
  };
  const handleIncrement = (record) => {
    /* to prevent it from going bellow one */
    dispatch({
      type: "Update_Cart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      /* to prevent it from going bellow one */ dispatch({
        type: "Update_Cart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };
  const handleDelete = (record) => {
    dispatch({
      type: "Delete_Cart_Item",
      payload: record,
    });
  };
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="50" width="50" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity} </b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];

  // calculation for billing (subtotal)
  useEffect(() => {
    let temp = 0;
    cartItem.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItem]);

  return (
    <DefaultLayout>
      <h4 style={{ marginBottom: 28 }}>Cart Items</h4>
      <Table columns={columns} dataSource={cartItem} bordered />
      <div className="total">
        <hr /> {/* to create a straight line to seperate subtotal and item */}
        <h4>
          SUB TOTAL: <b> {subTotal}/-</b>
        </h4>
        <Button type="primary" width="30px" onClick={() => setBillPopup(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        open={billPopup}
        footer={false}
        onCancel={() => setBillPopup(false)}
      >
        {" "}
        <Form layout="vertical" id="cart-form" onFinish={handleSubmit}>
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="customerNumber"
            label="Customer Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="payMode" label="Payment Method ">
            <Select>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-item">
            <h6>
              Sub Total: <b>{subTotal}</b>
            </h6>
            <h5>
              Tax: <b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h5>
            <h4>
              Grand Total: <b>{Number(subTotal)+Number(((subTotal / 100) * 10).toFixed(2))} /-</b>
            </h4>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default cartPage;
