import { useHistory } from "react-router-dom";
import NewMeetupForm from "../components/Meetups/NewMeetupForm";

function NewMeetup() {
  const history = useHistory();
  const addMeetupHandler = (meetupData) => {
    fetch(
      "https://react-refresher-ccbf8-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      history.replace("/");
    });
  };

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetup;
