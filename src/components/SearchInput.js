export default function SearchInput ({ query, setQuery }) {
    return (
        <input
            type="text"
            placeholder="Busque repositórios no GitHub..."
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Campo de busca de repositórios"
        />
    )
}