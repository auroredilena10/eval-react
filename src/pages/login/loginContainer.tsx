import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { witcher } from "@/lib/api";
import { setCurrentWitcher } from "@/lib/authWitcher";
import Login from "./login";

export default function LoginContainer() {
  const navigate = useNavigate();

  const [witchers, setWitchers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWitchers = async () => {
      try {
        const data = await witcher.getAll();
        setWitchers(data);
      } catch {
        setError("Error while fetching witchers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWitchers();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const chosen = witchers.find((w: any) => String(w.id) === String(selectedId));
    if (!chosen) {
      setError("Please select a witcher");
      return;
    }

    // Save in sessionStorage (tab lifetime)
    setCurrentWitcher({ id: String(chosen.id), name: chosen.name });

    // Go to contracts list after login
    navigate("/contracts");
  };

  return (
    <Login
      witchers={witchers}
      selectedId={selectedId}
      onSelectedChange={(e) => setSelectedId(e.target.value)}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}
