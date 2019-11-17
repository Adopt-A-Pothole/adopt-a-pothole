import React from 'react';
import { Comment } from 'semantic-ui-react';

export default function PotholeComment({ comment }) {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as="a">{comment.user_name}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.createdAt}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.message}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}
