// import { useState, useEffect } from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PostTemplate from './PostTemplate/PostTemplate';
// import axios from "../../../../utils/axios.js"

// import { dataPost } from "../__Mock__/DataPost";
import {
  getPostTime,
  softNumber,
} from '../../../../controller/CommunityPostCtr/utilities';
// import { getItems } from "../../../../controller/CommunityPostCtr/getItems";

const PostListCont = styled.div`
  background: rgba(41, 171, 224, 0.08);
  @media screen and (min-width: 1024px) {
    background: none;
    grid-area: postList;
    margin: 0 14rem 0 14rem;
  }
`;

function PostList({ results }) {
  // console.log(results);
  const currentUser = useSelector((state) => state.currentUserOTokencito);
  return (
    <PostListCont>
      {results?.map(
        // aqui estaba posts
        (
          {
            user,
            timePosted,
            title,
            description,
            points,
            resolved,
            likes,
            image,
            userPoints,
            _id,
            community,
          },
          index
        ) => (
          <PostTemplate
            key={`${title}0${user?.username}`}
            ban={index}
            user={user}
            userPhoto={user?.photo === null ? '' : user?.photo}
            userName={user?.username}
            timePost={getPostTime(timePosted)}
            timePosted={timePosted}
            postTitle={title}
            postDescription={description}
            points={softNumber(points)}
            userPoints={userPoints}
            resolved={resolved}
            likes={likes}
            urlPost={image}
            idPost={_id}
            textComment="Ver Respuestas" // boton para ver Comentarios de Answers
            authVer={
              currentUser?.username === user?.username ||
              currentUser?.role === 'admin'
            }
            isOnline={user?.isOnline}
            community={community}
          />
        )
      )}
    </PostListCont>
  );
}

export default PostList;
