import { useEffect, useState } from "react";
import { Table, Tag, Button, Input, Modal, Space, Form, message, Select } from "antd";
import { request } from "../../util/helper";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
//import MainPage from "../../components/layout/MainPage";


//add new
function catepage() {
    const [formRef] = Form.useForm();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        visibleModal: false,
        //id: null,
        name: "",
        descriptoin: "",
        status: "",
        parent_id: null,
    });

    useEffect(() => {
        getList();
    }, []);
    const getList = async () => {
        setLoading(true);
        const res = await request("category/getlist", "get");
        setLoading(false);
        if (res) {
            setList(res.list);
        }
    };
    const onClickEdit = (data) => {
        try {
            setState({
                ...state,
                visibleModal: true,
            });
            formRef.setFieldsValue({
                id: data.id, // hiden id (save? | update?)
                name: data.name,
                description: data.description,
                status: data.status,
            });
        }
        catch (error) {
            console.log(error);
        }
        //
        // formRef.getFieldValue("Id")
    };

    const onClickDelete = async (data) => {
        try {
            Modal.confirm({
                title: "Do you want to delete?",
                description: "Are you sure?",
                okText: "Ok",
                onOk: async () => {
                    const res = await request("category", "delete", {
                        id: data.id,

                        //id: data.id,
                    });
                    if (res && !res.error) {
                        // getList(); // request to api response
                        // remove in local
                        message.success(res.message);
                        const newList = list.filter((item) => item.id != data.id);
                        setList(newList);
                    }
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const onClickAddBtn = () => {
        try {
            setState({
                ...state,
                visibleModal: true,
            });
        }
        catch (error) {
            console.log(error)
        }
    };
    const onCloseModal = () => {
        formRef.resetFields();
        setState({
            ...state,
            visibleModal: false,
            id: null,
        });
    };

    const onFinish = async (items) => {
        var data = {
            id: formRef.getFieldValue("id"),
            name: items.name,
            description: items.description,
            status: items.status,
            parent_id: 1,
        };
        var method = "post";
        if (formRef.getFieldValue("id")) {
            // case update
            method = "put";
        }
        const res = await request("category", method, data);
        if (res && !res.error) {
            message.success(res.message);
            getList();
            onCloseModal();
        }
    };

    //Close button
    // const onCloseModel = async ()=>{
    //     try{
    //         setState({
    //             ...state,
    //             visibleModel:false
    //         })
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // };

    return (
        <div loading={loading}>
            <Button type="primary" className="btn-add" icon={<MdAdd />} onClick={onClickAddBtn} >
                New
            </Button>
            <Modal
                open={state.visibleModal}
                title={formRef.getFieldValue("id") ? "Edit Category" : "New Category"}
                footer={null}
                onCancel={onCloseModal}
            >
                <Form layout="vertical" onFinish={onFinish} form={formRef}>
                    <Form.Item name={"name"} label="Category name">
                        <Input placeholder="Input Category name" />
                    </Form.Item>
                    <Form.Item name={"description"} label="description">
                        <Input.TextArea placeholder="description" />
                    </Form.Item>
                    <Form.Item name={"status"} label="status">
                        <Select
                            placeholder="Select status"
                            options={[
                                {
                                    label: "Active",
                                    value: 1,
                                },
                                {
                                    label: "InActive",
                                    value: 0,
                                },
                            ]}
                        />
                    </Form.Item>

                    <Space>
                        {/* <Button>Cancel</Button> */}
                        <Button
                            key="back"
                            onClick={onCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {formRef.getFieldValue("Id") ? "Update" : "Save"}
                        </Button>
                    </Space>
                </Form>
            </Modal>
            <Table className="table"
                dataSource={list}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (item, data, index) => index + 1,
                    },
                    {
                        key: "id",
                        title: "id",
                        dataIndex: "id",
                    },
                    {
                        key: "name",
                        title: "name",
                        dataIndex: "name",
                    },
                    {
                        key: "description",
                        title: "description",
                        dataIndex: "description",
                    },
                    {
                        key: "status",
                        title: "status",
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
                                <Button
                                    type="primary"
                                    icon={<MdEdit />}
                                    onClick={() => onClickEdit(data, index)}
                                />
                                <Button
                                    type="primary"
                                    danger
                                    icon={<MdDelete />}
                                    onClick={() => onClickDelete(data, index)}
                                />
                            </Space>
                        ),
                    },
                ]}
            />
        </div>
    );
}

export default catepage;
