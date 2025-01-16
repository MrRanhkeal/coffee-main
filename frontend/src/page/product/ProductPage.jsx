import { Button, Form, Modal, Table } from 'antd'
import React, { useEffect,useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { request } from '../../util/helper';

function ProductPage() {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        list: [],
        total: 0,
        loading: false,
        visibleModal: false
    });

    useEffect(() => {
        getList();
    })
    const getList = async () => {
        setState({
            ...state,
            loading: true
        });
        const res = await request("product", "get");
        setState({
            ...state,
            list: res.list,
            total: res.total,
            loading: false
        });
    }







    return (
        // <div>ProductPage</div>
        <div>
            <Modal>
            <Button type='primary' className='btn-add' icon={<MdAdd />}>Add New</Button>
                <Form>

                </Form>
            </Modal>
            <Table className='table'
                dataSource={state.list}
                columns={[

                ]}

            />
        </div>
    )
}

export default ProductPage