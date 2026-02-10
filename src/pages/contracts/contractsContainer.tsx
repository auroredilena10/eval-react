import { useEffect, useState } from "react";
import { contract } from "@/lib/api";
import Contracts from "./contracts";

export default function ContractsContainer() {
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

// Filters state
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        //query parameters based on filters
        const data = await contract.getAll({ title, status });
        setContracts(data);
      } catch {
        setError("Error while fetching contracts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [title, status]);

  return (
    //pass values to ui 
    <Contracts
      contracts={contracts}
      isLoading={isLoading}
      error={error}
      title={title}
      status={status}
      onTitleChange={(e) => setTitle(e.target.value)}
      onStatusChange={(e) => setStatus(e.target.value)}
    />
  );
}
