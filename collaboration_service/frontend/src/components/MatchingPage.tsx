import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface MatchingPageProps {
    setQuestion: (question: string) => void
}

export default function MatchingPage({ setQuestion }: MatchingPageProps) {

    const navigate = useNavigate()
    const [isFindingMatch, setIsFindingMatch] = useState(false)
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [text, setText] = useState("")

    // Creates a new WebSocket connection when the page loads
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => console.log("WebSocket connected"); 
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.type === "match_found") {
                console.log("Match found, room ID: ", data.roomId)
                console.log("Matched with another user!")
                setQuestion(data.question)
                navigate(`/codingspace?roomId=${data.roomId}}`)
            }
        }
        setWs(socket)

        return () => socket.close()

    }, [])

    const handleFindMatch = () => {
        if (!ws || !text) {
            console.log("WebSocket not connected or text is empty")
            return
        }

        ws.send(JSON.stringify({ type: "find_match", text }))
        setIsFindingMatch(!isFindingMatch)
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='enter the room code'
                />
                <button onClick={() => handleFindMatch()}>
                    {isFindingMatch ? "Finding Match..." : "Find Match"}
                </button>
            </div>
        </>
    )
}
