gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksReversed = gsap.utils.toArray(".main-nav a").reverse();

  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", () => {
      link.classList.add("animate-out");
    });

    link.ontransitionend = () => {
      link.classList.remove("animate-out");
    };
  });

  const navAnimation = (direction) => {
    const scrollingDown = direction === 1;

    const links = scrollingDown ? mainNavLinks : mainNavLinksReversed;

    return gsap.to(links, {
      y: scrollingDown ? 20 : 0,
      opacity: scrollingDown ? 0 : 1,
      stagger: 0.05,
      ease: "power4.out",
    });
  };

  ScrollTrigger.create({
    start: 100,
    end: "bottom bottom-=20", // offset to make sure the scroll animation is always active on the page
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    markers: true,
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
  });
}

function initHeaderTilt() {
  const header = document.querySelector("header");
  header.addEventListener("mousemove", (e) => {
    const {
      offsetX,
      offsetY,
      target: { clientHeight, clientWidth },
    } = e;

    const xPos = offsetX / clientWidth - 0.5;
    const yPos = offsetY / clientHeight - 0.5;

    const modifier = (index) => index * 1.2 + 0.5;

    const leftImages = gsap.utils.toArray(".hg__left .hg__image");

    leftImages.forEach((image, index) => {
      return gsap.to(image, {
        x: xPos * 30 * modifier(index),
        y: yPos * 10 * modifier(index),
        rotationX: yPos * 20,
        rotationY: xPos * 40,
        ease: "power3.out",
      });
    });

    const rightImages = gsap.utils.toArray(".hg__right .hg__image");

    rightImages.forEach((image, index) => {
      return gsap.to(image, {
        x: xPos * 30 * modifier(index),
        y: yPos * 10 * modifier(index),
        rotationX: yPos * 20,
        rotationY: xPos * 40,
        ease: "power3.out",
      });
    });

    gsap.to(".decor__circle", {
      duration: 1.2,
      x: xPos * 100,
      y: yPos * 120,
      ease: "power4.out",
    });

    console.log(xPos, yPos);
  });
}

function init() {
  // start here
  initNavigation();
  initHeaderTilt();
}

window.addEventListener("load", function () {
  init();
});
