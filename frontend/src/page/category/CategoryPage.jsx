
import { Button, Form, Input, message, Modal, Select, Space, Table, Tag } from "antd";
import { MdAdd, MdCancel, MdDelete, MdEdit } from "react-icons/md";
import { request } from "../../util/helper";
import { useEffect, useState } from "react";
import MainPage from "../../components/layout/MainPage";
function CategoryPage() {
    const [formRef] = Form.useForm();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [status, setStatus] = useState(({
        visibleModal: false,
        name: "",
        description: "",
        status: "",
        parent_id: null
    }));
    //effect use handle the side effects such as fetching data and updating the DOM
    useEffect(() => {
        getList();
    },[])
    //getlist
    const getList = async () => {
        setLoading(true);
        const res = await request("category/getlist", "GET");
        setLoading(false);
        if (res) {
            setList(res.list);
        }
    };
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
                description: data.description,
                status: data.status,
                code: data.code
            });
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    };
    //delete
    const onClickDelete = async (data) => {
        try {
            Modal.confirm({
                title: "Are you sure delete this category?",
                // description: "are you soure?",
                //onText: "Ok",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk: async () => {
                    const res = await request("category", "delete", { id: data.id });
                    if (res && !res.error) {
                        message.success(res.message);
                        const newList = list.filter((item) => item.id != data.id);
                        setList(newList);
                    }
                }
            });
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    }
    //close
    const onCloseModal = () => {
        formRef.resetFields();
        setStatus({
            ...status,
            visibleModal: false,
            id: null
        })
    };
    //finish
    const onFinish = async (items) => {
        try{
            var data ={
                id: formRef.getFieldValue("id"),
                name: items.name,
                description: items.description,
                status: items.status,
                code: items.code,
                parent_id: 1
            };
            var method = "post";
            if(formRef.getFieldValue("id")){
                method = "put";
            }
            const res = await request("category", method, data);
            if(res && !res.error){
                message.success(res.message);
                getList();
                onCloseModal();
            }
        }
        catch(err){
            console.log("something when wrong", err)
        }
    }
    return (
        // <div>CategoryPage</div>
        <MainPage loading={loading}>
            <Button type="primary" className="btn-add" icon={<MdAdd />} onClick={onClickAddBtn}>New</Button>
            <Modal
                open={status.visibleModal}
                title={formRef.getFieldValue("Id") ? "Edit category" : "Add new category"}
                footer={null}
                onCancel={onCloseModal}
            >
                <Form layout="vertical" onFinish={onFinish} form={formRef}>
                    <Form.Item name={"name"} label=" category name">
                        <Input placeholder="category name" />
                    </Form.Item>
                    <Form.Item name={"description"} label="description">
                        <Input.TextArea placeholder="description" />
                    </Form.Item>
                    {/* <Form.Item name={"code"} label="code">
                        <Input placeholder="code" />
                    </Form.Item> */}
                    <Form.Item name={"status"} label={"status"}>
                        <Select placeholder="select status"
                            options={[
                                {
                                    label: "Active",
                                    value: "1"
                                },
                                {
                                    label: "InActive",
                                    value: "0"
                                }
                            ]}
                        />
                    </Form.Item>
                    <Space>
                        <Button key={"back"} onClick={onCloseModal} icon={<MdCancel />}>Cancel</Button>
                        <Button type="primary" htmlType="submit" >{formRef.getFieldValue("Id") ? "Update" : "Save"}</Button>
                    </Space>
                </Form>
            </Modal>
            <Table className="table"
                dataSource={list}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (item, data, index) => index + 1
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
                        key: "code",
                        title: "Code",
                        dataIndex: "code"
                    },
                    {
                        key: "description",
                        title: "Description",
                        dataIndex: "description"
                    },
                    {
                        key: "name",
                        title: "Image",
                        dataIndex: "image",
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
                            ),
                    },
                    {
                        key: "Action",
                        title: "Action",
                        align: "center",
                        render: (item, data, index) => (
                            <Space>
                                <Button type="primary" icon={<MdEdit />} onClick={() => onClickEdit(data, index)} />
                                <Button type="primary" danger icon={<MdDelete />} onClick={() => onClickDelete(data, index)} />
                            </Space>
                        ),
                    },
                ]}
            />
        </MainPage>
    );
}

export default CategoryPage;