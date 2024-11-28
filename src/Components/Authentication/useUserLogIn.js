import { useNavigate } from "react-router-dom";
import Parse from "parse";
import { useUserStore } from "../UserData/useUserStore";

export default function useUserLogIn() {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const userLogIn = async (username, password) => {
    try {
      const loggedInUser = await Parse.User.logIn(username, password);
      console.log(
        `Success! User ${loggedInUser.get(
          "username"
        )} has successfully signed in!`
      );
      userStore.setIsLoadingTrue();
      userStore.fetchUserInfo(loggedInUser.id);
      navigate("/chatpage");
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return { userLogIn };
}
