import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

const RichTextEditor = forwardRef(
  ({ onChange, dummyUsers, placeholder }, ref) => {
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    const [mentionQuery, setMentionQuery] = useState("");
    const [mentionPosition, setMentionPosition] = useState(null);
    const [selectedMentionIndex, setSelectedMentionIndex] = useState(-1);
    const [isComposing, setIsComposing] = useState(false);

    useImperativeHandle(ref, () => ({
      clear: () => {
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
          onChange("");
        }
      },
    }));

    const formatText = (command, value = null) => {
      if (editorRef.current) {
        editorRef.current.focus();
        let success = false;
        if (
          command === "insertUnorderedList" ||
          command === "insertOrderedList"
        ) {
          success = document.execCommand(command, false, null);
        } else if (command === "formatBlock") {
          success = document.execCommand(command, false, value.toUpperCase());
        } else if (command === "insertImage" || command === "createLink") {
          if (value) {
            success = document.execCommand(command, false, value);
          }
        } else if (command === "insertHTML") {
          success = document.execCommand("insertHTML", false, value);
        } else {
          success = document.execCommand(command, false, value);
        }
        if (success) {
          onChange(editorRef.current.innerHTML);
        }
      }
    };

    const handleFileChange = (e) => {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (file.type.startsWith("image/")) {
            formatText(
              "insertHTML",
              `<img src="${result}" alt="${file.name}" style="max-width: 100%;" />`
            );
          } else {
            formatText(
              "insertHTML",
              `<a href="${result}" download="${file.name}" class="text-blue-500 underline">${file.name}</a>`
            );
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const handleInput = () => {
      if (isComposing || !editorRef.current) return;
      onChange(editorRef.current.innerHTML);
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let text = "";
        let offset = range.startOffset;

        // Get the text up to the cursor
        if (range.startContainer.nodeType === Node.TEXT_NODE) {
          text = range.startContainer.nodeValue || "";
        } else {
          // If in a non-text node, get the innerText of the editor up to cursor
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(editorRef.current);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          text = preCaretRange.toString();
          offset = text.length;
        }

        const lastAt = text.lastIndexOf("@", offset - 1);
        if (
          lastAt !== -1 &&
          (offset === lastAt + 1 ||
            text.slice(lastAt + 1, offset).indexOf(" ") === -1)
        ) {
          const query = text.slice(lastAt + 1, offset).toLowerCase();
          setMentionQuery(query);
          const rect = range.getBoundingClientRect();
          setMentionPosition({
            top: rect.bottom + window.scrollY + 2,
            left: rect.left + window.scrollX,
          });
          setSelectedMentionIndex(-1);
        } else {
          setMentionQuery("");
          setMentionPosition(null);
          setSelectedMentionIndex(-1);
        }
      }
    };

    const insertMention = (name) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textNode = range.startContainer;
        const text = textNode.nodeValue || "";
        const offset = range.startOffset;
        const lastAt = text.lastIndexOf("@", offset - 1);
        if (lastAt !== -1) {
          range.setStart(textNode, lastAt);
          range.setEnd(textNode, offset);
          range.deleteContents();
          formatText(
            "insertHTML",
            `<span class="text-blue-500 font-medium">@${name}</span>&nbsp;`
          );
        }
      }
      setMentionQuery("");
      setMentionPosition(null);
      setSelectedMentionIndex(-1);
    };

    const handleKeyDown = (e) => {
      if (mentionPosition && filteredUsers.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedMentionIndex((prev) =>
            Math.min(prev + 1, filteredUsers.length - 1)
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedMentionIndex((prev) => Math.max(prev - 1, -1));
        } else if (e.key === "Enter" && selectedMentionIndex >= 0) {
          e.preventDefault();
          insertMention(
            filteredUsers[selectedMentionIndex].name.replace(" ", "")
          );
        }
      }
    };

    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    const handleCompositionEnd = () => {
      setIsComposing(false);
      handleInput();
    };

    const filteredUsers = dummyUsers.filter((user) =>
      user.name.toLowerCase().includes(mentionQuery)
    );

    return (
      <div className="border border-gray-200 rounded-lg relative">
        <div className="flex flex-wrap gap-2 p-2 bg-gray-100">
          <button
            onClick={() => formatText("bold")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => formatText("italic")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => formatText("underline")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => formatText("strikethrough")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          <button
            onClick={() => formatText("insertUnorderedList")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Unordered List"
          >
            • List
          </button>
          <button
            onClick={() => formatText("insertOrderedList")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Ordered List"
          >
            1. List
          </button>
          <button
            onClick={() => formatText("formatBlock", "H1")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => formatText("formatBlock", "H2")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => formatText("formatBlock", "BLOCKQUOTE")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Blockquote"
          >
            Quote
          </button>
          <button
            onClick={() => formatText("formatBlock", "PRE")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Code"
          >
            Code
          </button>
          <button
            onClick={() => formatText("createLink", prompt("Enter URL"))}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Insert Link"
          >
            Link
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Attach file"
          >
            Attach
          </button>
          <select
            onChange={(e) => formatText("fontSize", e.target.value)}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            defaultValue=""
            title="Font Size"
          >
            <option value="" disabled>
              Size
            </option>
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
          </select>
          <select
            onChange={(e) => formatText("foreColor", e.target.value)}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            defaultValue=""
            title="Text Color"
          >
            <option value="" disabled>
              Color
            </option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
          <select
            onChange={(e) => formatText("backColor", e.target.value)}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            defaultValue=""
            title="Background Color"
          >
            <option value="" disabled>
              Bg
            </option>
            <option value="white">White</option>
            <option value="yellow">Yellow</option>
            <option value="lightblue">Light Blue</option>
          </select>
          <button
            onClick={() => formatText("justifyLeft")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Align Left"
          >
            ←
          </button>
          <button
            onClick={() => formatText("justifyCenter")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Align Center"
          >
            ↔
          </button>
          <button
            onClick={() => formatText("justifyRight")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Align Right"
          >
            →
          </button>
          <button
            onClick={() => formatText("superscript")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Superscript"
          >
            Sup
          </button>
          <button
            onClick={() => formatText("subscript")}
            className="px-2 py-1 hover:bg-gray-200 rounded"
            title="Subscript"
          >
            Sub
          </button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          className="w-full p-3 min-h-[100px] focus:outline-none"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          style={{ display: "none" }}
          accept="image/*,.pdf,.doc,.docx,.gif,.png"
        />
        {mentionPosition && filteredUsers.length > 0 && (
          <div
            className="absolute bg-white border rounded shadow-lg z-10 max-h-40 overflow-y-auto"
            style={{ top: mentionPosition.top, left: mentionPosition.left }}
          >
            {filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className={`px-4 py-2 cursor-pointer ${
                  index === selectedMentionIndex
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => insertMention(user.name.replace(" ", ""))}
              >
                {user.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default RichTextEditor;
