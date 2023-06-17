import { InputHTMLAttributes, useRef } from "react";
import Button from "../../button";

type Props = {} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

// TODO: Upload file and return filepath.
// Change button children to original filename
// Create a storage
const FileUploader = ({ children, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const buttonClickHandler = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Button onClick={buttonClickHandler} variant="secondary" type="button">
        {children || "Загрузить файл"}
      </Button>
      <input className="hidden" type="file" ref={inputRef} {...props} />
    </>
  );
};

export default FileUploader;
