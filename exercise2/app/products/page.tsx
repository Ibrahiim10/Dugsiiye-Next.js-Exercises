type Product = {
    id: number;
    title: string;
  };
  
export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/products");
  const data: { products: Product[] } = await res.json();
  
   
    return (
      <div>
        <h1>Products</h1>
  
      <ul>
        {data.products.slice(0, 5).map((product: Product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      </div>
    );
  }
  