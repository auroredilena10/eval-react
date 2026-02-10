import { useEffect, useState } from "react";
import { contract } from "@/lib/api";
import EditContract from "./editContract";
import { useNavigate, useParams } from "react-router-dom";


/**
 * EditContractContainer
 *
 * Loads an existing contract by URL `id`, pre-fills the edit form,
 * and submits updates to the API. Navigates back on success.
 *
 * Data flow:
 * - On mount/id change: fetches contract and seeds local form state.
 * - On submit: updates the contract and handles loading/error states.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function EditContractContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setError("");

        if (!id) {
          setError("Missing contract id");
          return;
        }

        const data = await contract.getById(id);

        // Prefill form fields with existing contract data
        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        setReward(data.reward ?? "");
      } catch {
        setError("Error while editing contract");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  // Submit updates
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");

      if (!id) {
        setError("Missing contract id");
        return;
      }

      setIsLoading(true);

      await contract.edit(id, { title, description, reward });

      // Go back to previous page after success
      navigate(-1);
    } catch {
      setError("Error while editing contract");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <EditContract
        title={title}
        description={description}
        reward={reward}
        onTitleChange={(e) => setTitle(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onRewardChange={(e) => setReward(e.target.value)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        />
    </>
  );
}
