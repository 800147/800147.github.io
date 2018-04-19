"use strict";

const root = __("div", { "class": "root", "data-state": 0 });
document.addEventListener("DOMContentLoaded", () => document.body.appendChild(root), false);

const __card = (label, row, col) => used(
  __("div",
    {
      "class": ("card" + (label == "" ? " card_empty": "")),
      "data-phase": 0,
      "style": "--row: " + row + "; --col: " + col + ";"
    },
    __("div", {"class": "card__decoration"}),
    __("div", {"class": "card__label"},
      label
    )
  ),
  el => el.onclick = element => {
    let newPhase = Number(el.dataset.phase) + 1;
    root.dataset.state = 1;
    if (newPhase > 2) {
      root.dataset.state = 0;
      newPhase = 0;
    }
    el.dataset.phase = newPhase;
  }
);
appendChildren(root,
  __card("0",      0, 0),
  __card("1/2",    0, 1),
  __card("1",      0, 2),
  __card("2",      0, 3),
  __card("3",      1, 0),
  __card("5",      1, 1),
  __card("8",      1, 2),
  __card("13",     1, 3),
  __card("20",     2, 0),
  __card("40",     2, 1),
  __card("100",    2, 2),
  __card("?",      2, 3),
  __card("\u2615", 3, 1.5)
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./src/sw.js')
  .then(() => 
    navigator.serviceWorker.ready
    .then((worker) => worker.sync.register('syncdata'))
  )
  .catch(err => console.log(err));
}
