import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import Quill, { Delta, Op, QuillOptions } from "quill";
import "quill/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EditorValue = {
  content: string;
};

interface EditorProps {
  onSubmit: ({ content }: EditorValue) => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: RefObject<Quill | null>;
}

const Editor = ({
  onSubmit,
  placeholder = "Insérer les paroles",
  defaultValue = [],
  disabled = false,
  innerRef,
}: EditorProps) => {
  const [text, setText] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    disabledRef.current = disabled;
    defaultValueRef.current = defaultValue;
  });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);

      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }

      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className="flex flex-col mt-2">
      <div
        className={cn(
          "flex flex-col border border-slate-200 rounded-mb overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white",
          disabled && "opacity-50"
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />

        <div className="flex px-2 pb-2 z-[5]">
          {/* Send button */}
          <Button
            disabled={disabled || isEmpty}
            className={cn(
              "ml-auto mt-2",
              isEmpty
                ? "bg-white hover:bg-white text-muted-foreground"
                : "bg-[#007a5a] hover:bg-[#007a5a]/180 text-white"
            )}
            onClick={() => {
              onSubmit({
                content: JSON.stringify(quillRef.current?.getContents()),
              });
            }}
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Editor;
