import { useShallow } from "zustand/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../stores";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <WhiteBears />
        <PandaBears />
        <BearsDisplay />
      </div>
    </>
  );
};

export const BlackBears = () => {
  const increaseBears = useBearStore((state) => state.increaseBears);
  const blackBears = useBearStore((state) => state.blackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBears("blackBears",+1)}>+1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBears("blackBears",-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};
export const WhiteBears = () => {
  const increaseBears = useBearStore((state) => state.increaseBears);
  const polarBears = useBearStore((state) => state.polarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBears("polarBears",+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears}</span>
        <button onClick={() => increaseBears("polarBears",-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PandaBears = () => {
  const increaseBears = useBearStore((state) => state.increaseBears);
  const pandaBears = useBearStore((state) => state.pandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBears("pandaBears", +1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increaseBears("pandaBears",-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  const bears = useBearStore(useShallow((state) => state.bears));
  const doNothing = useBearStore((state) => state.doNothing);
  const addBear = useBearStore((state) => state.addBear);
  const clearBear = useBearStore((state)=> state.clearBear); 

  return (
    <WhiteCard>
      <h1>Osos</h1>
      <button onClick={doNothing}>Do Nothing</button>
      <button className="mt-2" onClick={addBear}>Agregar Oso</button>
      <button className="mt-2" onClick={clearBear}>Borrar Osos</button>

      <pre>
        {JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};
