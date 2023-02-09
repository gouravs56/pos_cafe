import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme  } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/DefaultLayout.css";
const { Header, Sider, Content } = Layout;


// Beginning of the DefaultLayout func
export function DefaultLayout(props) {
 
  // here useNavigate is used for programmatically navigate between routes of home to cart page
  const navigate = useNavigate();

  //useSelector hook allows to access data stored in the Redux store
  const { cartItem } = useSelector(
    (state) => state.rootReducer
  ); /* destructuring cart items */

  useEffect(() => {
    /* localStorage is used for client-side storage that is continued across sessions */
    localStorage.setItem(
      "cartItem",
      JSON.stringify(cartItem)
    ); /* setting cart items */
  }, [cartItem]);

  // if the window width is greater than 450 (large mobile wdith) then default collapse is false
  const defaultCollapse = () => {
    if (window.innerWidth > 450) return false;
    else return true;
  };

  // to set toggle collapse or not by default
  const [collapsed, setCollapsed] = useState(defaultCollapse());
  
  return (
    // ant design Layout with side nave-- customized
  <Layout className="main">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="colorPrimary" >
        <div className="logo">
          <h4 className="text-center text-light">GS</h4>
        </div>
        <Menu
          theme=""
          mode="inline"
          defaultSelectedKeys={window.location.pathname}>

          <Menu.Item key="/" icon={<HomeOutlined />} className="text">
            <Link to="/" id="side-logo" className="text">
              Home
            </Link>
          </Menu.Item>

          <Menu.Item key="/bills" icon={<CopyOutlined />} className="text">
            <Link to="/bills" className="text">
              Bills
            </Link>
          </Menu.Item>

          <Menu.Item
            key="/items"
            icon={<UnorderedListOutlined />}className="text">
            <Link to="/items" className="text">
              Items
            </Link>
          </Menu.Item>

          <Menu.Item key="/customers" icon={<UserOutlined />} className="text">
            <Link to="/customers" className="text">
              Customers
            </Link>
          </Menu.Item>

        </Menu>
      </Sider>
      <Layout className="site-layout">
       
       
  <Header /* header and toggle icon style */
          style={{
            padding: 0,
            background:
              "radial-gradient(circle, rgba(10,182,186,1) 13%, rgba(8,138,117,1) 82%, rgba(8,124,117,1) 100%)",
            color: "#ffffff",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="cart-item">
            <p id="cart-length">{cartItem.length}</p>
          </div>
          <ShoppingCartOutlined
            id="cart-icon"
            onClick={() => navigate("./cart")}
          />
        </Header>
       
        <Content
          style={{
            margin: "6px 16px",
            padding: 24,
            background:
              "radial-gradient(circle, rgba(10,182,186,1) 13%, rgba(8,138,117,1) 82%, rgba(8,124,117,1) 100%)",
            color: "#ffffff",
            paddingRight: 40,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout> 
  );
}
