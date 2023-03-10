
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
// import { useAppDispatch, useAppSelector } from '../../../../store/store';
// import { getAll, userSelector } from '../../../Auth/Login/userSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getAll, disciplineSelector, removeDiscipline, deleteDiscipline } from '../disciplineSlice';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import { directorySelector, getDisciplineD } from '../../../../../slices/directorySlice';
import Delete from '../../../../../components/button/Delete';
import Update from '../../../../../components/button/Update';
import Detail from '../../../../../components/button/Detail';

type Props = {}



const DisciplineList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [disciplineDi, setDisciplineDi] = useState(null);
    const [officer, setOfficer] = useState(null);
    const dispatch = useAppDispatch();
    const { disciplines, authLoading } = useAppSelector(disciplineSelector)
    const { disciplineD } = useAppSelector(directorySelector)
    const { users } = useAppSelector(userSelector);
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, userOption: officer, disciplineOption: disciplineDi }));
        dispatch(getUsers())
        dispatch(getDisciplineD());
    }, [keyword, officer, disciplineDi])
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const disciplineDOptions = disciplineD.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenKyLuat}</Select.Option>
    ))
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'T??n K??? Lu???t',
            dataIndex: 'tenKyLuat',
            key: 'tenKyLuat',
        },
        {
            title: 'T??n C??n B???',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'N??m K??? Lu???t',
            dataIndex: 'namBiKyLuat',
            key: 'namBiKyLuat',
        },
        {
            title: 'N??m X??a K??? Lu???t',
            dataIndex: 'namXoaHieuLucKyLuat',
            key: 'namXoaHieuLucKyLuat',
        },
        {
            title: 'C?? Quan',
            dataIndex: 'coQuan',
            key: 'coQuan',
        },
        {
            title: 'S??? C??ng V??n',
            dataIndex: 'soCongVan',
            key: 'soCongVan',
        },
        {
            title: 'Ghi Ch??',
            dataIndex: 'ghiChu',
            key: 'ghiChu',
        },
        {
            key: 'action',
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Detail link={`/admin/disciplinemanagement/${record.id}`} id={record.id} />
                        <Update link={`/admin/disciplinemanagement/update/${record.id}`} id={record.id} />
                        <Delete
                            title='k??? lu???t'
                            id={record.id}
                            removeAction={removeDiscipline}
                            deleteAction={deleteDiscipline}
                            dailyName='Th??ng tin k??? lu???t'
                        />
                    </Space>
                )
            }
        },
    ];
    const headers = [
        {
            label: 'STT',
            key: 'id',
        },
        {
            label: 'T??n K??? Lu???t',
            key: 'tenKyLuat',
        },
        {
            label: 'T??n C??n B???',
            key: 'tenCanBo',
        },
        {
            label: 'N??m K??? Lu???t',
            key: 'namBiKyLuat',
        },
        {
            label: 'N??m X??a K??? Lu???t',
            key: 'namXoaHieuLucKyLuat',
        },
        {
            label: 'C?? Quan',
            key: 'coQuan',
        },
        {
            label: 'S??? C??ng V??n',
            key: 'soCongVan',
        },
        {
            label: 'Ghi Ch??',
            key: 'ghiChu',
        },
    ];
    const data2 = disciplines.map(discipline => ({
        tenKyLuat: discipline.DM_ky_luat?.tenKyLuat,
        tenCanBo: isNameOff(users, discipline.fkMaCanBo),
        ...discipline
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh s??ch k??? lu???t
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Ch???n m???c k??? lu???t</Typography.Text>
                    <Select
                        placeholder='Ch???n m???c k??? lu???t'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setDisciplineDi(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {disciplineDOptions}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Ch???n t??n c??n b???</Typography.Text>
                    <Select
                        placeholder='Ch???n t??n c??n b???'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setOfficer(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {userOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 450, marginLeft: 80 }}
                >
                    <Typography.Text className={styles.title_item}>T??? kh??a</Typography.Text>
                    <Input
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Nh???p t??? kh??a c???n t??m'
                        style={{ borderRadius: '0.3rem', marginTop: 2, height: 44 }}
                    />
                </Form.Item>
                <Form.Item
                    className={styles.addButton}
                >
                    <Button className={styles.button} style={{ height: 44, width: 100 }}>
                        <Link to={'/admin/disciplinemanagement/add'}>Th??m</Link>
                    </Button>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx} style={{ marginLeft: 120 }}>
                        <Typography.Text className={styles.textEx}>
                            Xu???t file {'(.csv)'}
                        </Typography.Text>
                    </CSVLink>
                </Form.Item>
            </Form>
            <Row>

                <Table
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : styles.dark}
                    className={styles.table}
                    dataSource={
                        disciplines.map((discipline, index) => ({
                            stt: index + 1,
                            tenKyLuat: discipline.DM_ky_luat?.tenKyLuat,
                            tenCanBo: isNameOff(users, discipline.fkMaCanBo),
                            ...discipline
                        }))
                    }
                    columns={columns}
                    size='middle'
                    loading={authLoading}
                    pagination={{
                        pageSize: 8,
                        position: ['bottomCenter'],
                        showLessItems: true,
                        showSizeChanger: false,
                        itemRender(page, type, element) {
                            if (type === 'prev') {
                                return <CaretLeftOutlined />;
                            }
                            if (type === 'next') {
                                return <CaretRightOutlined style={{ color: '#FF993C' }} />;
                            }
                            return element;
                        },
                    }}
                />
            </Row>
        </Row>
    )
}
export default DisciplineList