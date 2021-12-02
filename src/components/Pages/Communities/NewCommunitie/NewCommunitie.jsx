import React, {useState} from "react";
import styled from "styled-components";
//import PropTypes from 'prop-types';

//Icons
import { FaPlus } from "react-icons/fa";

//Import General Styled
import {SubTitle} from "../../../../css/generalStyled"

const Container = styled.div`
  margin: 30px;
  background-color: var(--light-blue);
  width: 340px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Plus = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--principal-color);
  cursor: pointer;
  margin-bottom: 10px;
`;



const NewCommunitie = () => {

  const [newComu, setNewComu] = useState(false)


  const AddNewComu = () =>{
    console.log(new Date(), newComu);
    setNewComu(true)
  }

  return (
    <Container>
      <Plus onClick={AddNewComu}>
        <FaPlus size="6rem" color="white" />
      </Plus>
      <SubTitle>Crear nueva Comunidad</SubTitle>
    </Container>
  );
};

NewCommunitie.propTypes = {

}

export default NewCommunitie;