import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaUser, FaUsers, FaBook, FaExternalLinkAlt } from 'react-icons/fa';
import { Container, Card, Button } from '../../styles/GlobalStyles';

const SearchContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchCard = styled(Card)`
  margin-bottom: 30px;
  width: 100%;
  max-width: 500px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 50px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const UserCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const Avatar = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #667eea;
  margin-bottom: 20px;
  object-fit: cover;
`;

const UserName = styled(motion.h2)`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 700;
`;

const UserBio = styled(motion.p)`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const Stat = styled.div`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ReposButton = styled(Button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid #e1e5e9;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  margin: 20px auto;
`;

const ErrorMessage = styled(motion.div)`
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
`;

const UsuarioGithub = () => {
  const [usuario, setUsuario] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const buscarUsuario = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Digite um nome de usuário');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUsuario(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Usuário não encontrado');
      } else {
        setError('Erro ao buscar usuário');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <SearchContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <SearchCard>
            <SearchForm onSubmit={buscarUsuario}>
              <SearchInput
                type="text"
                placeholder="Digite o username do GitHub"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <SearchButton
                type="submit"
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                <FaSearch /> Buscar
              </SearchButton>
            </SearchForm>

            {loading && (
              <LoadingSpinner
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}

            <AnimatePresence>
              {error && (
                <ErrorMessage
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </ErrorMessage>
              )}
            </AnimatePresence>
          </SearchCard>
        </motion.div>

        <AnimatePresence>
          {usuario && (
            <UserCard
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar
                src={usuario.avatar_url}
                alt={usuario.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              <UserName
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {usuario.name || usuario.login}
              </UserName>

              {usuario.bio && (
                <UserBio
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {usuario.bio}
                </UserBio>
              )}

              <StatsContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Stat>
                  <StatNumber>{usuario.followers}</StatNumber>
                  <StatLabel><FaUsers /> Seguidores</StatLabel>
                </Stat>
                <Stat>
                  <StatNumber>{usuario.following}</StatNumber>
                  <StatLabel><FaUser /> Seguindo</StatLabel>
                </Stat>
                <Stat>
                  <StatNumber>{usuario.public_repos}</StatNumber>
                  <StatLabel><FaBook /> Repos</StatLabel>
                </Stat>
              </StatsContainer>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <ReposButton
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/repositorios/${usuario.login}`, { state: { usuario } })}
                >
                  Ver Repositórios <FaExternalLinkAlt />
                </ReposButton>
              </motion.div>
            </UserCard>
          )}
        </AnimatePresence>
      </SearchContainer>
    </Container>
  );
};

export default UsuarioGithub;

