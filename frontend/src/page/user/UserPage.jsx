//import React from 'react'
//import MainPage from '../../components/layout/MainPage'
import { Modal, Form, Table, Tag, Button, Input, Select, Space, message } from 'antd';
import { MdAdd, MdCancel, MdDelete, MdEdit } from "react-icons/md";
import { request } from "../../util/helper";
import { useEffect, useState } from "react";
function UserPage() {
    const [formRef] = Form.useForm();
    const [List, setList] = useState([]);
    const [loading, setLoading] = useState(false); //loading mainpage when data connected stay on MianPage
    const [status, setStatus] = useState({
        visibleModal: false,
        name: "",
        username: "",
        phone: "",
        sex: "",
        status: "",
    })
    //effect use handle the side effects such as fetching data and updating the DOM
    useEffect(() => {
        getList();
    })
    //get list user
    const getList = async () => {
        setLoading(true);
        const res = await request("user", "get");
        setLoading(false);
        if (res) {
            setList(res);
        }
    }
    //add new
    const onClickAddBtn = () => {
        try {
            setStatus({
                ...status,
                visibleModal: true
            })
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    }
    //edit
    const onClickEdit = (data) => {
        try {
            setStatus({
                ...status,
                visibleModal: true,
            });
            formRef.setFieldValue({
                id: data.id, //hide id on(save or update)
                name: data.name,
                username: data.username,
                phone: data.phone,
                sex: data.sex,
                status: data.status
            });
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    }
    //delete
    const onClickDelete = (data) => {
        try {
            Modal.confirm({
                title: "Are you sure delete this category?",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk: async () => {
                    const res = await request("user", "delete", { id: data.id });
                    if (res && !res.error) {
                        message.success(res.message);
                        const newList = List.filter((item) => item.id !== data.id);
                        setList(newList);
                    }
                }
            });
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    }
    //close modal
    const onCloseModal = () => {
        setStatus({
            ...status,
            visibleModal: false,
            id: null
        })
    }
    //finish
    const onFinish = async (items) => {
        try {
            var data = {
                id: formRef.getFieldValue("id"),
                name: items.name,
                username: items.username,
                phone: items.phone,
                sex: items.sex,
                status: items.status
            };
            var method = "post";
            if (formRef.getFieldValue("id")) {
                method = "put";
            }
            const res = await request("user", method, data);
            if (res && !res.error) {
                message.success(res.message);
                getList();
                onCloseModal();
            }
        }
        catch (error) {
            console.log("something when wrong", error)
        }

    }
    return (
        // <div>UserPage</div>
        <div loading={loading}>
            <Button type="primary" className="btn-add" icon={<MdAdd />} onClick={onClickAddBtn}>New</Button>
            <Modal
                open={status.visibleModal}
                title={formRef.getFieldValue("id") ? "Edit User" : "New User"}
                footer={null}
                onCancel={onCloseModal}
            >
                <Form layout="vertical" onFinish={onFinish} form={formRef}>
                    <Form.Item name={"name"} label="name">
                        <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item name={"username"} label="username">
                        <Input type='email' placeholder="username" />
                    </Form.Item>
                    <Form.Item name={"phone"} label="phone">
                        <Input placeholder="phone" />
                    </Form.Item>
                    <Form.Item name={"sex"} label="sex">
                        <Input placeholder="sex" />
                    </Form.Item>
                    <Form.Item name={"status"} label="status">
                        <Select placeholder="select status"
                            options={[
                                {
                                    label: "Active",
                                    value: 1
                                },
                                {
                                    label: "InActive",
                                    value: 0
                                }
                            ]}
                        />
                    </Form.Item>
                    <Space>
                        <Button type="primary" onClick={onCloseModal} icon={<MdCancel />}>Cancel</Button>
                        <Button type="primary" htmlType="submit" >{formRef.getFieldValue("id") ? "Update" : "Save"}</Button>
                    </Space>
                </Form>
            </Modal>
            <Table className="table"
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (text, record, index) => index + 1,
                    },
                    {
                        key: "id",
                        title: "Id",
                        dataIndex: "id"
                    },
                    {
                        key: "name",
                        title: "Name",
                        dataIndex: "name"
                    },
                    {
                        key: "username",
                        title: "Username",
                        dataIndex: "username"
                    },
                    {
                        key: "phone",
                        title: "Phone",
                        dataIndex: "phone"
                    },
                    {
                        key: "sex",
                        title: "Sex",
                        dataIndex: "sex"
                    },
                    {
                        key: "status",
                        title: "Status",
                        dataIndex: "status",
                        render: (Status) =>
                            Status == 1 ? (
                                <Tag color="green">Active</Tag>
                            ) : (
                                <Tag color="red">InActive</Tag>
                            )

                    },
                    {
                        key: "action",
                        title: "Action",
                        align: "center",
                        render: (item, data, index) => (
                            <Space>
                                <Button type="primary" danger icon={<MdEdit />} onClick={() => onClickEdit(data, index)} />
                                <Button type="primary" danger icon={<MdDelete />} onClick={() => onClickDelete(data, index)} />
                            </Space>
                        )
                    }
                ]}
            />
        </div>
    )
}

export default UserPage