import { Suspense, use, useState } from "react";

const f = async (wait: number) => {
  await new Promise((resolve) => setTimeout(resolve, wait));
  return new Date();
};

const App = () => {
  return (
    <>
      <h1>26380-19rc1</h1>
      <Expected />
      <Unexpected />
    </>
  );
};

const Expected = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>👍</div>
      <button onClick={() => setOpen(!open)}>{open ? "close" : "open"}</button>
      {open && <List wait={[1000, 2000, 3000, 4000, 5000]} />}
    </>
  );
};

const Unexpected = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>🤔</div>
      <button onClick={() => setOpen(!open)}>{open ? "close" : "open"}</button>
      {open && <List wait={[1000, 2000, 3000, 3000, 5000]} />}
    </>
  );
};

const List = ({ wait }: { wait: number[] }) => {
  const [t1] = useState(f(wait[0]));
  const [t2] = useState(f(wait[1]));
  const [t3] = useState(f(wait[2]));
  const [t4] = useState(f(wait[3]));
  const [t5] = useState(f(wait[4]));

  return (
    <>
      <Suspense fallback={<div>Loading No.1 ...</div>}>
        <Item time={t1} />
      </Suspense>
      <Suspense fallback={<div>Loading No.2 ...</div>}>
        <Item time={t2} />
      </Suspense>
      <Suspense fallback={<div>Loading No.3 ...</div>}>
        <Item time={t3} />
      </Suspense>
      <Suspense fallback={<div>Loading No.4 & No.5 ...</div>}>
        <Item time={t4} />
        <Item time={t5} />
      </Suspense>
    </>
  );
};

const Item = ({ time }: { time: Promise<Date> }) => {
  const t = use(time);

  console.log("render item");

  return <div>{t.toISOString()}</div>;
};

export default App;
