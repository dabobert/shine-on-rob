import React, { Component } from 'react';
import styled from 'styled-components';
import TextArea from './TextArea';
import Title from './Title';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
// import pry from 'pryjs'

const Wrapper = styled.section`
  margin: 40px 0;
  padding: 3em;
  width: 400px;
  font-family: 'Pangram';

  @media (max-width: 850px) {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 1em;
    border-radius: 0;
  }
`;

const UserInputWrapper = styled.div`
  box-sizing: border-box;
  width: 400px;
  @media (max-width: 850px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { incomingMessage: '', input: '', aasm_state: 'greetings', name: '', goal: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.requestData()
  }

  requestData() {
    axios.post('/messages', {
      params: {
        input: this.state.input,
        aasm_state: this.state.aasm_state,
        goal: this.state.goal,
        name: this.state.name
      }
    })
    .then((response) => {
      console.log(response.data)
      this.setState({
        incomingMessage: response.data.message,
        aasm_state: response.data.nextState,
        goal: response.data.goal,
        name: response.data.name,
      })
    })
    .catch((error) => {
      console.log(error);
    });

  }

  onFieldChange(fieldName) {
    return function (event) {
      this.setState({[fieldName]: event.target.value});
    }
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleClick(event) {
    this.requestData()
  }

  render() {
    return (
      <Wrapper>
        <Title>Shine Bot</Title>
        <TextArea>{this.state.incomingMessage}</TextArea>
        <UserInputWrapper>
          <Input
            onChange={this.handleInputChange}
            value={this.state.input}
            type="text"
            placeholder="User Response"
          />
          
          <Input
            onChange={this.onFieldChange('aasm_state').bind(this)}
            name="aasm_state"
            value={this.state.aasm_state}
            type="hidden"
            placeholder="state goes here"
          />

          <Input
            onChange={this.onFieldChange('name').bind(this)}
            name="name"
            value={this.state.name}
            type="hidden"
            placeholder="name goes here"
          />

          <Input
            onChange={this.onFieldChange('goal').bind(this)}
            name="goal"
            value={this.state.goal}
            type="hidden"
            placeholder="goal goes here"
          />

          <Button onClick={this.handleClick}>Send</Button>
        </UserInputWrapper>
      </Wrapper>
    );
  }
}
