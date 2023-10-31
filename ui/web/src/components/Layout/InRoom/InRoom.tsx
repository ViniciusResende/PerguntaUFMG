/** React imports */
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

/** React Components */
import Header from './elements/Header/Header';
import Modal from '../../Common/Modal';
import Toast from '../../Common/Toast';

/** Library */
import Lib from 'pergunta-UFMG-lib';

/** Styles */
import './InRoom.scss';

/** Assets */
import { TrashBinIcon } from '../../../assets/svg/icons';

function InRoom() {
  const navigator = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const [canUserCloseRoom, setCanUserCloseRoom] = useState(false);
  const [isEndRoomModalOpen, setIsEndRoomModalOpen] = useState(false);
  const [isRoomClosed, setIsRoomClosed] = useState(
    !!Lib.room.roomMetadata?.endedAt
  );

  const handleMetadataChange = (roomMetadata: {
    authorId: string;
    endedAt: string;
  }) => {
    setIsRoomClosed(!!roomMetadata?.endedAt);
    handleCanUserCloseRoom(roomMetadata);
  };

  const handleCanUserCloseRoom = (roomMetadata: { authorId: string }) => {
    if (location.pathname.includes('admin')) {
      if (Lib.utils.security.user?.id === roomMetadata.authorId)
        setCanUserCloseRoom(true);
      else navigator('/room/' + roomId);
    }
  };

  const endRoom = () => {
    Lib.room.endRoom();
    setIsEndRoomModalOpen(false);
  };

  useEffect(() => {
    const { ROOM_METADATA_CHANGED } = Lib.room.EVENTS;

    Lib.room.subscribe(ROOM_METADATA_CHANGED, handleMetadataChange);

    return function cleanUp() {
      Lib.room.unsubscribe(ROOM_METADATA_CHANGED, handleMetadataChange);
    };
  }, []);

  return (
    <Suspense fallback="loading">
      <div className="in-room-page">
        <Header
          isRoomClosed={isRoomClosed}
          roomId={roomId ?? ''}
          endRoom={
            canUserCloseRoom ? () => setIsEndRoomModalOpen(true) : undefined
          }
        />
        <main className="in-room-page__content">
          <Outlet />
          <Modal
            isOpen={isEndRoomModalOpen}
            icon={<TrashBinIcon />}
            title="Encerrar sala"
            message="Tem certeza que você deseja encerrar essa sala agora? Não será possível enviar mais perguntas."
            onConfirm={endRoom}
            onCancel={() => setIsEndRoomModalOpen(false)}
          />
          <Toast />
        </main>
      </div>
    </Suspense>
  );
}

/** Exports */
export default InRoom;
