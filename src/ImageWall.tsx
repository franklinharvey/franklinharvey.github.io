import { ReactElement, useCallback, useEffect, useState } from "react";

import InstagramLogo from "./InstaLogoWhite.png";
import YouTubeLogo from "./YouTubeLogo.png";
import { throttle } from "radash";

function ImageWall(): ReactElement {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeImage, setActiveImage] = useState(1);

  let imgMap = [];
  const imgLen = 17;

  for (let i = 1; i <= imgLen; i++) {
    const img = (
      <img
        id={i.toString()}
        key={`id-${i}`}
        src={
          process.env.PUBLIC_URL +
          `/pics/img-${i.toString().padStart(2, "0")}.jpg`
        }
        alt=""
        className={
          i === activeImage
            ? `active bg-img img-${i.toString()}`
            : "not-active bg-img"
        }
      ></img>
    );
    imgMap.push(img);
  }

  const propogateMouseMovement = () => {
    setActiveImage((i) => {
      if (i % imgLen === 0 || i + 1 > imgLen) {
        return 1;
      }
      return i + 1;
    });
  };

  function getOS() {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
      iosPlatforms = ["iPhone", "iPad", "iPod"],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (/Linux/.test(platform)) {
      os = "Linux";
    }

    return os;
  }

  useEffect(() => {
    setTimeout(() => setLoadingProgress(7), 100);
    setTimeout(() => setLoadingProgress(25), 300);
    setTimeout(() => setLoadingProgress(37), 500);
    setTimeout(() => setLoadingProgress(69), 700);
    setTimeout(() => setLoadingProgress(83), 900);
    setTimeout(() => setLoadingProgress(100), 1100);
  }, []);

  const throttledMouseEvent = useCallback(
    throttle({ interval: 500 }, () => propogateMouseMovement()),
    []
  );

  return (
    <>
      {loadingProgress === 100 ? (
        <div
          onMouseMove={throttledMouseEvent}
          onTouchMove={throttledMouseEvent}
          style={{ height: "100vh", width: "100vw", display: "flex" }}
        >
          <p
            style={{
              position: "absolute",
              fontSize: 20,
              marginTop: "2vh",
              marginLeft: "2vw",
            }}
          >
            FRANKLIN HARVEY
          </p>

          <a
            href={
              getOS() === "iOS"
                ? "instagram://user?username={frnkfrnk69}"
                : "https://instagram.com/frnkfrnk69"
            }
            rel="noopener noreferrer"
            target="_blank"
            className="logo-link instagram"
          >
            <img
              src={InstagramLogo}
              alt="instagram"
              className="logo-link instagram"
            ></img>
          </a>
          <div
            style={{
              position: "absolute",
              width: "100%",
              lineHeight: "150vh",
              verticalAlign: "bottom",
              mixBlendMode: "hard-light",
              color: "white",
              fontSize: "2rem",
            }}
          >
            <b>{activeImage} / 📷</b>
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {imgMap}
          </div>
        </div>
      ) : (
        <div>
          <h1 style={{ margin: 0 }}>FRANKLIN HARVEY</h1>
          <div style={{ textAlign: "right" }}>{loadingProgress}</div>
        </div>
      )}
    </>
  );
}

export default ImageWall;
