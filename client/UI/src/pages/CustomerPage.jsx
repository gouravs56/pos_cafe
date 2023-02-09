import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState  }  from 'react'
import { DefaultLayout } from '../components/DefaultLayout'

const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const getAllBills = async () => {
    try {
      const { data } = await axios.get(
        "api/bills/get-bills"
      );
      setBillsData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { title: "Customer Id", dataIndex: "_id" },
    { title: "Customer Name", dataIndex: "customerName" },
    { title: " Contact Number", dataIndex: "customerNumber" },
  ]
  useEffect(() => {
  getAllBills();
}, []);
  return (
    <DefaultLayout> <h4>Customer Details</h4>
       <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
    </DefaultLayout>
  ) 
}

export default CustomerPage