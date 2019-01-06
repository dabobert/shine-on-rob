import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai';
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
  // window.alert = jest.fn();
  const app = shallow(
    <App />
  );
  console.log(app.state())
  // app.simulate('click');
  expect(app.state().aasm_state).to.eql('greetings');
});