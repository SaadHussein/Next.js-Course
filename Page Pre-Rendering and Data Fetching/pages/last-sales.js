import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://react-http-66618-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedData = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedData);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://react-http-66618-default-rtdb.firebaseio.com/sales.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedData = [];

  //       for (const key in data) {
  //         transformedData.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(transformedData);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed To Load Sales.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  console.log(data);

  return (
    <ul>
      {sales.map((item) => (
        <li key={item.id}>
          <p>{item.username}</p>
          <p>{item.volume}</p>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://react-http-66618-default-rtdb.firebaseio.com/sales.json"
  );

  const data = await response.json();

  const transformedData = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: { sales: transformedData },
    revalidate: 10,
  };
}

export default LastSalesPage;
