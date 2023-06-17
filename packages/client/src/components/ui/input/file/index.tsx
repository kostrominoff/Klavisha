import { ChangeEvent, InputHTMLAttributes, useEffect, useRef } from "react";
import Button from "../../button";
import { useFilesUpload } from "@/hooks/files.hooks";
import { FileType } from "@klavisha/types";

type Props = {
  value?: FileType[];
  onChange?: (files: FileType[]) => void;
  multiple?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange">;

// TODO: React hook form support
// Create a storage
const FileUploader = ({
  children,
  multiple,
  value,
  onChange,
  ...props
}: Props) => {
  const { data, mutate, isLoading, isSuccess } = useFilesUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data && isSuccess && onChange) {
      onChange(data.data);
    }
  }, [data, isSuccess, onChange]);

  const buttonClickHandler = () => {
    inputRef.current?.click();
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      mutate(files);
    }
  };

  const getChildren = () => {
    // If value
    if (value) {
      if (value.length === 1) {
        return value[0].originalName;
      } else {
        return `${value.length} загружено`;
      }
      // If not value but data
    } else if (data?.data && isSuccess) {
      if (data.data.length === 1) {
        return data.data[0].originalName;
      } else {
        return `${data.data.length} загружено`;
      }
    } else if (children) {
      return children;
    } else {
      return "Загрузить файлы";
    }
  };

  return (
    <>
      <Button
        onClick={buttonClickHandler}
        loading={isLoading}
        variant="secondary"
        type="button"
      >
        {getChildren()}
      </Button>
      <input
        className="hidden"
        onChange={inputChangeHandler}
        type="file"
        ref={inputRef}
        multiple={multiple}
        {...props}
      />
      <input className="hidden" type="text" />
    </>
  );
};

export default FileUploader;
