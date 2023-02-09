import React, { useState, useEffect } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import axios from "axios";
import ItemList from "../components/ItemList";
import { Row, Col } from "antd";

const HomePage = () => {
  const [itemData, setItemData] = useState([]);

  //  filtering categories
  const [selectedCategory, setSelectedCategory] = useState("Drinks");
  const categories = [
    {
      name: "Drinks" /* here name = the db category name(case sensitive) */,
      imageUrl: "https://cdn-icons-png.flaticon.com/512/924/924514.png",
    },
    {
      name: "Rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/4034/4034111.png",
    },
    {
      name: "Noodles",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png",
    },
    {
      name: "Miscellaneous",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/776/776443.png",
    },
  ];

  // fetching all backend data in ui
  useEffect(() => {
    const getAllItem = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9000/api/item/get-item"
        );
        setItemData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItem();
  }, []);

  return (
    <DefaultLayout>
      <Row gutter={[16, 16]}>
        {categories.map((category, i) => (
          <Col
            xs={{ span: 12 }}
            sm={{ span: 14 }} /* 1x1 */
            md={{ span: 12 }} /* 2x2 */
            lg={{ span: 8 }} /* 3x3 */
            xl={{ span: 6 }} /* 4x4 */
            key={i}  
          >
            <div
              className={`d-flex category ${
                selectedCategory === category.name && "category-active"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                height="40"
                width="50"
              />
              <br />
              <br />
              <h4>{category.name}</h4>
            </div>
          </Col>
        ))}
      </Row>
      <br />
      <br />
      {/* card items grid responsiveness */}
      <Row gutter={[6, 6]}>
        {itemData
          .filter((items) => items.category === selectedCategory)
          .map((item) => (
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }} /* 1x1 */
              md={{ span: 12 }} /* 2x2 */
              lg={{ span: 8 }} /* 3x3 */
              xl={{ span: 6 }} /* 4x4 */
            >
              {/* ant design  width breakpoint xtra small,small,mid,large */}
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default HomePage;
