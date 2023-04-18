class Dice {
  constructor(faces) {
    this.faces = faces;
  }

  roll() {
    const min = Math.ceil(1);
    const max = Math.floor(this.faces);
    const result = Math.floor(Math.random() * (max - min + 1) + min);

    console.log(result);
  }
}

const dice = new Dice(10);
dice.roll();
