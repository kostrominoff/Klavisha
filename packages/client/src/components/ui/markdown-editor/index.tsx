import { useBoolean } from "@/hooks/boolean.hook";
import { TextareaHTMLAttributes, forwardRef, useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Button from "../button";

type Props = {
  value?: string;
  onChange?: (text: string) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">;

const MarkdownEditor = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, onChange, ...props }, ref) => {
    const [text, setText] = useState(value || "");
    const [isPreview, { toggle: toggleIsPreview }] = useBoolean();

    useEffect(() => {
      onChange && onChange(text);
    }, [onChange, text]);

    return (
      <div className="prose prose-slate">
        <Button
          variant="secondary"
          className="mb-5 w-full"
          onClick={toggleIsPreview}
          type="button"
        >
          {isPreview ? "Редактор" : "Внешний вид"}
        </Button>
        <div>
          {isPreview ? (
            <ReactMarkdown>
              {text ? text.toString() : "**Пока что ничего нет!**"}
            </ReactMarkdown>
          ) : (
            <textarea
              className="p-1 w-full max-w-xl text-base rounded-lg border transition outline-none resize-none focus:border-indigo-500 focus:ring focus:ring-indigo-300 border-slate-400 placeholder:text-slate-500 text-slate-900"
              value={text}
              rows={10}
              cols={50}
              onChange={(e) => setText(e.target.value)}
              ref={ref}
              {...props}
            />
          )}
        </div>
      </div>
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
