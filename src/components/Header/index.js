import React from 'react';
import logo from "../../assets/logo-baseline.png";
import logoEn from "../../assets/flag-en.png";
import logoFr from "../../assets/flag-fr.png";
import styled from "styled-components";
import i18next from 'i18next';
import {useTranslation} from "react-i18next";

const Header = () => {
  function handleClick(lang) {
    i18next.changeLanguage(lang)
  }
  const { t } = useTranslation();
  return (
    <>
      <StyledDiv>
        <Nav className="navbar navbar-expand-md custom-navbar navbar-dark">
            <StyledLogo src={logo} alt="Logo"/>
          <StyledTranslation className="col-12">
            <ul className="navbar-nav mr-auto ">
              <StyledDivFlag onClick={() => handleClick('en')} >
                <StyledLogoFlag src={logoEn} alt="Logo"/>
              </StyledDivFlag>
              <StyledDivFlag onClick={() => handleClick('fr')} >
                <StyledLogoFlag src={logoFr} alt="Logo"/>
              </StyledDivFlag>
            </ul>
          </StyledTranslation>
        </Nav>
      </StyledDiv>
    </>
  );
};
export default Header;

const StyledDiv = styled.div`
`;
const StyledLogo = styled.img`
  width:10%;
  position: relative;
  left: 5%;
  transform: translate(0%, 5%);
`;
const StyledDivFlag = styled.div`
  cursor: pointer;
  margin: -20px!important;
`;
const StyledLogoFlag = styled.img`
  width: 50%
`;
const StyledTranslation = styled.div`
  width:auto;
  position: relative;
  right: 5%;
  margin-left: auto;
`;
const Nav = styled.nav`
 box-shadow: 5px 5px 5px #eee; 
 z-index:1;
 background-color: #0b516a;
`;
