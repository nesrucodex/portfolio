// Crosshair "+" marks at the four corners of a relative container.
// Place inside a `relative` element. Pure markup, no client JS.
export default function Corners() {
  return (
    <>
      <span className="cross -left-[5px] -top-[5px]" aria-hidden />
      <span className="cross -right-[5px] -top-[5px]" aria-hidden />
      <span className="cross -bottom-[5px] -left-[5px]" aria-hidden />
      <span className="cross -bottom-[5px] -right-[5px]" aria-hidden />
    </>
  );
}
