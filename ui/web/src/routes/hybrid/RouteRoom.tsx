/** React imports */
import React from 'react';

/** React components */
import Room from '../../components/InRoom/Room';

/** Library */
import Lib from 'pergunta-UFMG-lib';

/** Helpers */

/** Enums */

function RouteRoom() {
  const mockQuestions = [
    {
      id: '1',
      content: 'Primeira Pergunta',
      author: {
        name: 'Vinícius Alves',
        avatar:
          'https://media.istockphoto.com/id/825383494/photo/business-man-pushing-large-stone-up-to-hill-business-heavy-tasks-and-problems-concept.jpg?s=612x612&w=0&k=20&c=wtqvbQ6OIHitRVDPTtoT_1HKUAOgyqa7YzzTMXqGRaQ=',
      },
      likeCount: 10,
      isAnonymous: false,
      isHighlighted: false,
      isAnswered: false,
    },
  ];

  return (
    <Room
      questions={mockQuestions}
      user={{
        id: '1',
        name: 'Vinícius Alves',
        avatar:
          'https://media.istockphoto.com/id/825383494/photo/business-man-pushing-large-stone-up-to-hill-business-heavy-tasks-and-problems-concept.jpg?s=612x612&w=0&k=20&c=wtqvbQ6OIHitRVDPTtoT_1HKUAOgyqa7YzzTMXqGRaQ=',
      }}
      roomClosed={false}
      title="Sala React Q&A"
      sendQuestion={() => {}}
      toggleQuestionLike={() => {}}
    />
  );
}

/** Exports */
export default RouteRoom;
