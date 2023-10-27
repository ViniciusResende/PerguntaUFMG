/** React Imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** Components */
import Button from '../../Common/Button';
import Checkbox from '../../Common/Checkbox';
import Question from '../elements/Question';

/** Types */
import { QuestionProps, UserProps } from '../types';

/** Styles */
import './Room.scss';

/** Assets */
import { LikeIcon } from '../../../assets/svg/icons';
import { NoQuestionsIllustration } from '../../../assets/svg/illustrations';

type RoomProps = {
  questions: QuestionProps[];
  roomClosed: boolean;
  title: string;
  user?: UserProps;
  sendQuestion: (content: string, isAnonymous: boolean) => void;
  toggleQuestionLike: (id: string) => void;
};

function Room({
  questions,
  roomClosed,
  title,
  user,
  sendQuestion,
  toggleQuestionLike,
}: RoomProps) {
  const [isAnonymous, setIsAnonymous] = useState(false);

  function handleSendQuestion(event: React.FormEvent) {
    event.preventDefault();

    const textarea = event.target as HTMLTextAreaElement;
    const content = textarea.value.trim();

    if (content) {
      sendQuestion(content, isAnonymous);
      textarea.value = '';
    }
  }

  return (
    <main className="room-page">
      <div className="room-page__room-title">
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
      </div>

      {!roomClosed && (
        <form
          className="room-page__question-submit"
          onSubmit={handleSendQuestion}
        >
          <textarea placeholder="O que você quer perguntar?" />

          <label htmlFor="anonymous" className="checkbox-container">
            <Checkbox
              id="anonymous"
              name="anonymous"
              value="anonymous"
              onClick={() => {
                setIsAnonymous((prev) => !prev);
              }}
              checked={isAnonymous}
            />
            <p>Pergunta anônima?</p>
          </label>

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button modifier="default" type="submit" disabled={!user}>
              Enviar Pergunta
            </Button>
          </div>
        </form>
      )}
      <div className="room-page__questions">
        {questions.length === 0 ? (
          <div className="room-page__no-questions">
            <NoQuestionsIllustration />
            <strong>Nenhuma pergunta por aqui...</strong>
            <span>
              Envie o código desta sala para seus amigos e comece a fazer
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
              >
                {!question.isAnswered && (
                  <button
                    className={cx('like-button', { liked: false })}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => toggleQuestionLike(question.id)}
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <LikeIcon />
                  </button>
                )}
              </Question>
            ))}
          </>
        )}
      </div>
    </main>
  );
}

/** Exports */
export default Room;
