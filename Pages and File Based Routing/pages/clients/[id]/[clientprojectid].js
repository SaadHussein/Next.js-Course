import { useRouter } from "next/router";

function SelectedClientProjectsPage() {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <h1>SelectedClientProjectsPage</h1>
    </div>
  );
}

export default SelectedClientProjectsPage;
