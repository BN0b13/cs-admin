import { useEffect, useState } from 'react';

import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainContainer
} from '../../styles/component.styles';

const client = new Client();

const GrowRoomPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ cycleTime, setCycleTime ] = useState(10000);

    useEffect(() => {
        getHealth();

    }, []);

    const getHealth = async () => {
        setLoading(true);
        const res = await client.getGRServerHealth();

        console.log('GET Health res: ', res);
        setLoading(false);
    }

    const cyclePumps = async () => {
        const res = await client.activateGRPumps(cycleTime);
        console.log('Cycle pumps res: ', res);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <Button onClick={() => cyclePumps()}>Start Pumps</Button>
                </>
            }
        </MainContainer>
    )
}

export default GrowRoomPage;