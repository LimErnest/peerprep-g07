interface CodingSpaceProps {
    question: string;
}

export default function CodingSpace({ question }: CodingSpaceProps) {
    return (
        <>
        <div>
            <h3>Question: {question}</h3>

            <p>Editor Space</p>
            
        </div>
        </>
    )
}
