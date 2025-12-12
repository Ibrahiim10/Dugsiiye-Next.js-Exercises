export default function SSRTimePage() {
    const currentTime = new Date().toLocaleTimeString();
  
    return (
      <div>
        <h1>Server-Side Rendered Time</h1>
        <p>Current time: {currentTime}</p>
      </div>
    );
  }
  