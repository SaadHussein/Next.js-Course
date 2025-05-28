// import { unstable_noStore } from "next/cache";

import Messages from "@/components/messages";
import { getMessages } from "@/lib/messages";

// export const revalidate = 5; //this will revalidate the page every 5 seconds
// export const dynamic = "force-dynamic"; // this will force the page to be dynamic and not cached --- this disable full route caching

export default async function MessagesPage() {
  // unstable_noStore(); //this will prevent caching of the page
  // const response = await fetch("http://localhost:8080/messages", {
  //   next: {
  //     tags: ["msg"], // this will tag the response so that it can be revalidated when a new message is added
  //   },
  // });
  // const messages = await response.json();
  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
