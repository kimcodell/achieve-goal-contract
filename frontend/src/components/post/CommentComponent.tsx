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
  return <></>;
}
