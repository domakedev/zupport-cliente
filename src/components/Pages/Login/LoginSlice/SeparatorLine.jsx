import React from 'react';
import styled from "styled-components";

/*Estilos de separador linea*/
 const LineLeftLogin  = styled.div`
 grid-area: lineleft;
 background: #79777052;
 height: 1px;
 align-self : center;
`;

const LineRightLogin = styled(LineLeftLogin)`
 grid-area: lineright;
`;

const ContainerLineLogin = styled.section`
 display: grid;
 grid-template-areas: "lineleft . lineright";
 font-family: var(--secondary-font);
 font-size: var(--secondarey-font-size);
 color: var(--dark-color);
 text-align: center;
`;

const SeparatorLine = () =>{
  return(
  <ContainerLineLogin>
    <LineLeftLogin/>
    O
    <LineRightLogin/>
</ContainerLineLogin>
)
};

export default SeparatorLine;
