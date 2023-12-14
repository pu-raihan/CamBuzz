export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      loginbg: "#be959b",
      btnlight: "#fbcfe6",
      bg1: "#fff",
      dbg1: "#1d1a25",
      bg2: "#eedde9",
      dbg2: "#5c1134",
      bg3: "#ebd1d1",
      dbg3: "#4d1731",
      bg4: "#53102f",
      dbg4: "#531336",
      bgInv: "#1a0711",
      bgGrey: "#fcfcfc",
      dbgGrey: "#201f22",
      bgTrans: "#360913b8",
      dbgTrans: "#360c1eb8",
      bgSoft: "#eee4e8",
      dbgSoft: "#3e3a3a",
      btn: "#532341",
      dbtn: "#801547",
      btn2: "#761a51",
      dbtn2: "#761a51",
      btnred: "#ca1919",
      dbtnred: "#830f0f",
      border1: "#d3d3d3",
      dborder1: "#444",
    },
    screens: {
      xs: "480px",
    },
    animation: {
      openL: "openL 0.1s linear forwards",
      closeL: "closeL 0.1s linear forwards",
      openIcons: "openIcons 0.1s linear",
      closeIcons: "closeIcons 0.1s linear",
      wiggle: "wiggle 300ms ease-in-out",
    },
    keyframes: {
      openL: {
        "0%": { width: "0px", display: "flex" },
        "50%": { width: "40px", display: "flex" },
        "100%": { width: "76px", display: "flex" },
      },
      closeL: {
        "0%": { width: "76px", display: "flex" },
        "50%": { width: "40px", display: "flex" },
        "100%": { width: "0px", display: "none" },
      },
      openIcons: {
        "0%": { display: "none" },
        "90%": { display: "none" },
        "100%": { display: "block" },
      },
      closeIcons: {
        "0%": { display: "block" },
        "10%": { display: "none" },
        "100%": { display: "none" },
      },
      wiggle: {
        "0%, 100%": { transform: "rotate(-15deg)" },
        "50%": { transform: "rotate(15deg)" }
      },
    },
    fontSize: {
      xxs: "0.5rem",
    },
    flex: {
      2: "2 2 0%",
      3: "3 3 0%",
      4: "4 4 0%",
      5: "5 5 0%",
      6: "6 6 0%",
      7: "7 7 0%",
    },
    zIndex: {
      998: "998",
      999: "999",
    },
  },
};
export const plugins = [];
export const darkMode = ["class"];