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
  RowContainer
} from '../../../styles/component.styles.jsx';

import {
  ChartContainer,
  ViewsSubTitle,
  ViewsTitle
} from './views.styles';

const client = new Client();
const tools = new Tools();

const Views = () => {
  const [ loading, setLoading ] = useState(true);
  const [ views, setViews ] = useState(null);
  const [ totalViews, setTotalViews ] = useState(null);
  const [ currentViews, setCurrentViews ] = useState(null);
  const [ currentDateRange, setCurrentDateRange ] = useState({});
  const [ viewType, setViewType ] = useState({value: 'all', label: 'All'});
  const [ viewPlace, setViewPlace ] = useState(0);

  const options = [
    { value: 'all', label: 'All' },
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' }
  ];

  useEffect(() => {
    configureView();
  }, [ viewPlace, viewType ]);

  const getAllViews = async () => {
    setLoading(true);
    const res = await client.getViews();
    const sortedViews = tools.sortByDateAscending(res.rows);
    setViews(sortedViews);
    let totalCount = 0;
    res.rows.map(row => totalCount = totalCount + row.count);
    setTotalViews(totalCount);
    setCurrentViews(totalCount);
    setLoading(false);
  }

  const configureView = async () => {
    if(viewType.value === 'all') {
      await getAllViews();
      return
    }
    
    setLoading(true);

    const today = new Date();
    let modifiedDate = new Date(today.setDate(today.getDate() - viewPlace));
    if(viewType.value === 'week') {
      modifiedDate = new Date(today.setDate(today.getDate() - (viewPlace * 7)));
    }
    if(viewType.value === 'month') {
      let month = today.getMonth() - viewPlace;
      let year = today.getFullYear();
      modifiedDate = new Date(year, month, 1);
    }
    if(viewType.value === 'year') {
      let month = today.getMonth();
      let year = today.getFullYear() - viewPlace;
      modifiedDate = new Date(year, month, 1);
    }
    const start = dayjs(modifiedDate).startOf(viewType.value).unix();
    const end = dayjs(modifiedDate).endOf(viewType.value).unix();

    setCurrentDateRange({
      start: dayjs(dayjs.unix(start)).$d.toString(),
      end: dayjs(dayjs.unix(end)).$d.toString()
    });
    const data = {
      start,
      end
    };

    const res = await client.getViewsByDateRange(data);
    let totalCount = 0;
    res.rows.map(row => totalCount = totalCount + row.count);
    setCurrentViews(totalCount);
    const sortedViews = tools.sortByDateAscending(res.rows);
    setViews(sortedViews);
    setLoading(false);
  }

  const goBack = async () => {
    if(viewType.value === 'all') {
      return
    }

    const newViewPlace = viewPlace + 1;

    setViewPlace(newViewPlace);
  }

  const goForward = async () => {
    if(viewPlace === 0 || viewType.value === 'all') {
      return
    }

    const newViewPlace = viewPlace - 1;

    setViewPlace(newViewPlace);
  }

  const changeViewType = async (newViewType) => {
    setViewPlace(0);
    setViewType(newViewType);
  }

    return (
      <MainContainer>
        {loading ?
          <Spinner />
        :
          <ContentContainer>
            <ViewsTitle>Views</ViewsTitle>
            <RowContainer>
              <FaAngleLeft onClick={() => goBack()} />
              <Select
                defaultValue={viewType}
                onChange={changeViewType}
                options={options}
              />
              <FaAngleRight onClick={() => goForward()} />
            </RowContainer>
            <ViewsSubTitle>
              Total site views: { totalViews }
            </ViewsSubTitle>
            {viewType.value !== 'all' &&
              <>
                <ViewsSubTitle>
                  Current Range Views: { currentViews }
                </ViewsSubTitle>
                <ViewsSubTitle>
                  {viewType.value === 'day' && dayjs(currentDateRange.start).format('dddd MM/DD/YYYY')}
                  {viewType.value === 'month' && dayjs(currentDateRange.start).format('MMMM YYYY')}
                  {viewType.value === 'year' && dayjs(currentDateRange.start).format('YYYY')}
                </ViewsSubTitle>
              </>
            }
            <ChartContainer>
              <LineChart views={views} />
            </ChartContainer>
          </ContentContainer>
        }
      </MainContainer>
    );
}

export default Views;