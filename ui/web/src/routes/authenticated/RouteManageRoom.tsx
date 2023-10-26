/** React imports */
import React from 'react';

/** React components */
import ManageRoom from '../../components/InRoom/ManageRoom';

/** Library */
import Lib from 'pergunta-UFMG-lib';

/** Helpers */

/** Enums */

function RouteManageRoom() {
  function checkQuestion(id: string) {
    console.log(id);
  }

  function deleteQuestion(id: string) {
    console.log(id);
  }

  function highlightQuestion(id: string) {
    console.log(id);
  }

  const mockQuestions = [
    {
      id: '1',
      content: 'Primeira Pergunta',
      author: {
        name: 'Vinícius Alves',
        avatar:
          'https://media.istockphoto.com/id/825383494/photo/business-man-pushing-large-stone-up-to-hill-business-heavy-tasks-and-problems-concept.jpg?s=612x612&w=0&k=20&c=wtqvbQ6OIHitRVDPTtoT_1HKUAOgyqa7YzzTMXqGRaQ=',
      },
    },
  ];

  return (
    <ManageRoom
      questions={mockQuestions}
      title="Sala React Q&A"
      checkQuestion={checkQuestion}
      deleteQuestion={deleteQuestion}
      highlightQuestion={highlightQuestion}
    />
  );
}

/** Exports */
export default RouteManageRoom;
