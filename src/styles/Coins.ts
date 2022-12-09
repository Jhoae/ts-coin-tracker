import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0px 20px;
`;

export const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

export const CoinsList = styled.ul``;

export const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const Title = styled.h1`
  white-space: nowrap;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
`;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
