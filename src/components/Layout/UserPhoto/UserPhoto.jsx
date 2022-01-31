import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AiTwotonePropertySafety, AiFillMinusCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import actions from '../../../store/action';
import defaultPhoto from '../../../images/Icon/user.png';

// --alert-color : #D9534F; FaUserCircle
// oro #FFC107; bronce : #CD7F32; plata: #C0C0C
const crownColor = (points) => {
  if (points > 30000) {
    return '#FFC107';
  }
  if (points > 15000) {
    return '#C0C0C0';
  }
  return '#CD7F32';
};

const Container = styled('div')(
  ({ userPoints, medalSize, route }) => css`
    position: relative;
    cursor: ${route === '/profile' ? '' : 'pointer'};
    border-radius: 50%;
    .icon-crow {
      color: ${crownColor(userPoints)};
      height: ${medalSize || '2rem'};
      width: ${medalSize || '2rem'};
      left: -3px;
      top: -2px;
      bottom: 28px;
      stroke-width: 1rem;
      stroke: var(--dark-color);
      position: absolute;
      z-index: 2;
    }
  `
);
const PhotoContainer = styled('div')(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e2e2e2;
    border-radius: 50%;
    object-fit: cover;
    object-position: center center;
    font-size: 1rem;
    color: var(--secondary-color);
  `
);

const Photo = styled('img')(
  ({ photoSize = '40px', borderSize }) => css`
    min-height: ${photoSize};
    min-width: ${photoSize};
    max-height: ${photoSize};
    max-width: ${photoSize};
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    object-fit: cover;
    object-position: center center;
    border: ${borderSize} solid var(--sucess-color); //el color cambiara a --alert-color si está activo
    ${(props) =>
      props.isOnline === true &&
      css`
        outline: 4px solid var(--sucess-color) !important;
      `}
    ${(props) =>
      props.isOnline === false &&
      css`
        outline: 2px solid var(--boring-color) !important;
      `}
  `
);

const DeleteUser = styled.div`
  color: var(--alert-color);
  height: 2rem;
  width: 2rem;
  stroke-width: 1rem;
  stroke: var(--dark-color);
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 70%;
  background-color: white;
  border-radius: 50%; ;
`;

function UserPhoto({
  userPhoto,
  photoSize,
  userPoints,
  selectUser = () => {},
  user,
  selected = false,
  deleteUserSelected,
  medalSize,
  borderSize = '0px',
  isOnline = false,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (location.pathname === '/communities/help-post') {
      selectUser(user);
    } else if (location.pathname === '/profile') {
      // nothing no borrar
    } else if (location.pathname.includes('posts')) {
      // nothing no borrar
    } else {
      dispatch(actions.setVisitedUser(user.username ? user.username : null));
      navigate('/profile');
    }
  };

  const value = useMemo(() => ({ className: 'icon-crow' }));

  // const onClickPhoto = async () => {
  //   await dispatch(
  //     actions.setVisitedUser(user.username ? user.username : null)
  //   );
  //   console.log('Click en la foto');
  //   // navigate('/profile');
  //   window.open('/profile');
  // };
  return (
    <Container
      userPoints={userPoints}
      medalSize={medalSize}
      onClick={onClickHandler}
      route={location.pathname}
    >
      <IconContext.Provider
        userPoints={userPoints}
        value={value}
        medalSize={medalSize}
      >
        <AiTwotonePropertySafety />
      </IconContext.Provider>

      <PhotoContainer>
        <Link
          to={{
            pathname: `/profile/${user?.username ? user.username : null}`,
          }}
          target="_blank"
          rel="noopener noreferrer"
          // state={{ username: user.username }}
        >
          <Photo
            isOnline={isOnline}
            photoSize={photoSize}
            borderSize={borderSize}
            src={!userPhoto ? defaultPhoto : userPhoto}
            alt={!user?.username ? 'userPhoto' : user?.username}
            // onClick={onClickPhoto}
          />
        </Link>
      </PhotoContainer>

      {selected ? (
        <DeleteUser onClick={() => deleteUserSelected(user)}>
          <AiFillMinusCircle />
        </DeleteUser>
      ) : null}
    </Container>
  );
}

UserPhoto.propTypes = {
  userPhoto: PropTypes.string,
};

UserPhoto.defaultProps = {
  userPhoto: defaultPhoto,
};

export default UserPhoto;
