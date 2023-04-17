function getId() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5);
    }, 2000);
  });
}

function getEmail(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ email: 'lucas@email.com' });
    }, 2000);
  });
}

function sendEmail(content, to) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = true;

      if (!error) {
        resolve({
          to,
          content
        });
      } else {
        reject('Falha na autenticação com o servidor');
      }
    }, 4000);
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = true;

      if (!error) {
        resolve([
          {
            id: 1,
            name: 'Lucas'
          },
          {
            id: 2,
            name: 'Marli'
          },
          {
            id: 3,
            name: 'Tiago'
          },
          {
            id: 4,
            name: 'Olga'
          },
          {
            id: 5,
            name: 'Silvio'
          }
        ]);
      } else {
        reject('Não foi possível se conectar ao banco de dados');
      }
    }, 3000);
  });
}

// async / await
// (async () => {
//   try {
//     const users = await getUsers();
//     console.log(users);
//   } catch (error) {
//     console.error('Erro ao buscar usuários: ', error);
//   }
// })();

// async / await
(async () => {
  const id = await getId();
  const email = await getEmail(id);

  try {
    await sendEmail('Olá usuário', email);
    console.log('E-mail enviado');
  } catch (error) {
    console.log('Erro:', error);
  }
})();

// Promise única
// sendEmail('Olá mundo', 'teste@teste.com')
//   .then(data => {
//     console.log(`
//       E-mail enviado
//       ------------------
//       Para: ${data.to}
//       ------------------
//       Contetúdo: ${data.content}
//     `);
//   })
//   .catch(error => {
//     console.error('Erro:', error);
//   });

// Promises aninhadas (Promise hell)
// getId().then(id => {
//   getEmail(id).then(data => {
//     sendEmail('Olá usuário', data.email)
//       .then(() => {
//         console.log(`E-mail enviado para o usuário com id ${id}`);
//       })
//       .catch(error => {
//         console.error('Erro: ', error);
//       });
//   });
// });
