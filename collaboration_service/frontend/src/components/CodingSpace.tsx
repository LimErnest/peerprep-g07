import { useSearchParams } from "react-router-dom";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco"
import Editor from "@monaco-editor/react"

interface CodingSpaceProps {
    question: string;
}

export default function CodingSpace({ question }: CodingSpaceProps) {

    // Get roomID from URL
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get("roomId")

    // useEffect(() => {

    //     // this is if user enter /codingspace into the url without roomId
    //     if (!roomId) {
    //         console.log("No room ID provided in URL")
    //         return
    //     }

    //     // Create a new Y.Doc for this coding space
    //     const ydoc = new Y.Doc()

    //     // Connection to collaboration Server
    //     const provider = new WebsocketProvider(
    //         'ws://localhost:8080/yjs',
    //         roomId, 
    //         ydoc
    //     )

    //     // Create a shared text type in the Y.Doc for the Monaco editor
    //     const type = ydoc.getText('monaco')

    //     // Initialize Monaco editor
    //     const editor = monaco.editor.create(editorRef.current, {
    //         value: '',
    //         language: 'javascript',
    //         theme: 'vs-dark',
    //     }


    //     // Bind Monaco

    //     // Clean up when components unmounts, disconnect from the provider 
    //     // and destroy the Y.Doc
    //     return () => {
    //         provider.disconnect()
    //         ydoc.destroy()
    //     }
    // }, [roomId])

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
            <div>
                <h3>Question: {question}</h3>

                <p>Editor Space</p>
                <Editor
                    height="500px"
                    defaultLanguage="javascript"
                    defaultValue=""
                    theme="vs-dark"
                    onMount={(editor) => handleEditorMount(editor)}
                />
            </div>
        </>
    )
}
