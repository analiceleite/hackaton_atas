import { createGlobalStyle } from 'styled-components'

export const colors = {
  white: '#eeeeee',
  black: '#111',
  backgroundBlue: '#e9f7ff',
  lightBlue: '#05A6CB',
  darkBlue: '#0485A2',
  lightGray: '#E0E2E5',
  darkGrey: '#3C3747',
  greyTitle: 'rgba(60, 55, 71, 0.8)',
  greyLabel: 'rgba(60, 55, 71, 0.5)'
} 

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;

      input[type="password"]::-ms-reveal {
      display: none;
      }
    }
`