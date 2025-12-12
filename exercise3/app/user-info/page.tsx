"use client"
import { useState } from "react";
// import { experimental_useFormStatus as useFormStatus } from "react-dom/server";

export default function FullNameForm() {
  const [greeting, setGreeting] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {

    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";

    // validation 
    if (!firstName || !lastName) {
      throw new Error("Both first name and last name are required");
    }

    // Return a greeting
    return `Hello, ${firstName} ${lastName}!`;
  }

  return (
    <form
      action={async (formData) => {
        const message = await handleSubmit(formData);
        setGreeting(message);
      }}
      className="space-y-4 p-4 border rounded w-96"
    >
      <h1 className="text-xl font-bold">Full Name Greeting</h1>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        required
        className="border p-2 w-full"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        required
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {greeting && <p className="mt-2 text-green-700 font-semibold">{greeting}</p>}
    </form>
  );
}
