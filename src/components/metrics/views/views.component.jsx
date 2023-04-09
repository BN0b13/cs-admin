import React, { useEffect, useState } from 'react';

import Spinner from '../../spinner/spinner.component';

import Client from '../../../tools/client';

import {
    ViewsContainer,
    ViewsTable,
    ViewsTableBody,
    ViewsTableData,
    ViewsTableHead,
    ViewsTableHeadData,
    ViewsTableRow,
    ViewsTitle
} from './views.styles';

const client = new Client();

const Views = () => {
  const [ views, setViews ] = useState(null);

  useEffect(() => {
    const fetchViews = async () => {
      const res = await client.getViews();
      setViews(res.rows);
    }
    fetchViews();
  }, []);

    return (
      <ViewsContainer>
        <ViewsTitle>Views</ViewsTitle>

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
            {!views ? 
              <Spinner />
            :
            views.map((day, index) => {
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