import { useState } from "react";
import { contract } from "@/lib/api";
import CreateContract from "./createContract";
import { useNavigate } from "react-router-dom";


export default function CreateContractContainer() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [reward, setReward] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        setError("");
        setIsLoading(true);

        await contract.create({
        title,
        description,
        reward,
        });

        // Go back to previous page after success
        navigate(-1);
    } catch (error) {
        setError("Error while creating contract");
    } finally {
        setIsLoading(false);
    }
}
return (
  <>
  <CreateContract
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