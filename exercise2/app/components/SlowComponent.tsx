export default async function SlowComponent() {
    // Wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));
  
    return <p>Content loaded after 3 seconds!</p>;
  }
  