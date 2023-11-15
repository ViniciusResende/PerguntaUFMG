/** React imports */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/** React components */
import Loader from '../../components/Common/Loader';
import Room from '../../components/InRoom/Room';

/** React hooks */
import useSecurity from '../middlewares/useSecurity';

/** Library */
import Lib, { IRoom, IUserInfoBody } from 'pergunta-UFMG-lib';

function RouteRoom() {
  useSecurity();
  const { roomId } = useParams();

  const [room, setRoom] = useState<IRoom | null>(null);
  const [user, setUser] = useState<IUserInfoBody | null>(
    Lib.utils.security.user
  );

  const joinRoom = async () => {
    const roomData = await Lib.room.joinRoom(roomId ?? '');

    setRoom(roomData);
  };

  const logIn = async () => {
    const user = await Lib.auth.auth();

    if (user !== null) setUser(user);
  };

  const sendQuestion = async (content: string, isAnonymous: boolean) => {
    const questionData = {
      author: {
        name: user?.name ?? '',
        profile: user?.profile ?? '',
      },
      content,
      isAnonymous,
    };

    await Lib.room.sendQuestion(questionData);
  };

  const toggleQuestionLike = async (id: string, likeId?: string) => {
    if (likeId) await Lib.room.dislikeQuestion(id, likeId);
    else await Lib.room.likeQuestion(id);
  };

  useEffect(() => {
    const { NEW_USER_AUTH } = Lib.utils.security.EVENTS;

    Lib.utils.security.subscribe(NEW_USER_AUTH, setUser);

    return function cleanUp() {
      Lib.utils.security.unsubscribe(NEW_USER_AUTH, setUser);
    };
  }, []);

  useEffect(() => {
    joinRoom();

    const { ROOM_DATA_CHANGED } = Lib.room.EVENTS;
    Lib.room.subscribe(ROOM_DATA_CHANGED, setRoom);

    return function cleanUp() {
      Lib.room.unsubscribe(ROOM_DATA_CHANGED, setRoom);
    };
  }, [roomId]);

  return (
    <>
      {!room ? (
        <Loader />
      ) : (
        <Room
          questions={room.questions}
          user={user}
          roomClosed={!!room.endedAt}
          title={room.title}
          logIn={logIn}
          sendQuestion={sendQuestion}
          toggleQuestionLike={toggleQuestionLike}
        />
      )}
    </>
  );
}

/** Exports */
export default RouteRoom;
