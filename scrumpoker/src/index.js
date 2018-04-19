"use strict";

const UNLOCKED_STATE = 0;
const LOCKED_STATE = 1;

const READY_STATE = 0;
const SELECTED_STATE = 1;
const DISPLAYED_STATE = 2;

const root = __("div", { "class": "root", "data-state": UNLOCKED_STATE });
document.addEventListener("DOMContentLoaded", () => document.body.appendChild(root), false);

const __card = (label, row, col) => used(
  __("div",
    {
      "class": ("card" + (label === "" ? " card_empty": "")),
      "data-phase": READY_STATE,
      "style": "--row: " + row + "; --col: " + col + ";"
    },
    __("div", {"class": "card__decoration"}),
    __("div", {"class": "card__label"},
      label
    )
  ),
  el => el.onclick = element => {
    switch(Number(el.dataset.phase)) {
      case READY_STATE:
        if (Number(root.dataset.state) === LOCKED_STATE) {
          return;
        }
        // no break
      case SELECTED_STATE:
        el.dataset.phase = Number(el.dataset.phase) + 1;
        root.dataset.state = LOCKED_STATE;
        break;
      case DISPLAYED_STATE:
        root.dataset.state = UNLOCKED_STATE;
        el.dataset.phase = READY_STATE;
    }
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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./src/sw.js")
  .then(() => 
    navigator.serviceWorker.ready
    .then((worker) => worker.sync.register("syncdata"))
  )
  .catch(err => console.log(err));
}
