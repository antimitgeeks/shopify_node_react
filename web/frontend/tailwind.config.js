/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 1s linear infinite",
        Authmarquee: "marquee 10s linear infinite",
        glowup: "glowup 1.9s linear infinite",
        modalOpen: "modalOpen 0.5s ease-out",
        modalClose: "modalClose .8s linear",
        activeTop: "activeTop 600ms linear",
        deactivebottom: "deactivebottom 600ms linear",
        prevOpen: "prevOpen 0.2s ease-out",
        readMore: "readMore 0.3s linear",
        readLess: "readLess 0.2s linear",
        // imgsldrAnimationOne:"imgsldrAnimationOne 1s linear 4s infinite",
        // imgsldrAnimationTwo:"imgsldrAnimationTwo 1s linear 4s infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        // imgsldrAnimationTwo: {
        //   "0%": { transform: "translateX(0)" },
        //   "100%": { transform: "translateX(-265px)" },
        // },
        // imgsldrAnimationOne:{
        //     "0%": { transform: "translateX(265px)" },
        //     "100%": { transform: "translateX(0)" },
        // },
        glowup: {
          0: { transform: "scale(1)" },
          "50%": { transform: "scale(1.07)" },
          "100%": { transform: "scale(1)" },
        },
        modalOpen: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "25%": { opacity: "0.4", transform: "translateX(75%)" },
          "50%": { opacity: "0.5", transform: "translateX(50%)" },
          "60%": { opacity: "0.6", transform: "translateX(40%)" },
          "70%": { opacity: "0.7", transform: "translateX(30%)" },
          "80%": { opacity: "0.8", transform: "translateX(20%)" },
          "90%": { opacity: "0.9", transform: "translateX(10%)" },
          "100%": { opacity: "1", transform: "translateX(0%)" },
        },
        modalClose: {
          "0%": { opacity: "1", transform: "translateX(0%)" },
          "10%": { opacity: ".9", transform: "translateX(10%)" },
          "20%": { opacity: ".8", transform: "translateX(20%)" },
          "30%": { opacity: ".7", transform: "translateX(30%)" },
          "40%": { opacity: ".6", transform: "translateX(40%)" },
          "50%": { opacity: ".5", transform: "translateX(50%)" },
          "60%": { opacity: ".4", transform: "translateX(60%)" },
          "70%": { opacity: ".3", transform: "translateX(70%)" },
          "80%": { opacity: ".2", transform: "translateX(80%)" },
          "90%": { opacity: ".2", transform: "translateX(90%)" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
        activeTop: {
          "0%": { opacity: "0", transform: "translateY(+110%)" },
          "100%": { opacity: "1", transform: "translateY(0%)" },
        },
        deactivebottom: {
          "0%": { opacity: "1", transform: "translateY(0%)" },
          "100%": { opacity: "0", transform: "translateY(+110%)" },
        },
        prevOpen: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "75%": { opacity: "0.7" },
          "100%": { opacity: "1" },
        },
        readMore: {
            "0%": { height: "20px" },
            "20%": { height: "40px" },
            "40%": { height: "60px" },
            "60%": { height: "80px" },
            "80%": { height: "100px" },
            "100%": { height: "fitContent"},
        },
        readLess: {
            "0%": { height: "120px" },
            "20%": { height: "100px" },
            "40%": { height: "80px" },
            "60%": { height: "60px" },
            "80%": { height: "40px" },
            "100%": { height: "20px"},
        },
      },
      fontFamily: {
        appFont: ['"Manrope", sans-serif'],
        appContent: ['"Poppins", sans-serif'],
      },
      colors: {
        appText: "#1e1e2f",
      },
      backgroundColor: {
        buttonBg: "rgb(221, 241, 134)",
      },
      fontSize: {
        mainHeading: "22px",
        heading: "18px",
        subHeading: "16px",
        paragraph: "14px",
        text: "12",
      },
      fontWeight: {},
      Authmarquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
  },
  plugins: [],
};
