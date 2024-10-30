import { useEffect } from "react";

const useNavbarScroll = (navbarId, click = null, closeMenu = null) => {
  useEffect(() => {
    const navbar = document.getElementById(navbarId);

    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        navbar.style.top = "0"; // Scrolling up
      } else {
        if (click && closeMenu) {
          closeMenu(); // Close menu if mobile navbar is open
        }
        navbar.style.top = "-110px"; // Scrolling down
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarId, click, closeMenu]); // Add dependencies
};

export default useNavbarScroll;
