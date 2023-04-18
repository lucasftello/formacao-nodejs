class Movie {
  constructor(title, year, genre, director, duration) {
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.director = director;
    this.actors = [];
    this.duration = duration;
  }

  play() {
    console.log('Reproduzindo...');
  }

  pause() {
    console.log('Pausado ||');
  }

  advance() {
    console.log('Avançar >>');
  }

  close() {
    console.log('Fechar X');
  }

  description() {
    console.log(`Título: ${this.title}`);
    console.log(`Ano: ${this.year}`);
    console.log(`Genero: ${this.genre}`);
    console.log(`Diretor: ${this.director}`);
    console.log(`Duração: ${this.duration}`);
  }
}

const movie1 = new Movie('Vingadores 2', 2014, 'Ação', 'Alguem', '2h30');
movie1.description();
