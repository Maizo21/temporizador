"use strict";

/* Controles y variables */
let buttonPlay = document.querySelector(".timer__controls--start");
let buttonPause = document.querySelector(".timer__controls--pause");
let buttonReset = document.querySelector(".timer__controls--reset");
let alarm = document.querySelector(".alarm");
let paused = false;
let time;
let currentTime = 0;

/* Funciones */

/*Limpia los inputs*/
const clearInput = function () {
  document.querySelector("#hour").value = `00`;
  document.querySelector("#minute").value = `00`;
  document.querySelector("#second").value = `00`;
};

/*Limpia timer*/
const clearTime = function () {
  document.querySelector(".timer__time--hours").textContent = `00`;
  document.querySelector(".timer__time--minutes").textContent = `00`;
  document.querySelector(".timer__time--seconds").textContent = `00`;
};

/*Limpia la cuenta y detiene el setInterval*/
const restart = function () {
  currentTime = 0;
  clearInterval(time);
};

/*Inicio de cuenta regresiva*/
const play = function (newTimer = true) {
  paused = false;
  let hour, minute, second;
  document.querySelector(".timer__controls--pause").textContent = "Pausar";
  /* Si se tiene ya iniciado el temporizador y se da play a uno nuevo */
  if (newTimer) {
    clearInterval(time);
    hour = document.querySelector("#hour").value.padStart(2, "0");
    minute = document.querySelector("#minute").value.padStart(2, "0");
    second = document.querySelector("#second").value.padStart(2, "0");
    currentTime =
      parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);
    document.querySelector(".timer__time--hours").textContent = hour;
    document.querySelector(".timer__time--minutes").textContent = minute;
    document.querySelector(".timer__time--seconds").textContent = second;

    document.title = `Temporizador - ${hour}:${minute}:${second}`;
  }

  clearInput();

  time = setInterval(function () {
    /*Si el tiempo es mayor a > 0*/
    if (currentTime > 0) {
      currentTime--;
    } else {
      clearInterval(time);
      alarm.play();
      return;
    }

    hour = String(currentTime > 3600 ? Math.floor(currentTime / 3600) : 0)
      .slice(-2)
      .padStart(2, "0");
    minute = String(currentTime > 60 ? Math.floor((currentTime / 60) % 60) : 0)
      .slice(-2)
      .padStart(2, "0");
    second = String(currentTime % 60)
      .slice(-2)
      .padStart(2, "0");

    /* Colocacion de valores de la cuenta regresiva en el timer y head title*/

    document.title = `Temporizador - ${hour}:${minute}:${second}`;

    document.querySelector(".timer__time--hours").textContent = String(
      hour
    ).padStart(2, "0");
    document.querySelector(".timer__time--minutes").textContent = String(
      minute
    ).padStart(2, "0");
    document.querySelector(".timer__time--seconds").textContent = String(
      second
    ).padStart(2, "0");
  }, 1000);

  const restartTime = function () {
    restart();
    clearInput();
    clearTime();
    paused = false;
    document.querySelector(".timer__controls--pause").textContent = "Pausar";
    document.title = `Temporizador`;
  };

  buttonReset.addEventListener("click", restartTime);
};

/*Detiene o continua la cuenta regresiva*/
const pause = function () {
  if (!paused) {
    clearInterval(time);
    paused = true;
    document.querySelector(".timer__controls--pause").textContent = "Reanudar";
  } else {
    play(false);
    paused = false;
    document.querySelector(".timer__controls--pause").textContent = "Pausar";
  }
};

buttonPause.addEventListener("click", pause);

buttonPlay.addEventListener("click", function () {
  if (paused) {
    clearTime();
    play();
  } else {
    play();
  }
});
