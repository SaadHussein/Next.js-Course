import { useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: "Signing UP!",
      message: "Registering For a NewsLetter",
      status: "pending",
    });

    const enteredEmail = emailInputRef.current.value;

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something Went Wrong!");
        });
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: "Success!",
          message: "Registering For a NewsLetter Successeded!",
          status: "success",
        })
      )
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something Went Wrong!",
          status: "error",
        });
      });

    emailInputRef.current.value = "";
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
