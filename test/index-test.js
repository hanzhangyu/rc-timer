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
        expect(component.instance().props.running).toEqual(true);
        expect(component.instance().props.pause).toEqual(false);
        expect(component.instance().props.async).toEqual(true);
        expect(component.instance().props.immediate).toEqual(true);
        expect(component.instance().props.step).toEqual(1000);
        expect(component.instance().props.renderChild).toEqual(renderChild);
    });
//
//     // it('test the Timer`s pause & recover action run success', function () {
//     //     let i = 0;
//     //     const handleTrigger = () => {
//     //         i++;
//     //         console.log('i ->', i);
//     //     };
//     //     const component = mount(
//     //         <Timer
//     //             onTrigger={handleTrigger}
//     //         />
//     //     );
//     //     setTimeout(() => {
//     //         expect(component.instance().state.leftTime).toEqual(8000);
//     //         component.getNode().pause();
//     //         setTimeout(() => {
//     //             expect(component.instance().state.leftTime).toEqual(8000);
//     //             component.getNode().recover();
//     //             setTimeout(() => {
//     //                 expect(component.instance().state.leftTime).toEqual(6000);
//     //             }, 2000);
//     //         }, 2000);
//     //     }, 2000);
//     // });
//
//     // it('test the Timer`s stop & reStart & reStartImmediate action run success', function () {
//     //     let i = 0;
//     //     const handleTrigger = () => {
//     //         i++;
//     //         console.log('i ->', i);
//     //     };
//     //     const component = mount(
//     //         <Timer
//     //             onTrigger={handleTrigger}
//     //         />
//     //     );
//     //     setTimeout(() => {
//     //         expect(component.instance().state.leftTime).toEqual(8000);
//     //         component.getNode().stop();
//     //         expect(component.instance().state.leftTime).toEqual(10000);
//     //         setTimeout(() => {
//     //             expect(component.instance().state.leftTime).toEqual(8000);
//     //             i = 0;
//     //             component.getNode().reStart();
//     //             expect(i).toEqual(0);
//     //             expect(component.instance().state.leftTime).toEqual(10000);
//     //             setTimeout(() => {
//     //                 i = 0;
//     //                 component.getNode().reStartImmediate();
//     //                 expect(i).toEqual(1);
//     //                 expect(component.instance().state.leftTime).toEqual(10000);
//     //             }, 2000);
//     //         }, 2000);
//     //     }, 2000);
//     // });
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

    // setTimeout(() => {
    //     describe('2、Test the code`s run', function () {
    //         it('test the code is running properly after 1 second ', function () {
    //             expect(component.instance().state.leftTime).toEqual(3000);
    //             expect(component.find('div').html()).toEqual('<div class="child">3000</div>');
    //         });
    //     });
    // }, 1000);

    setTimeout(() => {
        describe('2、Test the code`s run', function () {
            it('test the code is running properly after 5 second ', function () {
                expect(component.instance().state.leftTime).toEqual(3000);
                expect(component.find('div').html()).toEqual('<div class="child">3000</div>');
                component.getNode().pause();
            });
        });
        run();
    }, 5000);

    // setTimeout(() => {
    //     describe('3、Test the code`s pause', function () {
    //         it('test the code is running properly after 6 second ', function () {
    //             expect(component.instance().state.leftTime).toEqual(3000);
    //             component.getNode().recover();
    //             expect(component.find('div').html()).toEqual('<div class="child">3000</div>');
    //         });
    //     });
    //     run();
    // }, 6000);
    //
    // setTimeout(() => {
    //     describe('3、Test the code`s pause', function () {
    //         it('test the code is running properly after 7 second ', function () {
    //             expect(component.instance().state.leftTime).toEqual(2000);
    //         });
    //     });
    //     run();
    // }, 7000);
}());
