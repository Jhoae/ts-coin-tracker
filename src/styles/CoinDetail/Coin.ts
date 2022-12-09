import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.buttonColor};

  padding: 10px 20px;
  border-radius: 10px;
`;
export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
export const Description = styled.p`
  margin: 20px 0px;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

export const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.buttonColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

export const GoHomeBtn = styled.button`
  position: absolute;
  left: 20px;
  ${(props) => {
    const buttonBackgroundColor = props.theme.buttonColor;
    const buttonTextColor = props.theme.textColor;
    return css`
      background-color: ${buttonBackgroundColor};
      color: ${buttonTextColor};
      border: 1px solid ${buttonBackgroundColor};
      border-radius: 5px;
      justify-self: right;
      &:hover {
        cursor: pointer;
        background-color: ${darken(0.1, buttonBackgroundColor)};
      }
    `;
  }};
`;
