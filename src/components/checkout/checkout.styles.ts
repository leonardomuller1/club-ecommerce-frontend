import styled from 'styled-components'
import Colors from '../../theme/theme.colors'

export const CheckoutContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  overflow: hidden;

  p {
    color: ${Colors.text.dark};
  }

  button {
    width: 650px;
  }
`

export const CheckoutTitle = styled.p`
  font-weight: bold;
  font-size: 1.325rem;
`

export const CheckoutProducts = styled.div`
  min-width: 650px;
  overflow-y: scroll;
  margin-top: 15px;
  margin-bottom: 15px;

  /* WebKit */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${Colors.input.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${Colors.text.dark};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${Colors.text.white};
  }
`

export const CheckoutTotal = styled.p`
  width: 650px;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 15px;
`
