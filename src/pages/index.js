import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SearchInput from "../components/SearchInput";
import RepositoryCard from "@/components/RepositoryCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home () {
    const [query, setQuery] = useState("")
    const [debouncedQuery] = useDebounce(query, 500);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);   
    
    useEffect(() => {
      if (!debouncedQuery) return;

      const fetchRepos = async () => {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(
            `https://api.github.com/search/repositories?q=${encodeURIComponent(
              debouncedQuery
            )}&per_page=10`
          );

          if (!res.ok) {
            throw new Error(
              res.status === 403
                ? "Limite da API atingido."
                : "Erro ao buscar repositórios."
            );
          }

          const { items } = await res.json();

          if (!items?.length) {
            setRepos([]);
            setError("Nenhum repositório encontrado.");
          } else {
            setRepos(items);
            setError("");
            console.log("Repositórios:", items);
          }
        } catch (err) {
          setRepos([]);
          setError(err.message);
          console.error("Erro:", err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchRepos();
    }, [debouncedQuery]);

    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Buscar Repositórios GitHub</h1>
        <SearchInput query={query} setQuery={setQuery} />
        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="grid gap-4 mt-6">
          {repos.map(repo => (
            <RepositoryCard key={repo.id} repo={repo}/>
          ))}
        </div>

        {loading && <LoadingSpinner />}

      </main>
    );
}