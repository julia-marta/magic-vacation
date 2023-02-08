import {TimeUnits, convertTimeToString} from "../common/utils.js";
import {TIMER_DURATION_MIN} from "../common/const.js";

const {minute} = TimeUnits;

export default () => {
  const timerElement = document.getElementById(`timer`);
  const minutesField = timerElement.firstChild;
  const secondsField = timerElement.lastChild;

  const timerDeadline =
    new Date().getTime() + TIMER_DURATION_MIN * minute.includesMS;

  const getRemainingTime = (deadline) => {
    const currentTime = new Date().getTime();
    return deadline - currentTime;
  };

  const setTimerValue = () => {
    const remainingTime = getRemainingTime(timerDeadline);
    const minutesValue = convertTimeToString(remainingTime, `minute`);
    const secondsValue = convertTimeToString(remainingTime, `second`);

    if (remainingTime > 0) {
      minutesField.textContent = minutesValue;
      secondsField.textContent = secondsValue;
      requestAnimationFrame(setTimerValue);
    } else {
      minutesField.textContent = `00`;
      secondsField.textContent = `00`;
    }
  };

  requestAnimationFrame(setTimerValue);
};
