import Link from "next/link";

function ClientsPage() {
  const Clients = [
    { id: "saad", name: "Saad" },
    { id: "max", name: "Max" },
  ];

  return (
    <div>
      <h1>ClientsPage</h1>
      <ul>
        {Clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
