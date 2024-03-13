import { useContext, useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import ReactToPrint from 'react-to-print';
import { CSVLink } from "react-csv";

import {
    BsDownload,
    BsPrinter
} from 'react-icons/bs';

import { ToastContext } from '../../../../contexts/toast.context';

import { setMobileView } from '../../../../tools/mobileView';

import { 
    MainContainer,
    PrinterContainer,
    RowContainer,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableDataLink,
    Text
} from '../../../../styles/component.styles';

import '../../../../styles/styles.css';

const GiveawayEntriesTable = ({ giveaway, entries }) => {
    const componentRef = useRef();

    const [ csvData, setCsvData ] = useState([]);

    const { successToast } = useContext(ToastContext);

    useEffect(() => {
        setUpCsvData();
    }, []);
    
    
    const copyEmailToClipboard = (email) => {
        navigator.clipboard.writeText(email);
        successToast(`Copied email ${email} to Clipboard`);
    }

    const setUpCsvData = () => {
        const data = [['', 'Email', 'Username', 'Date Entered']];

        entries.map((entry, index) => {
            data.push([`${index + 1}. `,`${entry.email}`,`${entry.username}`,`${dayjs(new Date(parseInt(entry.enteredAt))).format('MM/DD/YYYY hh:mm a').toString()}`])
        });

        setCsvData(data);
    }

    return (
        <MainContainer>
            {entries.length === 0 ?
                <Text>No Giveaway Entries</Text>
            :
            <>
                <RowContainer marginLeft={'auto'}>
                    <RowContainer margin={'0px 30px'}>
                        <CSVLink 
                            data={csvData}
                            filename={giveaway.name}
                        >
                            <BsDownload size={setMobileView() ? '14' : '28'}/>
                        </CSVLink>
                    </RowContainer>
                    <RowContainer cursor='pointer'>
                        <ReactToPrint
                            trigger={() => <BsPrinter style={{ fontSize: '28px', paddingRight: '30px'}} title='Print Invoice' />}
                            content={() => componentRef.current}
                            
                        />
                    </RowContainer>
                </RowContainer>
                <PrinterContainer className='printerContainer'  ref={componentRef}>
                    <Text>Total Entries: {entries.length}</Text>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Date Entered</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {entries.map((entry, index) => {
                            const formattedDate = dayjs(new Date(parseInt(entry.enteredAt))).format('MM/DD/YYYY hh:mm a').toString();
                            return (
                                <TableRow key={index} onClick={() => copyEmailToClipboard(entry.email)}>
                                    <TableDataLink>{index + 1}. </TableDataLink>
                                    <TableDataLink>{ entry.email }</TableDataLink>
                                    <TableDataLink>{ entry.username }</TableDataLink>
                                    <TableDataLink>{ formattedDate }</TableDataLink>
                                </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                </PrinterContainer>
                </>
            }
        </MainContainer>
    )
}

export default GiveawayEntriesTable;