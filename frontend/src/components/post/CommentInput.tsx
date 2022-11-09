import Profile from '@components/atoms/Profile';
import ButtonShort from '@components/atoms/ShortButton';
import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '@apis/commentApi';
import { POST_QUERY_KEY } from '@apis/postApi';

interface CommentInputProps {
  postId: number;
}

export default function CommentInput({ postId }: CommentInputProps) {
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();

  const { mutate: submitNewComment } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([POST_QUERY_KEY.GET_POST_BY_ID, postId]);
    },
  });

  const onSubmit = useCallback(() => {
    submitNewComment({ postId, comment });
  }, [postId, comment, submitNewComment]);

  return (
    <Container>
      <Profile />
      <Input placeholder='응원 댓글을 입력하고 배팅에 참여하세요!' value={comment} onChange={e => setComment(e.target.value)} />
      <ButtonShort label='등록' buttonStyle={{ width: '80px', height: '48px', fontSize: '16px' }} onClick={onSubmit} />
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

const Input = styled.textarea`
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
  border: 1px solid ${AppColor.border.black};
  border-radius: 4px;
  height: 48px;
`;
