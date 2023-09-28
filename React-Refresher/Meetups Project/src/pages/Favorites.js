import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import MeetupsList from "../components/Meetups/MeetupsList";
function Favorites() {
  const favoriteCtx = useContext(FavoritesContext);

  let content;

  if (favoriteCtx.favorites.length === 0) {
    content = (
      <p>You Got No Favorites, Start Adding Some Meetups To Your Favorites</p>
    );
  } else {
    content = <MeetupsList meetups={favoriteCtx.favorites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default Favorites;
