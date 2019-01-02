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

    this.state = { incomingMessage: '', input: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleClick(event) {
    axios.post('http://localhost:3000/messages', {
      params: {
        input: this.state.input
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log(this.state.input)
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
          <input type="text" />
          <Button onClick={this.handleClick}>Send</Button>
        </UserInputWrapper>
      </Wrapper>
    );
  }
}
