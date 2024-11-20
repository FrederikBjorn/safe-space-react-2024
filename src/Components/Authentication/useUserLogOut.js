import Parse from "parse";
import { useUserStore } from "../UserData/useUserStore";
import { useNavigate } from "react-router-dom";

export const useUserLogOut = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const userLogOut = async () => {
    try {
      userStore.setIsLoadingTrue();
      navigate("/");
      await Parse.User.logOut();
      const user = Parse.User.current();
      if (user === null) {
        console.log("Success! No user is logged in anymore!");
      }
      userStore.fetchUserInfo(user);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return { userLogOut };
};
