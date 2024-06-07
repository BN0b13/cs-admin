import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Select from 'react-select';
import { 
  FaAngleLeft,
  FaAngleRight
} from "react-icons/fa";

import LineChart from '../../reusable/chart/chart.component';
import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client.js';
import Tools from '../../../tools/tools.js';

import {
  ContentContainer,
  MainContainer,
  RowContainer,
  Subtitle,
  Title
} from '../../../styles/component.styles.jsx';

const client = new Client();
const tools = new Tools();

const CustomerMetrics = () => {
  const [ loading, setLoading ] = useState(true);
  const [ title, setTitle ] = useState('New Customers');
  const [ data, setData ] = useState(null);
  const [ totalCount, setTotalCount ] = useState(null);
  const [ currentCount, setCurrentCount ] = useState(null);
  const [ currentDateRange, setCurrentDateRange ] = useState({});
  const [ dateRangeType, setDateRangeType ] = useState({value: 'all', label: 'All'});
  const [ dateRangePosition, setDateRangePosition ] = useState(0);

  const options = [
    { value: 'all', label: 'All' },
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' }
  ];

  useEffect(() => {
    changeDateRange();
  }, [ dateRangeType, dateRangePosition ]);

  const getAllData = async () => {
    setLoading(true);
    const res = await client.getCustomers();
    const sortedData = tools.sortByDateAscending(res.rows);
    setData(sortedData);
    setTotalCount(res.count);
    setCurrentCount(res.count);
    setLoading(false);
  }

  const changeDateRange = async () => {
    if(dateRangeType.value === 'all') {
      await getAllData();
      return
    }
    
    setLoading(true);

    const today = new Date();
    let modifiedDate = new Date(today.setDate(today.getDate() - dateRangePosition));
    if(dateRangeType.value === 'week') {
      modifiedDate = new Date(today.setDate(today.getDate() - (dateRangePosition * 7)));
    }
    if(dateRangeType.value === 'month') {
      let month = today.getMonth() - dateRangePosition;
      let year = today.getFullYear();
      modifiedDate = new Date(year, month, 1);
    }
    if(dateRangeType.value === 'year') {
      let month = today.getMonth();
      let year = today.getFullYear() - dateRangePosition;
      modifiedDate = new Date(year, month, 1);
    }
    const start = dayjs(modifiedDate).startOf(dateRangeType.value).unix();
    const end = dayjs(modifiedDate).endOf(dateRangeType.value).unix();

    setCurrentDateRange({
      start: dayjs(dayjs.unix(start)).$d.toString(),
      end: dayjs(dayjs.unix(end)).$d.toString()
    });
    const data = {
      start,
      end
    };

    const res = await client.getCustomersByDateRange(data);
    setCurrentCount(res.count);
    const sortedData = tools.sortByDateAscending(res.rows);
    setData(sortedData);
    setLoading(false);
  }

  const goBack = async () => {
    if(dateRangeType.value === 'all') {
      return
    }

    const newDateRangePosition = dateRangePosition + 1;

    setDateRangePosition(newDateRangePosition);
  }

  const goForward = async () => {
    if(dateRangePosition === 0 || dateRangeType.value === 'all') {
      return
    }

    const newDateRangePosition = dateRangePosition - 1;

    setDateRangePosition(newDateRangePosition);
  }

  const changeDateRangeType = async (newDateRangeType) => {
    setDateRangePosition(0);
    setDateRangeType(newDateRangeType);
  }

    return (
      <MainContainer>
        {loading ?
          <Spinner />
        :
          <ContentContainer>
            <Title>{ title }</Title>
            <RowContainer>
              <FaAngleLeft onClick={() => goBack()} />
              <Select
                defaultValue={dateRangeType}
                onChange={changeDateRangeType}
                options={options}
              />
              <FaAngleRight onClick={() => goForward()} />
            </RowContainer>
            <Subtitle>
              Total Count: { totalCount }
            </Subtitle>
            {dateRangeType.value !== 'all' &&
              <>
                <Subtitle>
                  Current Count: { currentCount }
                </Subtitle>
                <Subtitle>
                  {dateRangeType.value === 'day' && dayjs(currentDateRange.start).format('dddd MM/DD/YYYY')}
                  {dateRangeType.value === 'week' && `${dayjs(currentDateRange.start).format('dddd MM/DD/YYYY')} - ${dayjs(currentDateRange.end).format('dddd MM/DD/YYYY')}`}
                  {dateRangeType.value === 'month' && dayjs(currentDateRange.start).format('MMMM YYYY')}
                  {dateRangeType.value === 'year' && dayjs(currentDateRange.start).format('YYYY')}
                </Subtitle>
              </>
            }
            <RowContainer>
              <LineChart title={title} data={data} />
            </RowContainer>
          </ContentContainer>
        }
      </MainContainer>
    );
}

export default CustomerMetrics;