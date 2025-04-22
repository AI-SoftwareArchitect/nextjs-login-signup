import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // burada API çağrısı yapabiliriz
    console.log(name, email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-96 space-y-4 p-8 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded-md"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
