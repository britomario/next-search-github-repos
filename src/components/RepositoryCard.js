export default function RepositoryCard({ repo }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-blue-600">
        <img
          src={repo.owner.avatar_url}
          alt="Imagem de perfil do GitHub."
          aria-label="Foto de perfil no GitHub."
        />
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </h2>
      <p className="text-gray-700 mt-2">{repo.description || "Sem descrição."}</p>
      <div className="flex justify-between mt-3 text-sm text-gray-600">
        <span>⭐ {repo.stargazeners_count}</span>
        <span>{repo.language || "N/A"}</span>
      </div>
    </div>
  );
}
