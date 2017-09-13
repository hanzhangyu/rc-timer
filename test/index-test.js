import React from 'react';
import expect from 'expect';
import {shallow, mount, render} from 'enzyme';
import Timer from '../src';

describe('1、Test the Timer init', function () {
    it('test the Timer`s node,state and props in the initial time', function () {
        let i = 0;
        const handleTrigger = () => {
            i++;
            console.log('i', i);
        };
        const renderChild = val => (
            <div className="child">{val}</div>
        );
        const component = shallow(
            <Timer
                onTrigger={handleTrigger}
                renderChild={renderChild}
            />
        );

        // self & child
        expect(component.exists()).toBe(true);
        expect(component.find('div').length).toBe(1);
        expect(component.hasClass('child')).toBe(true);
        // state
        expect(component.instance().state.leftTime).toEqual(10000);
        // props
        expect(component.instance().props.timeout).toEqual(10000);
        expect(component.instance().props.enabled).toEqual(true);
        expect(component.instance().props.pause).toEqual(false);
        expect(component.instance().props.sync).toEqual(true);
        expect(component.instance().props.immediate).toEqual(true);
        expect(component.instance().props.step).toEqual(1000);
        expect(component.instance().props.renderChild).toEqual(renderChild);
    });
});

(function () {
    let i = 0;
    const handleTrigger = () => {
        i++;
        console.log('i ->', i);
    };
    const renderChild = val => (
        <div className="child">{val}</div>
    );
    const component = mount(
        <Timer
            timeout={4000}
            onTrigger={handleTrigger}
            renderChild={renderChild}
        />
    );

    setTimeout(() => {
        describe('2、Test the code`s run', function () {
            it('test the code is running properly after 5 second ', function () {
                expect(component.instance().state.leftTime).toEqual(2000);
                expect(component.find('div').html()).toEqual('<div class="child">2000</div>');
                component.getNode().pause();
            });
        });
        run();
    }, 5000);
}());
