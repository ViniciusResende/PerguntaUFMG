/** React Imports */
import React, { useState } from 'react';

/** Components */
import Modal from '../../Common/Modal';
import Question from '../elements/Question';

/** Types */
import { IQuestion } from 'pergunta-UFMG-lib';

/** Styles */
import './ManageRoom.scss';

/** Assets */
import {
  CheckMarkIcon,
  TextBoxIcon,
  TrashBinIcon,
} from '../../../assets/svg/icons';
import { NoQuestionsIllustration } from '../../../assets/svg/illustrations';

type ManageRoomProps = {
  questions: IQuestion[];
  title: string;
  checkQuestion: (id: string) => void;
  highlightQuestion: (id: string) => void;
  deleteQuestion: (id: string) => void;
};

function ManageRoom({
  questions,
  title,
  checkQuestion,
  highlightQuestion,
  deleteQuestion,
}: ManageRoomProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onConfirmDeletion = (questionId: string) => {
    deleteQuestion(questionId);
    setIsDeleteModalOpen(false);
  };

  return (
    <main className="manage-room-page">
      <div className="manage-room-page__room-title">
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
      </div>
      <div className="manage-room-page__questions">
        {questions.length === 0 ? (
          <div className="manage-room-page__no-questions">
            <NoQuestionsIllustration />
            <strong>Nenhuma pergunta por aqui...</strong>
            <span>
              Envie o código desta sala para seus amigos e comece a responder
              perguntas!
            </span>
          </div>
        ) : (
          <>
            {questions.map((question) => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
                isAnonymous={question.isAnonymous}
                likeId={question.likeId}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => checkQuestion(question.id)}
                      aria-label="Marcar pergunta como respondida"
                    >
                      <CheckMarkIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => highlightQuestion(question.id)}
                      aria-label="Dar destaque à pergunta"
                    >
                      <TextBoxIcon />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  aria-label="Remover pergunta"
                >
                  <TrashBinIcon />
                </button>
                <Modal
                  isOpen={isDeleteModalOpen}
                  icon={<TrashBinIcon />}
                  title="Excluir pergunta"
                  message="Tem certeza que você deseja excluir essa pergunta?"
                  onConfirm={() => onConfirmDeletion(question.id)}
                  onCancel={() => setIsDeleteModalOpen(false)}
                />
              </Question>
            ))}
          </>
        )}
      </div>
    </main>
  );
}

/** Exports */
export default ManageRoom;
