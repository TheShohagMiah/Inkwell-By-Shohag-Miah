import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Undo,
  Redo,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: "heading",
    },
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: "bold",
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: "italic",
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: "bulletList",
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: "blockquote",
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-border-soft bg-soft/30">
      {buttons.map((btn, i) => (
        <button
          key={i}
          type="button"
          onClick={btn.action}
          className={`p-2 rounded-md transition-colors ${
            editor.isActive(btn.active)
              ? "bg-txt-main text-main"
              : "text-txt-muted hover:bg-soft hover:text-txt-main"
          }`}
        >
          <btn.icon size={16} />
        </button>
      ))}
      <div className="w-[1px] h-4 bg-border-soft mx-2 self-center" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 text-txt-muted hover:text-txt-main"
      >
        <Undo size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 text-txt-muted hover:text-txt-main"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

const Tiptap = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 text-txt-main",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full border border-border-soft rounded-xl overflow-hidden bg-soft/10 focus-within:border-blue-500/50 transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
