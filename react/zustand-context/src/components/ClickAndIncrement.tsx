import { useSampleStore } from "../hooks/useSampleStore"

export const ClickAndIncrement = () => {
  const { count, increment } = useSampleStore((state) => ( { count: state.count, increment: state.increment } ));

  return (
    <>
      <button onClick={increment}>CLICK ME!!!!</button>
      <p>{count}</p>
    </>
  )
}
