import { useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./emaileditor.css";

const EmailEditor = ({ editorState, setEditorState, onChange }) => {

    useEffect(() => {
        const raw = convertToRaw(editorState.getCurrentContent());
        const html = draftToHtml(raw);
        onChange(html);
    }, [editorState, onChange]);

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="email-editor-wrapper"
            editorClassName="email-editor-body"
            toolbarClassName="email-editor-toolbar"
            toolbar={{
                options: [
                    "blockType",
                    "fontSize",
                    "inline",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "emoji",
                    "history",
                ],
            }}
        />
    )
}

export default EmailEditor;