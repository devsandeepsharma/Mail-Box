import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./emaileditor.css";
import "./preview.css";

const EmailEditorPreview = () => {
    const rawContent = {
        blocks: [
            { key: "1", text: "Subject: Quick Update 🚀", type: "unstyled" },
            { key: "2", text: "", type: "unstyled" },
            { key: "3", text: "Hey 👋,", type: "unstyled" },
            { key: "4", text: "Just wrapped up the new email composer — it’s live now!", type: "unstyled" },
            { key: "5", text: "Give it a try and let me know what you think. ✨", type: "unstyled" },
            { key: "6", text: "", type: "unstyled" },
            { key: "7", text: "Cheers,", type: "unstyled" },
            { key: "8", text: "— Mail Box Team 💌", type: "unstyled" },
        ],
        entityMap: {},
    };

    const contentState = convertFromRaw(rawContent);
    const editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentState.getBlocksAsArray()));

    return (
        <div className="editor-preview-container">
            <h2 className="preview-title">Professional Emails, Made Effortless</h2>
            <p className="preview-subtitle">Here's a live preview of your writing experience:</p>
            <div className="preview-card">
                <Editor
                    editorState={editorState}
                    readOnly
                    toolbarHidden
                    wrapperClassName="email-editor-wrapper"
                    editorClassName="email-editor-body"
                />
            </div>
        </div>
    );
};

export default EmailEditorPreview;