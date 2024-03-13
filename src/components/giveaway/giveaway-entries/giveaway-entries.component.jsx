import Button from "../../reusable/button/button.component";
import GiveawayEntriesTable from "../../reusable/tables/giveaway-entries-table/giveaway-entries-table.component";

import {
    ButtonContainer,
    MainContainer,
    Title
} from '../../../styles/component.styles';


const GiveawayEntries = ({ giveaway, getGiveaway, setShowEntries }) => {

    const changeDisplay = async () => {
        setShowEntries(false);
        await getGiveaway();
    }

    return (
        <MainContainer>
            <Title>Giveaway {giveaway.name}</Title>
            <ButtonContainer>
                <Button onClick={() => changeDisplay()}>Show Giveaway</Button>
            </ButtonContainer>
            <GiveawayEntriesTable giveaway={giveaway} entries={giveaway.entries} />
        </MainContainer>
    )
}

export default GiveawayEntries;