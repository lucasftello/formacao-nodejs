function sendEmail(content, to, callback) {
  setTimeout(() => {
    const error = true;

    if (error) {
      callback('O envio do e-mail falhou');
    } else {
      callback();
    }
  }, 5000);
}

console.log('Inicio da execução');
sendEmail('Seja bem vindo ao Guia!', 'teste@teste.com', error => {
  if (error) {
    console.log('Ocorreu um erro: ' + error);
  } else {
    console.log('Tudo OK!');
  }
});
