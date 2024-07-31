import {
    MdKeyboardArrowLeft,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";

import {
    PaginationContainer,
    PaginationDots,
    PaginationNumberContainer,
    PaginationText
} from '../../../styles/component.styles';

const Pagination = ({count = 0, size, page = 0, changePage = () => {}}) => {
    let index = Math.ceil(count / size);
    const paginationArray = [];
    if(index > 10) {
        const dots = (key) => (
            <PaginationNumberContainer key={key} cursor={''}>
                <PaginationDots> ... </PaginationDots>
            </PaginationNumberContainer>
        );

        // Logic for first 5 pages
        if(page < 5) {
            if(page >= 2) {
                paginationArray.push((
                    <PaginationNumberContainer key={'arrowDoubleLeft'}>
                        <MdKeyboardDoubleArrowLeft onClick={() => changePage(0)} />
                    </PaginationNumberContainer>
                ));
            } else {
                paginationArray.push((
                    <PaginationNumberContainer key={'arrowDoubleLeft'}></PaginationNumberContainer>
                ));
            }

            if(page >= 1) {
                paginationArray.push((
                    <PaginationNumberContainer key={'arrowLeft'}>
                        <MdKeyboardArrowLeft onClick={() => changePage(page - 1)} />
                    </PaginationNumberContainer>
                ));
            } else {
                paginationArray.push((
                    <PaginationNumberContainer key={'arrowLeft'}></PaginationNumberContainer>
                ));
            }

            for(let i = 0; i < 9; i++) {
                const number = 
                    (<PaginationNumberContainer key={i} border={page === i ? '1px black solid' : ''}>
                        <PaginationText onClick={() => changePage(i)}>
                            {i + 1}
                        </PaginationText>
                    </PaginationNumberContainer>);

                paginationArray.push(number);
            }
    
            paginationArray.push(dots('last'));

            paginationArray.push((
                <PaginationNumberContainer key={'arrowRight'}>
                    <MdKeyboardArrowRight onClick={() => changePage(page + 1)} />
                </PaginationNumberContainer>
            ));
            paginationArray.push((
                <PaginationNumberContainer key={'arrowDoubleRight'}>
                    <MdKeyboardDoubleArrowRight onClick={() => changePage(index - 1)} />
                </PaginationNumberContainer>
            ));
        }

        // Logic for middle pages
        if(page >= 5 && page <= (index - 5)) {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowDoubleLeft'}>
                    <MdKeyboardDoubleArrowLeft onClick={() => changePage(0)} />
                </PaginationNumberContainer>
            ));

            paginationArray.push((
                <PaginationNumberContainer key={'arrowLeft'}>
                    <MdKeyboardArrowLeft onClick={() => changePage(page - 1)} />
                </PaginationNumberContainer>
            ));
    
            paginationArray.push(dots('first'));

            for(let i = (page - 3); i < (page + 4); i++) {
                const number = 
                    (<PaginationNumberContainer key={i} border={page === i ? '1px black solid' : ''}>
                        <PaginationText onClick={() => changePage(i)}>
                            {i + 1}
                        </PaginationText>
                    </PaginationNumberContainer>);
                
                paginationArray.push(number);
            }

            paginationArray.push(dots('last'));

            paginationArray.push((
                <PaginationNumberContainer key={'arrowRight'}>
                    <MdKeyboardArrowRight onClick={() => changePage(page + 1)} />
                </PaginationNumberContainer>
            ));

            paginationArray.push((
                <PaginationNumberContainer key={'arrowDoubleRight'}>
                    <MdKeyboardDoubleArrowRight onClick={() => changePage(index - 1)} />
                </PaginationNumberContainer>            
            ));
        }

        // Logic for last 5 pages
        if(page > (index - 5)) {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowDoubleLeft'}>
                    <MdKeyboardDoubleArrowLeft onClick={() => changePage(0)} />
                </PaginationNumberContainer>
            ));

            paginationArray.push((
                <PaginationNumberContainer key={'arrowLeft'}>
                    <MdKeyboardArrowLeft onClick={() => changePage(page - 1)} />
                </PaginationNumberContainer>
            ));
    
            paginationArray.push(dots('first'));
    
            for(let i = (index - 9); i < index; i++) {
                const number = 
                    (<PaginationNumberContainer key={i} border={page === i ? '1px black solid' : ''}>
                        <PaginationText onClick={() => changePage(i)}>
                            {i + 1}
                        </PaginationText>
                    </PaginationNumberContainer>);

                paginationArray.push(number);
            }

            if(page < (index - 1)) {
                paginationArray.push((
                    <PaginationNumberContainer key={'arrowRight'}>
                        <MdKeyboardArrowRight onClick={() => changePage(page + 1)} />
                    </PaginationNumberContainer>
                ));
            } else {
                paginationArray.push((
                    <PaginationNumberContainer key={'arrowRight'}></PaginationNumberContainer>
                ));
            }

            if(page < (index - 2)) {
                paginationArray.push((
                    <PaginationNumberContainer key={'arrowDoubleRight'}>
                        <MdKeyboardDoubleArrowRight onClick={() => changePage(index - 1)} />
                        </PaginationNumberContainer>
                ));
            } else {
                paginationArray.push((
                    <PaginationNumberContainer key={'arrowDoubleRight'}></PaginationNumberContainer>
                ));
            }
        }
    } else {
        if(page >= 2) {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowDoubleLeft'}>
                    <MdKeyboardDoubleArrowLeft onClick={() => changePage(0)} />
                </PaginationNumberContainer>
            ));
        } else {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowDoubleLeft'}></PaginationNumberContainer>
            ));
        }

        if(page >= 1) {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowLeft'}>
                    <MdKeyboardArrowLeft onClick={() => changePage(page - 1)} />
                </PaginationNumberContainer>
            ));
        } else {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowLeft'}></PaginationNumberContainer>
            ));
        }

        for(let i = 0; i < index; i++) {
            const number = 
                (<PaginationNumberContainer key={i} border={page === i ? '1px black solid' : ''}>
                    <PaginationText onClick={() => changePage(i)}>
                        {i + 1}
                    </PaginationText>
                </PaginationNumberContainer>);
            
            paginationArray.push(number);
        }

        if(page < (index - 1)) {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowRight'}>
                    <MdKeyboardArrowRight onClick={() => changePage(page + 1)} />
                </PaginationNumberContainer>
            ));
        } else {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowRight'}></PaginationNumberContainer>
            ));
        }

        if(page < (index - 2)) {
            paginationArray.push((
                <PaginationNumberContainer key={'arrowDoubleRight'}>
                    <MdKeyboardDoubleArrowRight onClick={() => changePage(index - 1)} />
                    </PaginationNumberContainer>
            ));
        } else {
            paginationArray.push((
                <PaginationNumberContainer  key={'arrowDoubleRight'}></PaginationNumberContainer>
            ));
        }
    }

    return (<PaginationContainer>{paginationArray}</PaginationContainer>);
}

export default Pagination;