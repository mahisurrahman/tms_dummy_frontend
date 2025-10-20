import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

const SimpleTextEditor = forwardRef(({ users, onChange, placeholder }, ref) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  useImperativeHandle(ref, () => ({
    clear: () => {
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
        onChange("");
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
  }));

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);

      // Handle tag suggestions
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cursorPos = range.startOffset;
        setCursorPosition(cursorPos);

        const text = editorRef.current.textContent;
        const lastWord = text.slice(0, cursorPos).split(/\s+/).pop();

        if (lastWord.startsWith("@")) {
          const searchTerm = lastWord.slice(1).toLowerCase();
          const filteredUsers = users.filter((user) =>
            user.username.toLowerCase().includes(searchTerm)
          );
          setSuggestions(filteredUsers);
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
      }
    }
  };

  const handleTagSelect = (user) => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const text = editorRef.current.textContent;
      const words = text.slice(0, cursorPosition).split(/\s+/);
      const lastWord = words.pop();
      const wordStart = text.lastIndexOf(lastWord, cursorPosition - 1);

      const beforeTag = content.slice(0, wordStart);
      const afterTag = content.slice(wordStart + lastWord.length);

      const tagSpan = `<span class="bg-blue-100 text-blue-800 px-1 rounded-sm" contenteditable="false">@${user.username}</span>&nbsp;`;
      editorRef.current.innerHTML = beforeTag + tagSpan + afterTag;

      onChange(editorRef.current.innerHTML);
      setShowSuggestions(false);

      // Restore cursor position after tag
      const range = document.createRange();
      const sel = window.getSelection();
      const newNode = editorRef.current.lastChild;
      range.setStart(newNode, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      editorRef.current.focus();
    }
  };

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

  return (
    <div className="border border-gray-200 rounded-lg relative">
      <Toolbar
        formatText={formatText}
        onFileAttach={() => fileInputRef.current?.click()}
      />

      <div
        ref={editorRef}
        contentEditable
        className="w-full p-3 min-h-[100px] focus:outline-none text-gray-800"
        onInput={handleInput}
        placeholder={placeholder}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-30 z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((user) => (
            <div
              key={user._id}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
              onClick={() => handleTagSelect(user)}
            >
              <span className="font-medium">@{user.username}</span>
              {user.name && (
                <span className="text-gray-500 ml-2">{user.name}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        style={{ display: "none" }}
        accept="image/*,.pdf,.doc,.docx,.gif,.png"
      />
    </div>
  );
});

const Toolbar = ({ formatText, onFileAttach }) => (
  <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b border-gray-200">
    <button
      onClick={() => formatText("bold")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Bold"
    >
      <strong>B</strong>
    </button>
    <button
      onClick={() => formatText("italic")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Italic"
    >
      <em>I</em>
    </button>
    <button
      onClick={() => formatText("underline")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Underline"
    >
      <u>U</u>
    </button>
    <button
      onClick={() => formatText("strikethrough")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Strikethrough"
    >
      <s>S</s>
    </button>
    <button
      onClick={() => formatText("formatBlock", "BLOCKQUOTE")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Blockquote"
    >
      Quote
    </button>
    <button
      onClick={() => formatText("formatBlock", "PRE")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Code"
    >
      Code
    </button>
    <button
      onClick={() => formatText("createLink", prompt("Enter URL"))}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Insert Link"
    >
      Link
    </button>
    <button
      onClick={onFileAttach}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Attach file"
    >
      Attach
    </button>
    <select
      onChange={(e) => formatText("fontSize", e.target.value)}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
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
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
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
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
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
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Align Left"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 29 24"
      >
        <path
          fill="#000000"
          d="M1.334 2.666h26.665l.037.001a1.334 1.334 0 1 0 0-2.668L27.997 0h.002H1.334a1.334 1.334 0 0 0-.002 2.666h.002zm0 5.333h19.555l.037.001a1.334 1.334 0 1 0 0-2.668l-.039.001h.002H1.334a1.334 1.334 0 0 0-.002 2.666h.002zm26.665 2.668H1.334a1.334 1.334 0 0 0-.002 2.666h26.667a1.334 1.334 0 0 0 .002-2.666zm0 10.666H1.334a1.334 1.334 0 0 0-.002 2.666h26.667a1.334 1.334 0 0 0 .002-2.666zM1.334 18.666h19.555A1.334 1.334 0 0 0 20.891 16H1.334a1.334 1.334 0 0 0-.002 2.666z"
        />
      </svg>
    </button>
    <button
      onClick={() => formatText("justifyCenter")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Align Center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 29 24"
      >
        <path
          fill="#000000"
          d="M1.334 2.666h26.665l.037.001a1.334 1.334 0 1 0 0-2.668L27.997 0h.002H1.334a1.334 1.334 0 0 0-.002 2.666h.002zm3.555 2.667l-.037-.001a1.334 1.334 0 1 0 0 2.668l.039-.001h-.002h19.555a1.334 1.334 0 0 0 .002-2.666h-.002zm23.11 5.334H1.334a1.334 1.334 0 0 0-.002 2.666h26.667a1.334 1.334 0 0 0 .002-2.666zm0 10.666H1.334a1.334 1.334 0 0 0-.002 2.666h26.667a1.334 1.334 0 0 0 .002-2.666zm-3.555-2.667A1.334 1.334 0 0 0 24.446 16H4.889a1.334 1.334 0 0 0-.002 2.666h.002z"
        />
      </svg>
    </button>
    <button
      onClick={() => formatText("justifyRight")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Align Right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 29 24"
      >
        <path
          fill="#000000"
          d="M27.999 21.333H1.334a1.334 1.334 0 0 0-.002 2.666h26.667a1.334 1.334 0 0 0 .002-2.666zm0-5.333H8.444a1.334 1.334 0 0 0-.002 2.666h19.557A1.334 1.334 0 0 0 28.001 16zm0-5.333H1.334a1.334 1.334 0 0 0-.002 2.666h26.667a1.334 1.334 0 0 0 .002-2.666zM1.334 2.666h26.665l.037.001a1.334 1.334 0 1 0 0-2.668L27.997 0h.002H1.334a1.334 1.334 0 0 0-.002 2.666h.002zm26.665 2.667H8.444l-.037-.001a1.334 1.334 0 1 0 0 2.668l.039-.001h-.002h19.555a1.334 1.334 0 0 0 .002-2.666z"
        />
      </svg>
    </button>
    <button
      onClick={() => formatText("superscript")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Superscript"
    >
      Sup
    </button>
    <button
      onClick={() => formatText("subscript")}
      className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
      title="Subscript"
    >
      Sub
    </button>
  </div>
);

export default SimpleTextEditor;
