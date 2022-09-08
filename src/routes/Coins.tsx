import {  useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fectchCoins } from "../api";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Nav = styled.nav`
  padding: 10px;
  height: 30px;
  display:flex; 
  justify-content:flex-end; 
`
const Btn = styled.div`
  height : 10px; 
  width : 50px;
  border-radius : 5px;
  background-color: ${(props) => props.theme.bgColor };;
  &:hover {
    cursor: pointer;
  }
`

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color:${(props) => props.theme.liBgColor };
  border : 1px solid #f5f6fa;
  color: ${(props) => props.theme.textColor };
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items : center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 30px;
  height:30px;
  margin-right : 10px;
`
const Loader = styled.span`
  text-align: center;
  display: block;
`

const Title = styled.h1`
 font-size: 48px;
    color : ${props => props.theme.accentColor}; 
`

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {

  const {isLoading , data } = useQuery<ICoin[]>('api', fectchCoins)
  const setIsDarkAtom = useSetRecoilState(isDarkAtom)
  const themeSet = ()=> setIsDarkAtom((current)=>!current);
  
  return (
    <Container>
      <Nav>
        <Btn onClick={themeSet}><span>-mode</span></Btn>
      </Nav>
      <Header >
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0,100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: {
                  name : coin.name, 
                }
              }
              }>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} ></Img>
                {coin.name} &rarr;  </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins; 
