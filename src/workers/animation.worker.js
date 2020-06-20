import lottie from "lottie-web";

export default async function lottieAnimationLoader(
  id,
  animationData,
  animationOptions
) {
  if (!document) {
    return null;
  }

  const container = document.getElementById(id);

  if (!container) {
    return null;
  }

  return lottie.loadAnimation({
    animationData,
    autoplay: true,
    container,
    loop: false,
    renderer: `svg`,
    ...animationOptions
  });
}
