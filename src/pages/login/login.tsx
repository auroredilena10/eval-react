import { Button } from "@/components/ui/button/button";

export default function LoginWitcher({
  witchers,
  selectedId,
  onSelectedChange,
  onSubmit,
  isLoading,
  error,
}) {
  if (isLoading) return <p>Loading witchers...</p>;

  return (
    <div>
      <h1>Login as a Witcher</h1>
      {error && <p>{error}</p>}

      <form onSubmit={onSubmit}>
        <label>Choose a witcher</label>
        <select value={selectedId} onChange={onSelectedChange}>
          <option value="">-- Select --</option>
          {witchers.map((w: any) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
