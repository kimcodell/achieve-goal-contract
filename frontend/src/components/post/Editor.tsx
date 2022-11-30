import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  html: string;
  setHtml: Dispatch<SetStateAction<string>> | ((value: string) => void);
  placeholder?: string;
}

export default function Editor({ html, setHtml, placeholder }: EditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback(async () => {}, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['clean'],
        ],

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    [imageHandler],
  );

  const formats = useMemo(
    () => [
      'font',
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'code-block',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
      'align',
      'color',
      'background',
    ],
    [],
  );

  return (
    <div className='text-editor'>
      <CustomReactQuill
        placeholder={placeholder}
        ref={quillRef}
        theme='snow'
        value={html}
        onChange={(content, delta, source, editor) => setHtml(editor.getHTML())}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

const CustomReactQuill = styled(ReactQuill)`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #cccccc;

  .ql-toolbar.ql-snow {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .ql-container.ql-snow {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .ql-container.ql-snow {
    height: 60vh;
  }
  .ql-editor {
    height: 100%;
    overflow-y: scroll;
  }
  .ql-editor.ql-blank::before {
    font-style: normal;
    font-size: 14px;
  }
`;
