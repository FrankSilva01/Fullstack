import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { IMaskInput } from 'react-imask';
import cpfCheck from 'cpf-check';
import axios from 'axios';

// Funções utilitárias para validação da data
const validarData = (data) => {
  const regexData = /^\d{4}-\d{2}-\d{2}$/;
  if (!regexData.test(data)) {
    return false; // Não corresponde ao formato "YYYY-MM-DD"
  }
  const parsedDate = new Date(data);
  return !isNaN(parsedDate.getTime()) && parsedDate.getFullYear() >= 1900 && parsedDate.getFullYear() <= 2010;
};

const validarCPF = (cpf) => cpfCheck.validate(cpf);

// Serviço para processamento dos dados e validações
const FormularioService = {
  validarDados: (dados) => {
    const { cpf, nome, sobrenome, dataNascimento, email, genero } = dados;

    console.log('Validando dados:', dados);

    if (!validarCPF(cpf)) {
      console.log('CPF inválido:', cpf);
      return 'CPF inválido, tente novamente';
    }

    if (![cpf, nome, sobrenome, dataNascimento, email, genero].every(Boolean)) {
      console.log('Campos não preenchidos:', dados);
      return 'Todos os campos precisam ser preenchidos!';
    }

    if (!validarData(dataNascimento)) {
      console.log('Data de nascimento inválida:', dataNascimento);
      return 'Data de nascimento inválida, digite uma data válida.';
    }

    return null; // Dados válidos
  },
};

const Formulario = () => {
  const [data, setData] = useState([]);
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [mensagem, setMensagem] = useState('');
  const generoOpcoes = ['Masculino', 'Feminino', 'Prefiro não declarar'];

  const limparCampos = () => {
    setCpf('');
    setNome('');
    setSobrenome('');
    setDataNascimento('');
    setEmail('');
    setGenero('');
  };

  const cadastrarUsuario = async (dados) => {
    try {
      const cpfSemFormatacao = dados.cpf.replace(/[^\d]+/g, '');

      console.log('Enviando dados para cadastro:', { ...dados, cpf: cpfSemFormatacao });

      const response = await axios.post('http://localhost:3003/api/cadastrarUsuarios', { ...dados, cpf: cpfSemFormatacao });

      if (response.status === 200) {
        console.log(response.data.message);
        getData();
      } else {
        setMensagem(response.data.message);
        setTimeout(() => setMensagem(''), 3000);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
      setMensagem('Erro ao cadastrar usuário. CPF Já cadastrado.');
      setTimeout(() => setMensagem(''), 4000);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/listarUsuarios');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao obter dados:', error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      cpf: cpf,
      nome: nome,
      sobrenome: sobrenome,
      dataNascimento: dataNascimento,
      email: email,
      genero: genero,
    };

    const mensagemErro = FormularioService.validarDados(dados);

    if (mensagemErro) {
      setMensagem(mensagemErro);
      setTimeout(() => setMensagem(''), 2000);
    } else {
      cadastrarUsuario(dados);
      setMensagem('Cadastrado com sucesso!');
      setTimeout(() => setMensagem(''), 1000);
      limparCampos();
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cpf">CPF</label> <br />
        <Box>
          <IMaskInput
            name='cpf'
            id='cpf'
            style={{ height: '50px', width: '212px' }}
            required
            mask="000.000.000-00"
            value={cpf}
            onAccept={(value) => setCpf(value)}
            placeholder="Digite o seu CPF"
          />
        </Box>

        <br />

        <label htmlFor="nome">Nome</label> <br />
        <TextField
          name='nome'
          id='nome'
          label="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br /> <br />

        <label htmlFor="sobrenome">Sobrenome</label> <br />
        <TextField
          name='sobrenome'
          id='sobrenome'
          label="Sobrenome"
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          required
        />
        <br /> <br />

        <label htmlFor="nascimento">Data de Nascimento</label> <br />
        <TextField
          name='nascimento'
          id='nascimento'
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          required
        />
        <br /> <br />

        <label htmlFor="email">E-mail</label> <br />
        <TextField
          name="email"
          id='email'
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /> <br />

        <label htmlFor="genero">Gênero</label> <br />
        <TextField
          style={{ height: '50px', width: '212px' }}
          name='genero'
          id='genero'
          select
          defaultValue={''}
          required
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          {generoOpcoes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <br /><br />

        <Button type="submit" variant="contained" color="primary">
          Inserir
        </Button>{' '}
        <Button type="button" onClick={limparCampos} variant="contained">
          Recomeçar
        </Button>
      </form>
      {mensagem && <div style={{ fontSize: '18px' }}>{mensagem}</div>}
    </div>
  );
};

export default Formulario;
