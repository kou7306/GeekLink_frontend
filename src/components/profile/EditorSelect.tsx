// components/profile/EditorSelect.tsx
import React from "react";
import { editors } from "./options";

interface EditorSelectProps {
  editor?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditorSelect: React.FC<EditorSelectProps> = ({ editor, onChange }) => {
  return (
    <div>
      <label htmlFor="editor" className="block text-sm font-medium text-gray-700">
        好きなエディター
      </label>
      <select name="editor" value={editor} onChange={onChange} className="mt-1 block w-full">
        <option value="">選択してください</option>
        {editors.map((editor) => (
          <option key={editor} value={editor}>
            {editor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditorSelect;
