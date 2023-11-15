/** React imports */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/** React components */
import Loader from '../../components/Common/Loader';
import ManageRoom from '../../components/InRoom/ManageRoom';

/** Library */
import Lib, { IRoom } from 'pergunta-UFMG-lib';

function RouteManageRoom() {
  const navigator = useNavigate();
  const { roomId } = useParams();

  const [room, setRoom] = useState<IRoom | null>(null);

  function checkQuestion(id: string) {
    Lib.room.checkQuestionAsAnswered(id);
  }

  function deleteQuestion(id: string) {
    Lib.room.deleteQuestion(id);
  }

  function highlightQuestion(id: string) {
    Lib.room.highlightQuestion(id);
  }

  const joinRoom = async () => {
    const roomData = await Lib.room.joinRoom(roomId ?? '');

    if (roomData === null) navigator('/');

    setRoom(roomData);
  };

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
        <ManageRoom
          questions={room.questions}
          title={room.title}
          checkQuestion={checkQuestion}
          deleteQuestion={deleteQuestion}
          highlightQuestion={highlightQuestion}
        />
      )}
    </>
  );
}

/** Exports */
export default RouteManageRoom;
