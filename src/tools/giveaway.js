

export default class GiveawayHelper {

    validateGiveaway = (data) => {
        if(data.name === '' ||
            data.description === '' ||
            data.prizes.length < 1) {
            return {
                result: false,
                error: 'Please fill out all fields to create giveaway.'
            };
        }

        if(!data.type) {
            return {
                result: false,
                error: 'Please select a way to conclude giveaway.'
            };
        }

        if(data.type === 'scheduled' && (data.startDate === '' || data.expirationDate === '')){
            return {
                result: false,
                error: 'Please finish selecting start or end date to create giveaway.'
            };
        }

        if(data.type === 'scheduled' && (new Date(data.startDate).getTime() + 5000)>= new Date(data.expirationDate).getTime()){
            return {
                result: false,
                error: 'Giveaway start date cannot be after or at the same time as end date.',
                reset: {
                    expirationDate: true
                }
            };
        }

        if(data.type === 'scheduled' && (new Date(data.startDate).getTime() < new Date().getTime() || new Date(data.expirationDate).getTime() < new Date().getTime())){
            return {
                result: false,
                error: 'Giveaway start date has already passed. Please select a different start date and time.',
                reset: {
                    startDate: true,
                    expirationDate: true
                }
            };
        }

        if(data.type === 'entryLimit' && !data.entryLimit) {
            return {
                result: false,
                error: 'Please select entry limit to giveaway.'
            };
        }

        let minEntryLimit = 0;
        data.prizes.map(prize => minEntryLimit = minEntryLimit + prize.prizeWinnerLimit);

        if(data.type === 'entryLimit' && data.entryLimit < minEntryLimit) {
            return {
                result: false,
                error: `Entry Limit is less than total prizes. Minimum of ${minEntryLimit} entries needed.`
            };
        }

        if(data.type === 'entryType' && data.entryLimit === '') {
            return {
                result: false,
                error: 'Please select how users can enter giveaway.'
            };
        }

        return {
            result: true
        };
    }
}