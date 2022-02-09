import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import UserPhoto from '../../Layout/UserPhoto/UserPhoto';
import {
  MainContainer,
  UserPhotoContainer,
  NameUser,
  DataCards,
  MyDataCard,
  IndividualStat,
  IndividualStatContainer,
  // StatSocial,
  AboutMe,
  NameUserContainer,
  AddNewSN,
  LoadingContainer,
  AlertMessage,
  ErrorWritingSn,
  LinkTo,
} from './styleds';
import actions from '../../../store/action';
import LoadingIcon from '../../Layout/Loading/Loading';
import CardComunidadShow from '../../Layout/CardComunidadShow/CardComunidadShow';

// Icons
import { ReactComponent as PencilIcon } from '../../../images/Icon/PencilIcon.svg';
import { ReactComponent as AddIcon } from '../../../images/Icon/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '../../../images/Icon/DeleteIcon.svg';

const UserProfileConfig = function UserProfileConfig() {
  const dispatch = useDispatch();

  const [userNewData, setUserNewData] = useState();

  const [userNewSocialN, setUserNewSocialN] = useState();
  const [userNewOneSN, setUserNewOneSN] = useState([''], ['']);
  const [userNewName, setUserNewName] = useState(userNewData?.fullname);
  const [userNewAbout, setUserNewAbout] = useState();
  const [errorWritingSN, setErrorWritingSN] = useState(false);
  // const [myComus, setMyComus] = useState([]);

  // UseSelector
  const user = useSelector((state) => state.currentUserOTokencito);

  const allComus = useSelector((state) => state.communities);

  const myComus = allComus.filter((e) => e.users.includes(user?.username));

  const loading = useSelector((state) => state.spinningLoading);
  const userAuth = useSelector((state) => state.userAuthenticated);

  useEffect(() => {
    dispatch(actions.getAllCommunities());
  }, []);

  useEffect(() => {
    setUserNewData(user);

    setUserNewAbout(user?.about);
    setUserNewSocialN(user?.socialNetworks);

    setErrorWritingSN(false);
  }, [user]);

  useEffect(() => {
    setUserNewName(userNewData?.fullname);
  }, [userNewData]);

  const onChangeName = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setUserNewName(value);
  };

  const onClickNameEdit = () => {
    if (userNewName === userNewData.fullname) {
      return;
    }
    dispatch(
      actions.updateTheUser(userNewData.username, { fullname: userNewName })
    );
  };

  const onChangeAbout = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setUserNewAbout(value);
  };

  const onClickAboutEdit = () => {
    if (userNewAbout === userNewData.about) {
      return;
    }
    dispatch(
      actions.updateTheUser(userNewData.username, { about: userNewAbout })
    );
  };

  const onSelectNew = (e) => {
    e.preventDefault();
    const arrTemp = userNewOneSN;
    const newValue = e.target.value;
    arrTemp[0] = newValue;
    setUserNewOneSN(arrTemp);
  };

  const onLinkNew = (e) => {
    e.preventDefault();
    const arrTemp = userNewOneSN;
    const newValue = e.target.value;
    arrTemp[1] = newValue;
    setUserNewOneSN(arrTemp);
  };

  const onClickAddSN = () => {
    // Verificar si ya existe SN
    if (userNewSocialN.filter((e) => e.name === userNewOneSN[0]).length > 0) {
      setErrorWritingSN('La red ya existe, primero eliminala');
      return;
    }

    // Verificar si los campos estan llenos
    if (
      userNewOneSN[0] === undefined ||
      userNewOneSN[0] === '' ||
      userNewOneSN[1] === undefined ||
      userNewOneSN[1] === '' ||
      userNewSocialN.filter((e) => e.name === userNewOneSN[0]).length > 0
    ) {
      setErrorWritingSN('Campos vacios no permitidos');
      return;
    }

    // Verificar si link ingresado corresponde a la SN
    if (!userNewOneSN[1].includes(userNewOneSN[0].toLowerCase())) {
      setErrorWritingSN('El link debe corresponder a la red');
      return;
    }

    setErrorWritingSN(false);

    const newSN = {
      name: userNewOneSN[0],
      link: userNewOneSN[1],
    };

    const arrPushed = [...userNewSocialN, newSN];
    dispatch(
      actions.updateTheUser(userNewData.username, { socialNetworks: arrPushed })
    );
    setUserNewOneSN([''], ['']);
  };

  const onClickDeleteSN = (snName) => {
    const respuesta = userNewSocialN.filter((sn) => sn.name !== snName);
    dispatch(
      actions.updateTheUser(userNewData.username, { socialNetworks: respuesta })
    );
  };

  const onChangePhoto = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    dispatch(actions.updateTheUser(userNewData.username, formData));
  };

  return (
    <>
      <Header />
      {loading ? (
        <LoadingContainer>
          <LoadingIcon />
        </LoadingContainer>
      ) : (
        <div>
          {!userAuth ? (
            <AlertMessage>Que tal si iniciamos sesion primero?</AlertMessage>
          ) : (
            <MainContainer>
              <UserPhotoContainer>
                <UserPhoto
                  user={userNewData}
                  userPhoto={userNewData?.photo}
                  photoSize="131px"
                  medalSize="0px"
                  borderSize="9px"
                />
                <label htmlFor="newPhoto" onChange={onChangePhoto}>
                  <input type="file" name="newPhoto" id="newPhoto" />
                </label>
                {/* <AddPhotoIcon onClick={() => {}} /> */}
              </UserPhotoContainer>

              <NameUserContainer>
                <NameUser
                  data-test="fullname"
                  name="fullname"
                  value={userNewName || ''}
                  onChange={(e) => {
                    onChangeName(e);
                  }}
                />
                <PencilIcon data-test="editname" onClick={onClickNameEdit} />
              </NameUserContainer>

              <DataCards>
                {/*  */}
                <MyDataCard>
                  <p>Algo sobre mí</p>
                  <AboutMe
                    data-test="description"
                    value={userNewAbout || ''}
                    onChange={(e) => {
                      onChangeAbout(e);
                    }}
                  />
                  <PencilIcon data-test="editdesc" onClick={onClickAboutEdit} />
                </MyDataCard>

                <MyDataCard>
                  <p>Mis redes</p>
                  <IndividualStatContainer>
                    {userNewSocialN?.map((sn) => (
                      <IndividualStat key={uuidv4()}>
                        <p>{sn.name}</p>
                        <a
                          href={sn.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {sn.link}
                        </a>

                        <DeleteIcon onClick={() => onClickDeleteSN(sn.name)} />
                      </IndividualStat>
                    ))}
                  </IndividualStatContainer>
                  <AddNewSN>
                    <label htmlFor="newSN">
                      <select
                        data-test="github"
                        name="newSN"
                        id="newSN"
                        onChange={onSelectNew}
                      >
                        <option>--Selecciona--</option>
                        <option value="Github">Github</option>
                        <option value="Linkedin">Linkedin</option>
                        <option value="Twitter">Twitter</option>
                      </select>
                    </label>

                    <label htmlFor="sn-url">
                      <input
                        type="text"
                        id="sn-url"
                        value={userNewOneSN[1]}
                        onChange={onLinkNew}
                        data-test="network"
                      />
                    </label>
                    <AddIcon data-test="addnetwork" onClick={onClickAddSN} />
                  </AddNewSN>
                  {errorWritingSN ? (
                    <ErrorMessage>{errorWritingSN}</ErrorMessage>
                  ) : (
                    ''
                  )}
                </MyDataCard>

                <MyDataCard>
                  <p>Mis comunidades</p>
                  {myComus?.map((comu) => (
                    <CardComunidadShow
                      key={uuidv4()}
                      image={comu.image}
                      users={comu.users.length}
                      // checks, esto lo tiene Nayruth
                      title={comu.title}
                    />
                  ))}
                  <LinkTo to="/communities">Editar mis comunidades</LinkTo>
                </MyDataCard>
              </DataCards>
            </MainContainer>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

function ErrorMessage({ children }) {
  return <ErrorWritingSn>{children}</ErrorWritingSn>;
}

export default UserProfileConfig;
