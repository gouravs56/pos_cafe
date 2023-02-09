import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Button, Table, Modal, Select, message } from "antd";
import { useDispatch } from "react-redux";

const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);
  // popupmodal
  const [popUpModal, setPopUpModal] = useState(false);

  const [editItem, seteditItem] = useState(null);

  const getAllItem = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/item/get-item"
      );
      setItemData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItem();
  }, []);

  // Table data
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
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer", marginRight: 18 }}
            onClick={() => {
              seteditItem(record);
              setPopUpModal(true);
            }}
          />

          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  // handle modal form  Submit
  // CRUD operations
  // for adding new data
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        await axios.post("api/item/add-item", value);
        message.success("Item Added Succesfully ");
        getAllItem();
        setPopUpModal(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      /* for edit */
      try {
        await axios.put("api/item/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Edited Succesfully ");
        getAllItem();
        setPopUpModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // delete function
  const handleDelete = async (record) => {
    try {
      await axios.post("http://localhost:9000/api/item/delete-item", {
        itemId: record._id,
      });
      message.success("Item Deleted Succesfully ");
      getAllItem();
      setPopUpModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayout style={{height:"fit-content"}}>
      <div className="d-flex justify-content-between">
        <h4 style={{ marginBottom: 28 }}>Item List</h4> 
        <button
          type="button"
          onClick={() => setPopUpModal(true)}
          className="btn btn-primary"
          style={{ marginBottom: 28 }}
        >
          Add Item
        </button>
      </div>
      {/* here data source is itemData not cartItem */}
      <Table columns={columns} dataSource={itemData} bordered pagination={false}/>

      {/* modal                                                                     footer false for not letting default submit button in */}
      {popUpModal && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item  "}`}
          open={popUpModal}
          onCancel={() => {
            setPopUpModal(false);
            seteditItem(null);
          }}
          footer={false}
        >
          {/* form in modal for add/edit data */}
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
            id="item-form"
          >
            <Form.Item /* initia3lvalue for prefil data in edit  */
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="image"
              label="image url"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="category" label="category ">
              <Select>
                <Select.Option value="Drinks">Drinks</Select.Option>
                <Select.Option value="Rice">Rice</Select.Option>
                <Select.Option value="Noodles">Noodles</Select.Option>
                <Select.Option value="Miscellaneous">Miscellaneous</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
    
  );
};

export default ItemPage;
