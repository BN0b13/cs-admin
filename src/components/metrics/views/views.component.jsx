import React, { useEffect, useState } from 'react';

import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client';

import {
    ViewsContainer,
    ViewsTable,
    ViewsTableBody,
    ViewsTableData,
    ViewsTableHead,
    ViewsTableHeadData,
    ViewsTableRow,
    ViewsSubTitle,
    ViewsTitle
} from './views.styles';

const client = new Client();

const Views = () => {
  const [ views, setViews ] = useState(null);
  const [ totalViews, setTotalViews ] = useState(null);

  useEffect(() => {
    const fetchViews = async () => {
      const res = await client.getViews();
      setViews(res.rows);
      let totalCount = 0;
      res.rows.map(row => {
        return totalCount = totalCount + row.count;
      })
      setTotalViews(totalCount)
    }
    fetchViews();
  }, []);

  if(!views) {
    return (
      <Spinner />
    )
  }

    return (
      <ViewsContainer>
        <ViewsTitle>Views</ViewsTitle>
          <ViewsSubTitle>
            Total site views: { totalViews }
          </ViewsSubTitle>
          <ViewsTable>
            <ViewsTableHead>
              <ViewsTableRow>
                <ViewsTableHeadData>
                  Date
                </ViewsTableHeadData>
                <ViewsTableHeadData>
                  Views
                </ViewsTableHeadData>
              </ViewsTableRow>
            </ViewsTableHead>
            <ViewsTableBody>
              {views.map((day, index) => {
                const formattedDate = new Date(day.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                return (
                  <ViewsTableRow key={index}>
                    <ViewsTableData>
                    { formattedDate }
                    </ViewsTableData>
                    <ViewsTableData>
                      { day.count }
                    </ViewsTableData>
                  </ViewsTableRow>
                )
              })}
            </ViewsTableBody>
          </ViewsTable>
      </ViewsContainer>
    );
}

export default Views;