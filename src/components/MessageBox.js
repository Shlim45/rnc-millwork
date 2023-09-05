export default function MessageBox({ message = null }) {

    return (
        <div style={{ height: "100px", fontSize: "1rem", textAlign: "center" }}>
            {message && <span style={message?.success ? { color: "lightgreen" } : { color: "red" }}>{message.message}</span>}
        </div>
    );
}
