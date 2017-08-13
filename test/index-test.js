import React from 'react';
import expect from 'expect';
import {shallow, mount, render} from 'enzyme';
import Timer from '../src';

console.log('test is commig soon')

describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(shallow(<Timer />).contains(<div className="foo"/>)).toEqual(true);
    });

    it("contains spec with an expectation", function () {
        expect(shallow(<Timer />).is('.foo')).toEqual(true);
    });

    it("contains spec with an expectation", function () {
        expect(mount(<Timer />).find('.foo').length).toEqual(1);
    });
});
