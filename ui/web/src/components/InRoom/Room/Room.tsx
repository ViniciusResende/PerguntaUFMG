/** React Imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** Components */
import Button from '../../Common/Button';
import Checkbox from '../../Common/Checkbox';
import Question from '../elements/Question';

/** Types */
import { IQuestion, IUserInfoBody } from 'pergunta-UFMG-lib';

/** Styles */
import './Room.scss';

/** Assets */
import { LikeIcon } from '../../../assets/svg/icons';
import { NoQuestionsIllustration } from '../../../assets/svg/illustrations';

type RoomProps = {
  questions: IQuestion[];
  roomClosed: boolean;
  title: string;
  user: IUserInfoBody | null;
  logIn: () => void;
  sendQuestion: (content: string, isAnonymous: boolean) => void;
  toggleQuestionLike: (id: string, likeId?: string) => void;
};

function Room({
  questions,
  roomClosed,
  title,
  user,
  logIn,
  sendQuestion,
  toggleQuestionLike,
}: RoomProps) {
  const [newQuestion, setNewQuestion] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  function handleSendQuestion(event: React.FormEvent) {
    event.preventDefault();

    if (newQuestion) {
      sendQuestion(newQuestion, isAnonymous);
      setNewQuestion('');
    }
  }

  return (
    <main className="room-page">
      <div className="room-page__room-title">
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
      </div>

      <div className="room-page__content">
        {!roomClosed && (
          <form
            className="room-page__question-submit"
            onSubmit={handleSendQuestion}
          >
            <textarea
              placeholder="O que você quer perguntar?"
              onChange={(event) => {
                setNewQuestion(event.target.value);
              }}
              value={newQuestion}
            />

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
                  <img src={user.profile} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta,{' '}
                  <button onClick={logIn} type="button">
                    faça seu login
                  </button>
                  .
                </span>
              )}
              <Button
                modifier="default"
                type="submit"
                disabled={!user || !newQuestion}
              >
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
                  author={question.author}
                  content={question.content}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                  isAnonymous={question.isAnonymous}
                  likeId={question.likeId}
                >
                  {!question.isAnswered && (
                    <button
                      className={cx('like-button', { liked: question.likeId })}
                      type="button"
                      aria-label="Marcar como gostei"
                      onClick={() =>
                        toggleQuestionLike(question.id, question.likeId)
                      }
                    >
                      {question.likesCount > 0 && (
                        <span>{question.likesCount}</span>
                      )}
                      <LikeIcon />
                    </button>
                  )}
                </Question>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

/** Exports */
export default Room;
