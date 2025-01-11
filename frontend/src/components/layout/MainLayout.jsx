//import React, {  useEffect, useState } from "react";
import { PieChartOutlined, SmileOutlined } from "@ant-design/icons";
import {  Dropdown, Input, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { getProfile} from "../../store/profile.store";
import { request } from "../../util/helper";
const { Content, Sider } = Layout;
import "../../App.css";
import { useEffect, useState } from "react";

const items = [
    {
        label: "Home",
        key: "",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        label: "Dashboard",
        key: "dashboard",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        label: "User",
        key: "user",
        icon: <PieChartOutlined />,
        children: null,
    },
    // page porduct
    {
        label: "Product",
        key: "product",
        icon: <PieChartOutlined />,
        children: [
            {
                key: "category",
                label: "Category",
                icon: <PieChartOutlined />,
                children: null,
            },
            // {
            //     key: "product type",
            //     label: "product type",
            //     icon: <PieChartOutlined />,
            //     children: null,
            // },
            {
                key: "product",
                label: "Product",
                icon: <PieChartOutlined />,
                children: null,
            },
            
        ],
        
    },
    {
        label: "Employee",
        key: "employee",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        label: "Customer",
        key: "customer",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        label: "Order",
        key: "order",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        label: "Report",
        key: "report",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        label: "Role",
        key: "role",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        label: "Setting",
        key: "setting",
        icon: <PieChartOutlined />,
        children: null,
    }
];

const MainLayout = () => {
    // const permission = getPermission();
    // const { setConfig } = configStore();
    // const profile = getProfile();
    // const [collapsed, setCollapsed] = useState(false);
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();
    // const navigate = useNavigate();

    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     getMenuByUser();
    //     getConfig();
    //     if (!profile) {
    //         navigate("/login");
    //     }
    // }, []);

    // const getMenuByUser = () => {
    //     let new_item_menu = [];
    //     items_menu?.map((item1) => {
    //         // level one
    //         const p1 = permission?.findIndex(
    //             (data1) => data1.web_route_key == "/" + item1.key
    //         );
    //         if (p1 != -1) {
    //             new_item_menu.push(item1);
    //         }

    //         // level two
    //         if (item1?.children && item1?.children.length > 0) {
    //             let childTmp = [];
    //             item1?.children.map((data1) => {
    //                 permission?.map((data2) => {
    //                     if (data2.web_route_key == "/" + data1.key) {
    //                         childTmp.push(data1);
    //                     }
    //                 });
    //             });
    //             if (childTmp.length > 0) {
    //                 item1.children = childTmp; // update new child dreen
    //                 new_item_menu.push(item1);
    //             }
    //         }
    //     });
    //     setItems(new_item_menu);
    // };

    // const getConfig = async () => {
    //     const res = await request("config", "get");
    //     if (res) {
    //         setConfig(res);
    //     }
    // };

    //const onClickMenu = (item) => {
    //     navigate(item.key);
    // };
    // const onLoginOut = () => {
    //     setProfile("");
    //     setAccesToken("");
    //     navigate("/login");
    // };

    // if (!profile) {
    //     return null;
    // }

    //new source
    const profile = getProfile();
    const [collapsed, setCollapsed] = useState(false);
    const {token:{colorBgContainer, borderRadiusLG}} = theme.useToken();
    const navigate = useNavigate();

    useEffect(() => {
        getConfig();
        // if(profile === null){
        //     navigate("/login");
        // }
    }, 
    []);

    const getConfig = async () => {
        const res = await request("config", "get");
        if (res) {
            //setConfig(res);
        }
    }
    const onClickMenu = (item) => {
        navigate(item.key);
    }

    const itemsDropdown = [
        {
            key: "1",
            label: (
                <a target='_blank' rel='noopener noreferrer' href='/'>profile</a>
            ),
            //insert more source
        },
        {
            key: "2",
            label: (
                <a target='_blank' rel='noopener noreferrer' href='/'>change password</a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: "logout",
            danger: true,
            label: "Logout",
            //onClick: onLoginout
        }
    ];

    return (
        <Layout style={{
            minHeight: "100vh",
            
        }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className='demo-logo-vertical' />
                <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} onClick={onClickMenu} />
            </Sider>
            <Layout>
                <div className='admin-header'>
                    <div className='admin-header-g1'>
                        <div>
                            {/* <img className='admin-logo' src={Logo} alt="Logo" /> */}
                        </div>
                        <div>
                            <div className='txt-brand-name'>POS-SYSTEM</div>
                            <div>Coffee-Shop</div>
                        </div>
                        <div>
                            <Input.Search style={{ width: 180, marginLeft: 15, marginTop: 10 }} size='large' placeholder='Search' />
                        </div>
                    </div>
                    <div className='admin-header-g2'>
                        <IoIosNotifications className='icon-notify' />
                        <MdOutlineMarkEmailUnread className='icon-email' />
                        <div>
                            <div className='txt-username'>{profile?.name}</div>
                            <div>{profile?.role_name}</div>
                        </div>
                    </div>
                    <Dropdown menu={{
                        items: itemsDropdown,
                        onClick: (event) => {
                            if (event.key == "logout") {
                                // onLoginout();
                            }
                        },
                    }} >
                        {/* <img className='img-user' src={ImgUser} alt='Logo' /> */}
                    </Dropdown>
                </div>
                <Content style={{ margin: "16px" }}>
                    <div className='admin-body' style={{ backgroundColor: colorBgContainer, borderRadius: borderRadiusLG }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
