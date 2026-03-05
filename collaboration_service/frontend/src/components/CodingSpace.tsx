import { useSearchParams } from "react-router-dom";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco"
import Editor from "@monaco-editor/react"

interface CodingSpaceProps {
    question: string;
    programmingLanguage: string;
}

export default function CodingSpace({ question, programmingLanguage }: CodingSpaceProps) {

    // Get roomID from URL
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get("roomId")

    const handleEditorMount = (editor: any) => {
        if (!roomId) return

        // 1. Create Yjs doc
        const ydoc = new Y.Doc()

        // 2. Connect to Yjs server
        const provider = new WebsocketProvider(
            "ws://localhost:8080/yjs",
            roomId,
            ydoc
        )

        // 3. Create shared text
        const yText = ydoc.getText("monaco")

        // 4. Bind Monaco editor to Yjs
        const binding = new MonacoBinding(
            yText,
            editor.getModel(),
            new Set([editor])
        )

        // 5. Cleanup when component unmounts
        editor.onDidDispose(() => {
            binding.destroy()
            provider.destroy()
            ydoc.destroy()
        })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h5>Question: {question}</h5>
                    
                <p>Language: {programmingLanguage}</p>

                <Editor
                    height="500px"
                    defaultLanguage={programmingLanguage}
                    defaultValue=""
                    theme="vs-dark"
                    onMount={(editor) => handleEditorMount(editor)}
                />
            </div>
        </>
    )
}
