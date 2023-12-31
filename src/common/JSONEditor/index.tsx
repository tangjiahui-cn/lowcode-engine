import { useEffect, useRef } from 'react';
import JsonEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import { useUpdateEffect } from 'ahooks';

interface IProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any[]) => void;
  onError?: (value: any[]) => void;
}

/**
 * JSON 编辑器
 *
 * */
export default function JSONEditor(props: IProps) {
  const JsonRef = useRef<any>(null);
  const editor = useRef<any>(null);

  const handleChange = () => {
    props?.onChange?.(editor.current?.get());
  };

  const handleError = (errArr: any = []) => {
    props?.onError?.(errArr);
  };

  const options: JSONEditorOptions = {
    mode: 'code',
    history: true,
    onChange: handleChange,
    onValidationError: handleError,
    mainMenuBar: false,
  };

  function init() {
    editor.current = new JsonEditor(JsonRef.current, options);
    editor.current?.set?.(props?.defaultValue || props?.value || {});
  }

  function handleDestroy() {
    editor?.current?.destroy?.();
  }

  useUpdateEffect(() => {
    editor.current?.set?.(props?.value || {});
  }, [props?.value]);

  useEffect(() => {
    init();
    return handleDestroy;
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflowX: 'auto' }}>
      <div ref={JsonRef} style={{ width: '100%', height: '100%', whiteSpace: 'nowrap' }} />
    </div>
  );
}
