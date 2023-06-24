import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "../../button";
import { useFilesUpload } from "@/hooks/files.hooks";
import { FileType } from "@klavisha/types";
import Api from "@/services";

type Ref = {
  click: () => void;
};

type Props = {
  value?: FileType[];
  stringValues?: string[];
  onChange?: (files: FileType[]) => void;
  multiple?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "placeholder"
>;

// Create a storage
const FileUploader = forwardRef<Ref, Props>(
  ({ children, multiple, stringValues, value, onChange, ...props }, ref) => {
    const [localFiles, setLocalFiles] = useState<FileType[]>(value || []);

    useEffect(() => {
      const getFiles = async () => {
        if (!stringValues) return;
        try {
          const files = await Api.files.findAllByFilenames(stringValues);
          setLocalFiles(files);
        } catch {}
      };
      getFiles();
    }, [stringValues]);

    const { mutateAsync, isLoading, isSuccess } = useFilesUpload();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      click() {
        inputRef.current?.click();
      },
    }));

    useEffect(() => {
      if (onChange) onChange(localFiles);
    }, [localFiles, onChange]);

    const buttonClickHandler = () => {
      inputRef.current?.click();
    };

    const inputChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const filesToUpload = Array.from(files).filter(
          (file) =>
            !localFiles.some(
              (localFile) => localFile.originalName === file.name
            )
        );
        const { data } = await mutateAsync(filesToUpload);
        setLocalFiles(data);
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
      } else if (localFiles && (isSuccess || stringValues)) {
        if (localFiles.length === 1) {
          return localFiles[0].originalName;
        } else {
          return `${localFiles.length} загружено`;
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
      </>
    );
  }
);

FileUploader.displayName = "FileUploader";

export default FileUploader;
