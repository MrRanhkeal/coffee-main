//import React, {  } from "react";
import { PieChartOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Input, Layout, Menu, Space, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { getProfile, setAccesToken, setProfile } from "../../store/profile.store";
import { request } from "../../util/helper";
const { Content, Sider } = Layout;
import "../../App.css";
import { useEffect, useState } from "react";
import { configStore } from "../../store/config.store";
import Logo from "../../assets/coffee.jpg";
import ImgUser from "../../../../back-api/image/users/ranh_admin.jpg";

//dardk
// import React, { useContext } from 'react';
// import { ThemeProvider, ThemeContext } from "../contexts/ThemeContext";



const items = [
    {
        key: "login",
        label: "Login",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        key: "register",
        label: "Register",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        key: "",
        label: "Home",
        icon: <PieChartOutlined />,
        children: null,
    },
    {
        key: "dashboard",
        label: "Dashboard",
        icon: <PieChartOutlined />,
        children: null,
    },
    {

        key: "user",
        label: "User",
        icon: <PieChartOutlined />,
        children: null,
    },

    // page porduct
    {

        key: "product",
        label: "Product",
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

        key: "employee",
        label: "Employee",
        icon: <PieChartOutlined />,
        children: null,
    },
    {

        key: "customer",
        label: "Customer",
        icon: <PieChartOutlined />,
        children: null,
    },
    {

        key: "order",
        label: "Order",
        icon: <PieChartOutlined />,
        children: null,
    },
    {

        key: "report",
        label: "Report",
        icon: <PieChartOutlined />,
        children: null,
    },
    {

        key: "role",
        label: "Role",
        icon: <PieChartOutlined />,
        children: null,
    },
    {

        key: "setting",
        label: "Setting",
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

    const { setConfig } = configStore();
    const profile = getProfile();
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const navigate = useNavigate();



    // const permission = getPermission();
    // const { setConfig } = configStore();
    // const profile = getProfile();
    // const [collapsed, setCollapsed] = useState(false);
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();
    // const navigate = useNavigate();

    // const [items, setItems] = useState([]);

    useEffect(() => {
        getConfig();
        if (profile === null) {
            navigate("/login");
        }
    });

    const getConfig = async () => {
        const res = await request("config", "get");
        if (res) {
            setConfig(res);
        }
    }
    const onClickMenu = (item) => {
        navigate(item.key);
    }
    const onLoginout = () => {
        setProfile("");
        setAccesToken("");
        navigate("/login");
    }
    if (!profile) {
        return null;
    }

    //theme
    // const ThemeToggleButton = () => {
    //     const { theme, toggleTheme } = useContext(ThemeContext);

    //     return (
    //         <button className={theme} onClick={toggleTheme}>
    //             🔆 {theme === "light" ? "Dark" : "Light"} 🌛
    //         </button>
    //     );
    // };
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
            minWidth: "100vw"
        }}
        >   
            <Sider
                collapsible //show collapse button
                collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}

            >
                {/* <div className='demo-logo-vertical' /> */}
                <Menu
                    theme='dark' //dark or light theme
                    defaultSelectedKeys={['1']}
                    mode='inline' items={items} //show items
                    onClick={onClickMenu} //click menu to access route

                />
            </Sider>
            <Layout >

                <div className='admin-header'>
                    <div className='admin-header-g1'>
                        <div>
                            <img className='admin-logo' src={Logo} alt="Logo" style={{}} />
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
                            {/* <div className='txt-username'>{profile?.name}</div> */}
                            <div>{profile?.role_name}</div>
                        </div>
                    </div>
                    <Dropdown menu={{
                        items: itemsDropdown,
                        onClick: (event) => {
                            if (event.key == "logout") {
                                onLoginout();
                            }
                        },
                    }} >
                        <img className='img-user' src={ImgUser} alt='Logo' />
                    </Dropdown>
                    {/* theme */}
                    {/* <ThemeProvider>
                        <ThemeToggleButton />
                    </ThemeProvider> */}
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
