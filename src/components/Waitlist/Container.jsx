import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import { createClient } from "@supabase/supabase-js";

// Set up Supabase client
const supabase = createClient(
  "https://your-project-url.supabase.co",
  "your-public-anon-key"
);

function App() {
  const [showModal, setShowModal] = useState(false);

  const addToWaitlist = async (data) => {
    // Insert user data into Supabase
    const { error } = await supabase
      .from("waitlist")
      .insert([{ name: data.name, email: data.email }]);

    if (error) {
      console.log("Error adding to waitlist:", error);
    } else {
      console.log("Added to waitlist:", data);
    }
  };

  return (
    <div className="App">
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-xl">My App</h1>
        <button
          className="bg-blue-500 px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Join Waitlist
        </button>
      </nav>

      {/* Show Modal when triggered */}
      <WaitlistModal
        showModal={showModal}
        setShowModal={setShowModal}
        addToWaitlist={addToWaitlist}
      />
    </div>
  );
}

export default App;
