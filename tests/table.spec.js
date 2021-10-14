import React from 'react';
import Table from '../client/components/Table.jsx';
import { shallow } from 'enzyme';
import '../setupTests';

describe('Table component test', () => {
    const getProps = (filter = false) => ({
        rows: [
            {
                _id: '571e369aae06d8703c801468',
                Reference: 'CS124992',
                GivenName: 'Geraldine Mary',
                FamilyName: 'Ratcliffe',
                DateOfBirth: '1964-07-28T00:00:00.000+0000'
            },
            {
                _id: '471e369aae06d8703c801468',
                Reference: 'AS124992',
                GivenName: 'ZZZZZZ',
                FamilyName: 'Ratcliffe',
                DateOfBirth: '1964-07-28T00:00:00.000+0000'
            },
        ],
        searchValue: filter ? 'ZZZZZZ' : '',
    })

    it('Should render', () => {
        shallow(<Table data={getProps()} />)
    })

    it('Should filter', () => {
        const table = shallow(<Table data={getProps(true)} />)
        expect(table.find('tbody').find('tr').length).toEqual(1);
    })
})