import React, { useEffect, useState ,useRef } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import { EyeOutlined } from "@ant-design/icons";
import { Table, Modal,Button } from "antd";
import { useDispatch } from "react-redux";

const BillsPage = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  // popupmodal
  const [popUpModal, setPopUpModal] = useState(false);

  const [selectedBills, setSelectedBills] = useState(null);
  // for printing
  const componentRef = useRef();
  const getAllBills = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/bills/get-bills"
      );
      setBillsData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);
  // print fnction
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Table data
  const columns = [
    { title: "Customer Id", dataIndex: "_id" },
    { title: "Customer Name", dataIndex: "customerName" },
    { title: "Sub Total ", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount ", dataIndex: "totalAmount" },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined 
            style={{ cursor: "pointer", marginRight: 18 }}
            onClick={() => {
              setSelectedBills(record);
              setPopUpModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout >
      <div className="d-flex justify-content-between">
        <h4 style={{ marginBottom: 28 }}>Invoice List</h4>
      </div>
      {/* here data source is itemData not cartItem */}
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />

      {/* modal                                                                     footer false for not letting default submit button in */}
      {popUpModal && (
        <Modal
          title="Invoice Details"
          open={popUpModal}
          style={{textAlign:"center"}}
          onCancel={() => {
            setPopUpModal(false);
          }}
          footer={false}
        >
          {/* Invoice Modal */}
          <div id="invoice" ref={componentRef}>
            <center id="top">
              <div className="invoiceLogo" />
              <div className="info">
                <h3>GS</h3>
                <p>Contact:  9876543210  |  Kolkata</p>
              </div>
            </center>
            {/* end of details about shop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b> {selectedBills.customerName}</b><br />
                  Customer Number : <b> {selectedBills.customerNumber}</b><br />
                  Date : <b> {selectedBills.date.toString().substring(0,10)}</b><br />
                </p>
                {/* <hr style={{margin:"5px"}} /> */}
              </div>
            </div>
            {/* invoice e details */}
            <div >
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tableTitle">
                      <td className="item">
                        <h3>Items</h3>
                      </td>
                      <td className="Qty">
                        <h3>Qty</h3>
                      </td>
                      <td className="price">
                        <h3>Price</h3>
                      </td>
                      <td className="rate">
                        <h3>Total</h3>
                      </td>
                    </tr>
                     {selectedBills.cartItem.map((item)=>(
                      <>
                      <tr className="service">
                        <td className="tableItem">
                          <p className="item-text">{item.name} </p>
                        </td>
                        <td className="tableItem">
                          <p className="item-text">{item.quantity} </p>
                        </td>
                        <td className="tableItem">
                          <p className="item-text">{item.price} </p>
                        </td>
                        <td className="tableItem">
                          <h3 className="item-text">{item.quantity * item.price} </h3>
                        </td>
                      </tr>
                      </>
                     ))}
                     <tr className="tableTitle">
                      <td/>
                      <td/>
                      <td className="rate">
                        <h3>Tax:</h3>
                      </td>
                      <td className="payment">
                        <h3>{selectedBills.tax}</h3>
                      </td>
                     </tr>
                     <tr className="tableTitle">
                      <td/>
                      <td/>
                      <td className="rate">
                        <h3>Grand Total: </h3>
                      </td>
                      <td className="payment">
                        <h3><b> {selectedBills.totalAmount}</b></h3>
                      </td>
                     </tr>
                  </tbody>
                </table>
              </div>
              {/* end message */}
              <div className="EndNote">
                <br />
                <p>Thanks for shopping!!</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
          <Button type="primary" onClick={handlePrint}>Print</Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
