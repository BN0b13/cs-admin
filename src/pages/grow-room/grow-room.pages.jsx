import { useContext, useEffect, useState } from 'react';

import AdminModal from '../../components/reusable/admin-modal/admin-modal.component';
import Button from '../../components/reusable/button/button.component';
import GRServerLogsTable from '../../components/reusable/tables/gr-server-logs-table/gr-server-logs-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import { ToastContext } from '../../contexts/toast.context';

import Client from '../../tools/client';

import {
    ColumnContainer,
    MainContainer,
    Option,
    Select,
    Subtitle,
    Text,
    Title
} from '../../styles/component.styles';

const client = new Client();

const GrowRoomPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ serverHealth, setServerHealth ] = useState(false);
    const [ logs, setLogs ] = useState([]);
    const [ deleteLogId, setDeleteLogId ] = useState(null);
    const [ outletStatus, setOutletStatus ] = useState(null);
    const [ cycleTime, setCycleTime ] = useState(10000);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(100);
    const [ sortKey, setSortKey ] = useState('');
    const [ sortDirection, setSortDirection ] = useState('');

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const { errorToast, successToast } = useContext(ToastContext);

    useEffect(() => {
        getHealth();
        getPowerStatus();
        getLogs();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(loadData) {
            getLogs();
            getPowerStatus();
            setLoadData(false);
        }
    }, [ loadData ]);

    const getHealth = async () => {
        setLoading(true);
        const res = await client.getGRServerHealth();
        setServerHealth(res.status);
        setLoading(false);
    }

    const getPowerStatus = async () => {
        setLoading(true);
        const res = await client.outletStatus();
        setOutletStatus(res.outletStatus);
        setLoading(false);
    }

    const getLogs = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;
        sortDirection && (query = query + `&sortDirection=${sortDirection}`);
        sortKey && (query = query + `&sortKey=${sortKey}`);
        const res = await client.getGRServerLogs(query);
        setLogs(res.rows);
        setLoading(false);
    }

    const deleteLog = async (id) => {
        setDeleteLogId(id);
        setShowDeleteModal(true);
    }

    const deleteLogById = async (id) => {
        if(!deleteLogId) {
            errorToast('There was an error deleting the log');
            return
        }

        await client.deleteGRServerLogById(deleteLogId);
        setLoadData(true);
        setShowDeleteModal(false);
        successToast('Log Deleted Successfully');
    }

    const cyclePowerOnOff = async () => {
        const res = await client.cyclePowerOnOff(cycleTime);
        
        if(res.status !== 200) {
            errorToast('There was an error cycling water pumps.');
            return
        }
        
        successToast(`Water pumps cycling for ${cycleTime/1000} seconds`);
        setLoadData(true);
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title={'Delete Log'}
                message={`Are you sure you want to delete this log forever?`} 
                action={deleteLogById} 
                actionText={'Delete'}
            />
            {loading ?
                <Spinner />
            :
                <ColumnContainer margin={'20px 0'}>
                    {serverHealth !== 200 ?
                        <Subtitle>Grow Room Server is down</Subtitle>
                    :
                        <>
                            <Title>Grow Room Dashboard</Title>
                            <Text>Outlet Status: { outletStatus !== null ? (outletStatus === 1 ? 'On' : 'Off') : 'Status not available' }</Text>
                            <ColumnContainer margin={'0 0 20px 0'}>
                                <Select onChange={(e) => setCycleTime(e.target.value)}>
                                    <Option key={0} value={10000}>10 Seconds</Option>
                                    <Option key={1} value={20000}>20 Seconds</Option>
                                    <Option key={2} value={30000}>30 Seconds</Option>
                                    <Option key={3} value={45000}>45 Seconds</Option>
                                    <Option key={4} value={60000}>60 Seconds</Option>
                                </Select>
                            </ColumnContainer>
                            <Button onClick={() => cyclePowerOnOff()}>Start Pumps</Button>
                            <ColumnContainer margin={'20px 0'}>
                                <GRServerLogsTable 
                                    logs={logs}
                                    deleteLog={deleteLog}
                                    sortKey={sortKey}
                                    setSortKey={setSortKey}
                                    sortDirection={sortDirection}
                                    setSortDirection={setSortDirection}
                                    reloadTable={setLoadData}
                                />
                            </ColumnContainer>
                        </>
                    }
                </ColumnContainer>
            }
        </MainContainer>
    )
}

export default GrowRoomPage;