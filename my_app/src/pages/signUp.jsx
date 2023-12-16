import React from 'react'
import styled from 'styled-components'
import backgroundImg from '../components/backgroundImg'
import header from '../components/header'

export default function signUp() {
  return <Container>
    <backgroundImg />
    <header />
    <div className="Body flex column a-center j-center">
        <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>Ready to watch? Enter your email to create or restart membership</h6>
        </div>
        <div className="form">
            <input type="email" placeholder='Email Adddress' name='email' />
            <input type="password" placeholder='Password' name='password' />
        </div>
    </div>
    </Container>  
}
