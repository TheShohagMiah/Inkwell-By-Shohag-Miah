import React, { useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image"; // NEW
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiCode,
  FiLink,
  FiLink2,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiImage,
  FiPlusCircle,
} from "react-icons/fi";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuListOrdered,
  LuSeparatorHorizontal,
  LuUndo2,
  LuRedo2,
  LuStrikethrough,
  LuHighlighter,
  LuListTodo,
  LuRemoveFormatting,
  LuQuote,
  LuImagePlus,
} from "react-icons/lu";

// --- BUTTON COMPONENT ---
const ToolbarBtn = ({ onClick, active, title, children, danger }) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    title={title}
    className={`p-2 rounded-lg transition-all flex items-center justify-center shrink-0 cursor-pointer
      ${
        active
          ? "bg-brand-primary text-white shadow-sm shadow-brand-primary/20"
          : danger
            ? "text-danger/60 hover:text-danger hover:bg-danger/5"
            : "text-txt-muted hover:text-brand-primary hover:bg-brand-primary/5"
      }`}
  >
    {React.cloneElement(children, { size: 15 })}
  </button>
);

const Divider = () => (
  <div className="w-[1px] h-4 bg-border-soft self-center mx-1 shrink-0" />
);

// --- TOOLBAR ---
const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt("Enter Image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-border-soft bg-white/40 dark:bg-card/40 backdrop-blur-md rounded-t-2xl sticky top-0 z-10">
      {/* History Group */}
      <div className="flex items-center gap-0.5">
        <ToolbarBtn
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <LuUndo2 />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          <LuRedo2 />
        </ToolbarBtn>
      </div>
      <Divider />

      {/* Headings */}
      <div className="flex items-center gap-0.5">
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
          title="H1"
        >
          <LuHeading1 />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="H2"
        >
          <LuHeading2 />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="H3"
        >
          <LuHeading3 />
        </ToolbarBtn>
      </div>
      <Divider />

      {/* Formatting */}
      <div className="flex items-center gap-0.5">
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <FiBold />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <FiItalic />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <FiUnderline />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strike"
        >
          <LuStrikethrough />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
          title="Highlight"
        >
          <LuHighlighter />
        </ToolbarBtn>
      </div>
      <Divider />

      {/* Alignment & Lists */}
      <div className="flex items-center gap-0.5">
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        >
          <FiAlignLeft />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        >
          <FiAlignCenter />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <FiList />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <LuListOrdered />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          active={editor.isActive("taskList")}
        >
          <LuListTodo />
        </ToolbarBtn>
      </div>
      <Divider />

      {/* Assets & Blocks */}
      <div className="flex items-center gap-0.5">
        <ToolbarBtn
          onClick={setLink}
          active={editor.isActive("link")}
          title="Link"
        >
          <FiLink />
        </ToolbarBtn>
        <ToolbarBtn onClick={addImage} title="Insert Image">
          <LuImagePlus />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <LuQuote />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        >
          <FiCode />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Divider"
        >
          <LuSeparatorHorizontal />
        </ToolbarBtn>
      </div>

      <div className="ml-auto">
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          danger
          title="Reset"
        >
          <LuRemoveFormatting />
        </ToolbarBtn>
      </div>
    </div>
  );
};

// --- EDITOR ---
const Editor = ({
  value,
  onChange,
  hasError = false,
  placeholder = "Capture insight data...",
  minHeight = "350px",
  maxChars,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      Image.configure({
        HTMLAttributes: {
          class:
            "rounded-2xl border border-border-base shadow-lg max-w-full my-8",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-brand-primary underline underline-offset-4 font-bold",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      CharacterCount.configure({ limit: maxChars }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-txt-muted/20 before:float-left before:pointer-events-none before:h-0",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-slate dark:prose-invert max-w-none focus:outline-none px-8 py-8 text-txt-main leading-relaxed`,
        style: `min-height: ${minHeight}`,
      },
    },
  });

  useEffect(() => {
    if (editor && value && editor.isEmpty) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div
      className={`rounded-3xl border bg-white dark:bg-card/50 transition-all duration-500 shadow-sm overflow-hidden
        ${hasError ? "border-danger/40 ring-4 ring-danger/5" : "border-border-base focus-within:border-brand-primary/30 focus-within:ring-4 focus-within:ring-brand-primary/5"}`}
    >
      <EditorToolbar editor={editor} />

      <div className="relative custom-scrollbar overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* FOOTER */}
      <div className="px-6 py-3 border-t border-border-soft flex items-center justify-between bg-soft/5">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 text-[10px] font-black text-txt-muted/60 uppercase tracking-widest">
            <kbd className="px-1.5 py-0.5 rounded border border-border-base bg-white dark:bg-card shadow-sm text-[8px]">
              CMD
            </kbd>{" "}
            +{" "}
            <kbd className="px-1.5 py-0.5 rounded border border-border-base bg-white dark:bg-card shadow-sm text-[8px]">
              K
            </kbd>{" "}
            Add Link
          </span>
        </div>
        <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] opacity-80">
          Node_Buffer Active
        </div>
      </div>
    </div>
  );
};

export default Editor;
