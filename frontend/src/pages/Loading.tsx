import { logo } from "@/data";

function Loading({height="screen"}) {
  return (
    <div className={`h-${height} flex flex-col items-center justify-center`}>
      <img
        src={logo}
        alt="Logo"
        className="w-12 h-12 animate-spin"
      />
      <h3 className="font-semibold text-lg ">Loading...</h3>
    </div>
  );
}

export default Loading;
