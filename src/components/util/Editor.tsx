import MDEditor from "@uiw/react-md-editor";

function Editor({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  error?: string;
  placeholder: string;
}) {
    return (
    <div data-color-mode="light">
        <MDEditor
            value={value}
            onChange={(value) => setValue(value as string)}
            id="editor"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
            placeholder,
            }}
        />
    </div>
);
}

export default Editor;
