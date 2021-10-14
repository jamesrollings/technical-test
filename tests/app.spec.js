import React from 'react';
import App from '../client/app.jsx';
import { shallow } from "enzyme";
import '../setupTests';

describe('App.jsx', () => {
    const app = shallow(<App />)

    it('renders correctly', () => {
        app;
    })

    it('displays loading icon', () => {
        const loading = app.find('.loader');
        expect(loading.length).toBe(1);
    })
});