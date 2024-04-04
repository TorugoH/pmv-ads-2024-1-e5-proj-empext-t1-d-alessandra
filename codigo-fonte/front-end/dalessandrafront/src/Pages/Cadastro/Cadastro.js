import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../estilo/cadastro.css";
import config from "../../config/config";
import logo from "../../img/logo.png";

function Cadastro() {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    dataNascimento: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!userData.nome || !userData.email || !userData.senha || !userData.confirmarSenha || !userData.dataNascimento) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      if (userData.senha !== userData.confirmarSenha) {
        throw new Error("As senhas não coincidem.");
      }

      const headers = config.HEADERS;
      const data = {
        nomeCadastro: userData.nome,
        emailCadastro: userData.email,
        dataNascimento: new Date(userData.dataNascimento).toLocaleDateString("pt-BR"),
        senhaCadastro: userData.senha
      };

      const response = await axios.post(`${config.URL}cadastros/cadastrar`, data, { headers });
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <div className={`background ${loading ? "dark" : ""}`}></div>
      <div className={`cadastro-container ${loading ? "loading" : ""}`}>
        <img src={logo} alt="Logo" className="logo" />
        <h2>Cadastro</h2>
        <form>
          <input
            type="text"
            name="nome"
            value={userData.nome}
            onChange={handleChange}
            placeholder="Nome"
          />
          <input
            type="date"
            name="dataNascimento"
            value={userData.dataNascimento}
            onChange={handleChange}
            placeholder="Data de Nascimento"
          />
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="senha"
            value={userData.senha}
            onChange={handleChange}
            placeholder="Senha"
          />
          <input
            type="password"
            name="confirmarSenha"
            value={userData.confirmarSenha}
            onChange={handleChange}
            placeholder="Confirmar Senha"
          />
          <button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <p>
          Já possui uma conta? <Link to="/">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
