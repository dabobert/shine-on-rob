import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
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