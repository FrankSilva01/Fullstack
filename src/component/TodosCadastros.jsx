import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { format } from 'date-fns';
import { IMaskInput } from 'react-imask';

function TodosCadastros() {
  const [data, setData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    genero: '',
    cpf: '', // Adicionado o campo CPF
  });

  const [requiredFields, setRequiredFields] = useState([]);
  const [cpfError, setCpfError] = useState('');

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3003/api/listarUsuarios');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao obter dados:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditar = (id) => {
    setEditUserId(id);
    const selectedUser = data.find((user) => user.id === id);

    try {
      setEditedData({
        ...selectedUser,
        dataNascimento: format(new Date(selectedUser.dataNascimento), 'yyyy-MM-dd'),
      });

      setRequiredFields([]);
      setEditDialogOpen(true);
      setCpfError('');
    } catch (error) {
      console.error('Erro ao editar usuário:', error.message);
      setEditDialogOpen(false);
      setEditUserId(null);
      setEditedData({
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        email: '',
        genero: '',
        cpf: '', // Adicionado o campo CPF
      });
    }
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/api/excluirUsuario/${id}`);
      getData();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error.message);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const missingFields = Object.keys(editedData).filter((field) => !editedData[field]);

      if (missingFields.length > 0) {
        console.error('Preencha todos os campos obrigatórios.');
        setRequiredFields(missingFields);
        return;
      }

      // Função para validar CPF
      const validateCPF = (cpf) => {

        return true; // Adapte conforme necessário
      };

      // Adicione a validação do CPF
      const isValidCPF = validateCPF(editedData.cpf);

      if (!isValidCPF) {
        console.error('CPF inválido.');
        setRequiredFields(['cpf']);
        setCpfError('CPF inválido.');
        return;
      }

      // Verifica se o CPF já está cadastrado, excluindo o usuário atual
      const isCpfAlreadyExists = data.some((user) => user.cpf === editedData.cpf && user.id !== editUserId);

      if (isCpfAlreadyExists) {
        console.error('CPF já cadastrado.');
        setRequiredFields(['cpf']);
        setCpfError('CPF já cadastrado.');
        return;
      }

      setRequiredFields([]);
      setCpfError('');

      const editedDataWithoutFormat = { ...editedData };
      const editedDate = new Date(editedData.dataNascimento);
      editedDate.setDate(editedDate.getDate() + 1);
      editedDataWithoutFormat.dataNascimento = format(editedDate, 'yyyy-MM-dd');

      // Se o CPF não foi alterado, mantenha o valor original
      if (data.find((user) => user.id === editUserId)?.cpf === editedDataWithoutFormat.cpf) {
        editedDataWithoutFormat.cpf = data.find((user) => user.id === editUserId)?.cpf;
      }

      console.log('Dados enviados para atualização:', editedDataWithoutFormat);

      await axios.put(`http://localhost:3003/api/atualizarUsuario/${editUserId}`, editedDataWithoutFormat);

      getData();

      setEditDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setEditUserId(null);
    setEditedData({
      nome: '',
      sobrenome: '',
      dataNascimento: '',
      email: '',
      genero: '',
      cpf: '', 
    });
    setRequiredFields([]);
    setCpfError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (!value.trim() && requiredFields.includes(name)) {
      setRequiredFields((prevFields) => prevFields.filter((field) => field !== name));
    }
  };

  return (
    <Grid container spacing={3}>
      <h1 style={{ textAlign: 'center', width: '100%', padding: '40px' }}>Todos os usuários</h1>
      {loading ? (
        <Typography variant="h6">Carregando...</Typography>
      ) : data && data.length > 0 ? (
        data.map((usuario) => (
          <Grid item key={usuario.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">{`${usuario.nome} ${usuario.sobrenome}`}</Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Data de Nascimento:</strong>{` ${format(new Date(usuario.dataNascimento), 'dd/MM/yyyy')}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>E-mail:</strong>{` ${usuario.email}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Gênero:</strong>{` ${usuario.genero}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>CPF:</strong>{` ${usuario.cpf}`}
                </Typography>
                <Button onClick={() => handleEditar(usuario.id)} variant="outlined" color="primary">
                  Editar
                </Button>
                <Button onClick={() => handleExcluir(usuario.id)} variant="outlined" color="secondary">
                  Excluir
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6">Nenhum cadastro encontrado.</Typography>
      )}

      <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Nome"
            name="nome"
            value={editedData.nome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={requiredFields.includes('nome')}
            className={requiredFields.includes('nome') ? 'Mui-error' : ''}
          />
          <TextField
            required
            label="Sobrenome"
            name="sobrenome"
            value={editedData.sobrenome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={requiredFields.includes('sobrenome')}
            className={requiredFields.includes('sobrenome') ? 'Mui-error' : ''}
          />
          <TextField
            required
            label="Data de Nascimento"
            name="dataNascimento"
            value={editedData.dataNascimento}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="date"
            error={requiredFields.includes('dataNascimento')}
          />
          <TextField
            required
            label="E-mail"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={requiredFields.includes('email')}
          />
          <TextField
            label="Gênero"
            select
            name="genero"
            value={editedData.genero}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={requiredFields.includes('genero')}
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
            <MenuItem value="Prefiro não declarar">Prefiro não declarar</MenuItem>
          </TextField>
          <TextField
            label="CPF"
            name="cpf"
            value={editedData.cpf}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={requiredFields.includes('cpf') || !!cpfError}
            helperText={cpfError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancelar
          </Button> {' '}
          <Button onClick={handleSaveEdit} color="primary">
            Salvar
          </Button> 
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default TodosCadastros;
