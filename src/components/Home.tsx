import small from "/src/assets/img/small-logo.png";

export function Home() {
  return (
    <div className="min-w-full p-20 flex flex-col justify-end items-end">
      <p className="text-right text-5xl">
        THE <br />
        HOUSE
        <br /> OF RACING <br />
        EVENTS.
      </p>
      <img src={small} className="w-[140px]"/>
    </div>
  );
}
