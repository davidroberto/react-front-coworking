const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    console.log(username, password);

    // je créé objet en json avec username et password
    // je fais un fetch de type POST sur mon API login, en incluant le json
    // si l'api valide => jwt dans la réponse
    // sinon => erreur dans la réponse
  };

  return (
    <section>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input type="text" name="username" />
        </label>
        <label>
          password
          <input type="password" name="password" />
        </label>
        <input type="submit" />
      </form>
    </section>
  );
};

export default LoginPage;
