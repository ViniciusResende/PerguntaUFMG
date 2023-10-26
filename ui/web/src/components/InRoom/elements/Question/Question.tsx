/** React Imports */
import React from 'react';
import cx from 'classnames';

/** Types */
import { QuestionProps } from '../../ManageRoom/ManageRoom';

/** Styles */
import './Question.scss';

/** Assets */
import { AnonymousIcon } from '../../../../assets/svg/icons';

interface QuestionComponentProps extends Omit<QuestionProps, 'id'> {
  children?: React.ReactNode;
}

function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
  isAnonymous = false,
}: QuestionComponentProps) {
  return (
    <div
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          {isAnonymous ? (
            <AnonymousIcon />
          ) : (
            <img src={author.avatar} alt={author.name} />
          )}
          <span>{!isAnonymous ? author.name : 'Autor Anônimo'}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}

/** Exports */
export default Question;
