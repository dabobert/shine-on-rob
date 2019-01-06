import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
// import { expect } from 'chai';
import { mount } from 'enzyme';
import App, { Wrapper } from '../App';
import pry from 'pryjs'

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('should start in greetings state', () => {
  const app = shallow(<App />);
  expect(app.state().aasm_state).toMatch('greetings');
});


it('should understand handleClick event', () => {
  const spy = jest.spyOn(App.prototype, 'handleClick');
  const app = mount(<App />);
  app.find('button').simulate('click');
  expect(spy).toHaveBeenCalled();
});




it('should requestData and setStates', () => {
  // // other way to init fn
  // const spy = jest.spyOn(wrapper.instance(), 'handleClick'); // replace function via reference
  // ???const app = shallow(<App />);
  // wrapper.update(); // forceUpdate()
  // wrapper.find('button').simulate('click'); // actually calls the spy function

  const spy = jest.spyOn(App.prototype, 'handleClick');
  const app = mount(<App />);








  // console.log(Object.getOwnPropertyNames(app));
  // console.log(Object.getOwnPropertyNames(app.instance()));
  // console.log("--------")
  // console.log(app.state());
  // app.instance().handleClick();
  // console.log(app.state());
  // // app.simulate('click');


  // const app = shallow(<App />);
  app.find('button').simulate('click', 'using prototype');
  expect(spy).toHaveBeenCalled();






});