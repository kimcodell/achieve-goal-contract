import styled from "@emotion/styled";
import Image from "next/image";

interface ProfileProps {
  profileImgUrl?: string;
  width?: string | number;
  height?: string | number;
}

export default function Profile({profileImgUrl, width, height}: ProfileProps) {
  return (
    <Container style={{...(width ? { width } : null), ...(height ? { height } : null)}}>
      {/* <Image src={profileImgUrl || ''}  /> */}
    </Container>
  )
}

const Container = styled.div`
  border-radius: 1000px;
  background-color: #F5F5F5;
  border: 1px solid #C4C4C4;
  width: 40px;
  height: 40px;
`
