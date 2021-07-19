import React from 'react';
import styled from "styled-components";
import { Container, Row, Col, FormLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useTranslation} from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <StyledFoot className="bottom section-padding">
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <StyledText className="copyright">
                <StyledFooterP>© <StyledSpan>2021</StyledSpan> <StyledFooterA href="#" >Expertime</StyledFooterA> {t('footer')}</StyledFooterP>
              </StyledText>
            </Col>
          </Row>
        </Container>
      </StyledFoot>
    </>
  );
};

export default Footer;
const StyledFoot = styled.div`
  padding: 60px 0;
  background-color: #0b516a;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 375px) {
    display: none;
  }
`;
const StyledText = styled.div`
color: #fff;
font-weight: 600;
    `;
const StyledFooterP = styled.p`
margin-bottom: 0;
    line-height: 50px;
    font-size: 16px;
    font-weight: 400;
    `;
const StyledSpan = styled.span`
color: #d1caca;
    `;
const StyledFooterA = styled.a`
    color: #2987f8;
    margin-left: 3px;
    padding-right: 3px;
    text-decoration:none;
    &:hover{
    text-decoration:none;
    color: #6c6d83;
    }
    `;
