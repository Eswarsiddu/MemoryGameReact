import a from "../assets/images/a.jpg";
import b from "../assets/images/b.jpg";
import c from "../assets/images/c.jpg";
import d from "../assets/images/d.jpg";
import e from "../assets/images/e.jpg";
import f from "../assets/images/f.jpg";
import g from "../assets/images/g.jpg";
import h from "../assets/images/h.jpg";
import i from "../assets/images/i.jpg";
import j from "../assets/images/j.jpg";
import k from "../assets/images/k.jpg";
import l from "../assets/images/l.jpg";
import m from "../assets/images/m.jpg";
import n from "../assets/images/n.jpg";
import o from "../assets/images/o.jpg";
import p from "../assets/images/p.jpg";
import q from "../assets/images/q.jpg";
import r from "../assets/images/r.jpg";
import s from "../assets/images/s.jpg";
import t from "../assets/images/t.jpg";
import u from "../assets/images/u.jpg";
import v from "../assets/images/v.jpg";
import w from "../assets/images/w.jpg";
import x from "../assets/images/x.jpg";
import y from "../assets/images/y.jpg";
import z from "../assets/images/z.jpg";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { STATES, ShuffelArray } from "../Constants";
import { TimerText } from "../Timer";

export const CHARACTERS = [
  { text: "a", image: a, value: nanoid() },
  { text: "b", image: b, value: nanoid() },
  { text: "c", image: c, value: nanoid() },
  { text: "d", image: d, value: nanoid() },
  { text: "e", image: e, value: nanoid() },
  { text: "f", image: f, value: nanoid() },
  { text: "g", image: g, value: nanoid() },
  { text: "h", image: h, value: nanoid() },
  { text: "i", image: i, value: nanoid() },
  { text: "j", image: j, value: nanoid() },
  { text: "k", image: k, value: nanoid() },
  { text: "l", image: l, value: nanoid() },
  { text: "m", image: m, value: nanoid() },
  { text: "n", image: n, value: nanoid() },
  { text: "o", image: o, value: nanoid() },
  { text: "p", image: p, value: nanoid() },
  { text: "q", image: q, value: nanoid() },
  { text: "r", image: r, value: nanoid() },
  { text: "s", image: s, value: nanoid() },
  { text: "t", image: t, value: nanoid() },
  { text: "u", image: u, value: nanoid() },
  { text: "v", image: v, value: nanoid() },
  { text: "w", image: w, value: nanoid() },
  { text: "x", image: x, value: nanoid() },
  { text: "y", image: y, value: nanoid() },
  { text: "z", image: z, value: nanoid() },
];

function GenerateGrid(gridSize) {
  const noOfEle = gridSize * gridSize;
  const arr = ShuffelArray(CHARACTERS).slice(0, noOfEle / 2);
  const gridEle = [];

  arr.forEach((ele) => {
    gridEle.push({
      text: ele.text,
      value: ele.value,
      state: STATES.BACK,
    });

    gridEle.push({
      image: ele.image,
      value: ele.value,
      state: STATES.BACK,
    });
  });

  ShuffelArray(gridEle);
  return gridEle;
}

function Game({
  isplaying,
  isfirstPlay,
  endGame,
  gridSize,
  startTime,
  endTime,
}) {
  const [grid, setGrid] = useState(GenerateGrid(gridSize));
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setGrid(GenerateGrid(gridSize));
    setSelected([]);
  }, [isplaying, gridSize]);

  const toalMatched = grid.filter((ele) => ele.state === STATES.MATCHED).length;
  if (toalMatched === grid.length) {
    endGame();
  }

  // grid-cols-6 grid-cols-4

  return (
    <div className=" container mx-auto max-w-max relative">
      <div className={"grid gap-2 " + `grid-cols-${gridSize}`}>
        {grid.map((ele, index) => {
          return (
            <Card
              isdisabled={!isplaying}
              key={ele.value + index}
              ele={ele}
              index={index}
              gridSize={gridSize}
              handelClick={() => {
                if (
                  ele.state === STATES.BACK ||
                  ele.state === STATES.SELECTED
                ) {
                  const newGrid = [...grid];
                  newGrid[index].state =
                    ele.state === STATES.BACK ? STATES.SELECTED : STATES.BACK;
                  if (ele.state === STATES.SELECTED) {
                    if (selected.length === 0) {
                      setSelected([index]);
                    } else if (selected.length === 1) {
                      if (grid[selected[0]].value === ele.value) {
                        newGrid[selected[0]].state = STATES.MATCHED;
                        newGrid[index].state = STATES.MATCHED;
                        setSelected([]);
                      } else {
                        setSelected((prev) => [...prev, index]);
                      }
                    } else {
                      newGrid[selected[0]].state = STATES.BACK;
                      newGrid[selected[1]].state = STATES.BACK;
                      setSelected([index]);
                    }
                  } else {
                    setSelected((prev) => prev.filter((e) => e !== index));
                  }
                  setGrid(newGrid);
                }
              }}
            />
          );
        })}
      </div>
      {isplaying ? null : (
        <div
          className={
            " absolute top-0 left-0 w-full h-full flex flex-col gap-3 items-center justify-center bg-slate-500 rounded-lg bg-opacity-90 " +
            (gridSize == 4 ? "scale-110" : "scale-105")
          }
        >
          {isfirstPlay || (!startTime && !endTime) ? (
            <>
              <p className=" px-3">Click on the card to reveal its value</p>
              <p className=" font-extrabold text-2xl">Start the game</p>
            </>
          ) : (
            <p className=" px-3 text-nowrap font-bold">
              Time took{" "}
              <span className=" text-2xl">
                {TimerText(endTime - startTime)}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function GetCardSize(gridSize) {
  let className = "w-16 h-16 text-3xl md:w-20 md:h-20 md:text-5xl";
  if (gridSize == 6)
    className = "w-12 h-12 text-2xl md:w-16 md:h-16 md:text-4xl";

  return className;
}

function Card({
  ele: { image, text, state },
  index,
  handelClick,
  gridSize,
  isdisabled,
}) {
  const flipped = state !== STATES.BACK;
  return (
    <button
      disabled={state === STATES.MATCHED || isdisabled}
      id={"card-" + index}
      className={
        GetCardSize(gridSize) +
        " border rounded " +
        (flipped
          ? " bg-slate-300 capitalize text-black"
          : "bg-slate-500 hover:bg-slate-400") +
        " " +
        (state === STATES.MATCHED
          ? "border-orange-600 opacity-50"
          : "border-white")
      }
      onClick={handelClick}
    >
      {flipped ? (
        <div>
          {image ? (
            <img className="w-full rounded" src={image} alt="img" />
          ) : (
            <p>{text}</p>
          )}
        </div>
      ) : (
        <p className="text-white">?</p>
      )}
    </button>
  );
}

export default Game;
