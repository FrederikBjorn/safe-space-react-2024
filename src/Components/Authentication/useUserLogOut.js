import Parse from "parse";
import { useUserStore } from "../UserData/useUserStore";
import { useNavigate } from "react-router-dom";
import { simpleErrorToast } from "../Utils/toastUtils";

export const useUserLogOut = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const userLogOut = async () => {
    try {
      userStore.setIsLoadingTrue();
      navigate("/");
      await Parse.User.logOut();
      const user = Parse.User.current();
      userStore.fetchUserInfo(user);
      return true;
    } catch (error) {
      simpleErrorToast(`Logout unsucsessful - ${error.message}`);
      return false;
    }
  };

  return { userLogOut };
};
