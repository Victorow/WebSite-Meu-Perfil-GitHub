import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  FaStar, 
  FaCodeBranch, 
  FaExternalLinkAlt, 
  FaCalendarAlt,
  FaCode,
  FaBook
} from 'react-icons/fa';
import { Container } from '../styles/GlobalStyles';

const ReposContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 40px 0;
`;

const Header = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 40px;
  text-align: center;
  color: white;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const ReposGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 25px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const RepoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-left-color: #667eea;
  }
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const RepoName = styled.h3`
  font-size: 1.4rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RepoDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RepoStats = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 0.9rem;
`;

const Language = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.color || '#667eea'};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const LanguageDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.color || '#667eea'};
`;

const UpdateDate = styled.div`
  color: #999;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 60px 20px;
  color: white;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.6;
`;

const RepositoriosScreen = () => {
  const { username } = useParams();
  const location = useLocation();
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const usuario = location.state?.usuario;

  useEffect(() => {
    buscarRepositorios();
  }, [username]);

  const buscarRepositorios = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`
      );
      setRepositorios(response.data);
    } catch (error) {
      setError('Erro ao carregar repositórios');
    } finally {
      setLoading(false);
    }
  };

  const abrirRepositorio = (url) => {
    window.open(url, '_blank');
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      Python: '#3572a5',
      Java: '#b07219',
      TypeScript: '#2b7489',
      HTML: '#e34c26',
      CSS: '#1572b6',
      React: '#61dafb',
      Vue: '#4fc08d',
      PHP: '#777bb4',
      Ruby: '#701516',
      Go: '#00ADD8',
      'C++': '#f34b7d',
      C: '#555555',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
    };
    return colors[language] || '#667eea';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ReposContainer>
        <Header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeaderTitle>
            Repositórios de {usuario?.name || username}
          </HeaderTitle>
          <HeaderSubtitle>
            {repositorios.length} repositórios encontrados
          </HeaderSubtitle>
        </Header>

        {repositorios.length === 0 ? (
          <EmptyState
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <EmptyIcon>
              <FaBook />
            </EmptyIcon>
            <h3>Nenhum repositório público encontrado</h3>
          </EmptyState>
        ) : (
          <ReposGrid>
            <AnimatePresence>
              {repositorios.map((repo, index) => (
                <RepoCard
                  key={repo.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => abrirRepositorio(repo.html_url)}
                >
                  <RepoHeader>
                    <div style={{ flex: 1 }}>
                      <RepoName>
                        <FaBook />
                        {repo.name}
                      </RepoName>
                      {repo.description && (
                        <RepoDescription>{repo.description}</RepoDescription>
                      )}
                    </div>
                    <FaExternalLinkAlt color="#667eea" />
                  </RepoHeader>

                  <RepoStats>
                    {repo.language && (
                      <Language color={getLanguageColor(repo.language)}>
                        <LanguageDot color={getLanguageColor(repo.language)} />
                        {repo.language}
                      </Language>
                    )}
                    
                    <Stat>
                      <FaStar />
                      {repo.stargazers_count}
                    </Stat>
                    
                    <Stat>
                      <FaCodeBranch />
                      {repo.forks_count}
                    </Stat>
                  </RepoStats>

                  <UpdateDate>
                    <FaCalendarAlt />
                    Atualizado em {formatDate(repo.updated_at)}
                  </UpdateDate>
                </RepoCard>
              ))}
            </AnimatePresence>
          </ReposGrid>
        )}
      </ReposContainer>
    </Container>
  );
};

export default RepositoriosScreen;
