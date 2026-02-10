import { useEffect, useState } from "react";
import { contract } from "@/lib/api";
import Contracts from "./contracts";

export default function ContractsContainer() {
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await contract.getAll();
        setContracts(data);
      } catch {
        setError("Error while fetching contracts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []);

  return (
    <Contracts
      contracts={contracts}
      isLoading={isLoading}
      error={error}
    />
  );
}
