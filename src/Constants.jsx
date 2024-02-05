export const STATES = {
  BACK: "back",
  SELECTED: "selected",
  MATCHED: "matched",
};

// export const ShuffelArray = (arr) => arr.sort(() => Math.random() - 0.5);

export const ShuffelArray = (arr) => {
  const oldarr = [...arr];
  const newArr = [];
  while (oldarr.length) {
    const index = Math.floor(Math.random() * oldarr.length);
    newArr.push(oldarr[index]);
    oldarr.splice(index, 1);
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = newArr[i];
  }
  return arr;
};

export function DoubleDigit(num) {
  return num < 10 ? `0${num}` : num;
}

export function TripileDigit(num) {
  return num < 100 ? `0${DoubleDigit(num)}` : num;
}
