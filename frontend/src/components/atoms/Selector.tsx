import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';

interface SelectorProps {
  value: any;
  onChange: (value: any) => void | Dispatch<SetStateAction<any>>;
  disabled?: boolean;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Selector({ value, onChange, disabled = false, open, setOpen }: SelectorProps) {
  const [openLocal, setOpenLocal] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen ? setOpen(prev => !prev) : setOpenLocal(prev => !prev);
  }, [setOpen]);

  return (
    <>
      <Container disabled={disabled} onClick={handleOpen}>
        {<MdOutlineExpandMore />}
      </Container>
      {(open || openLocal) && <Menu></Menu>}
    </>
  );
}

const Container = styled.button``;

const Menu = styled.div``;
