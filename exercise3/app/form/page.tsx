import { redirect } from "next/navigation";

export default function BasicFormPage() {
  // Server Action
  async function handleSubmit(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    // Server-side validation
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    console.log("Email:", email, "Password:", password);

    redirect("/form/success");
  }

  return (
    <form action={handleSubmit} className="space-y-4 p-4 border rounded">
      <h1 className="text-xl font-bold">Basic Form</h1>

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        className="border p-2 w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        required
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
