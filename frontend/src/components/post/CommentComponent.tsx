import Profile from '@components/atoms/Profile';
import ButtonShort from '@components/atoms/ShortButton';
import styled from '@emotion/styled';
import useMe from '@hooks/useMe';
import AppColor from '@styles/AppColor';
import { formatDate } from '@utils/Utils';
import { useMemo } from 'react';

interface CommentComponentProps {
  data: {
    id: number;
    userId: number;
    comment: string;
    createdAt: string;
    nickname: string;
  };
}

export default function CommentComponent({ data }: CommentComponentProps) {
  const { me } = useMe();
  const myUserId = useMemo(() => me?.userId, [me]);

  const createdAt = useMemo(() => formatDate(data.createdAt), [data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '14px', marginBottom: '20px' }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
            <Profile />
            <Nickname>{data.nickname}</Nickname>
          </div>
          <CreatedAt>{createdAt}</CreatedAt>
        </div>
        <Comment>{data.comment}</Comment>
      </Container>
      {myUserId && data.userId === myUserId && (
        <div style={{ display: 'flex', flexDirection: 'row', columnGap: '10px', alignItems: 'flex-start' }}>
          <ButtonShort
            label='수정'
            buttonStyle={{ width: '72px', height: '40px', fontSize: '16px', backgroundColor: AppColor.text.main }}
          />
          <ButtonShort
            label='삭제'
            buttonStyle={{ width: '72px', height: '40px', fontSize: '16px', backgroundColor: AppColor.text.error }}
          />
        </div>
      )}
    </div>
  );
}

const Container = styled.div`
  width: 100%;
  border: 1px solid ${AppColor.border.gray};
  border-radius: 8px;
  padding: 10px 20px;
`;

const Nickname = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: ${AppColor.text.main};
`;

const Comment = styled.p`
  margin: 14px 0;
  font-size: 16px;
  line-height: 1.5;
  color: ${AppColor.text.main};
`;

const CreatedAt = styled.p`
  font-size: 12px;
  font-weight: 300;
  line-height: 1.5;
  color: ${AppColor.text.sub};
`;
