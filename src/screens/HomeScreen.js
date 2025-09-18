import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import { Container, Button } from '../styles/GlobalStyles';

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const HeroSection = styled(motion.div)`
  text-align: center;
  color: white;
  max-width: 600px;
`;

const HeroIcon = styled(motion.div)`
  font-size: 120px;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StartButton = styled(Button)`
  font-size: 18px;
  padding: 18px 35px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;

const HomeScreen = () => {
  const navigate = useNavigate();

  const floatingAnimation = {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <Container>
      <HomeContainer>
        <FloatingElements>
          <FloatingElement
            animate={floatingAnimation}
            style={{ 
              width: '100px', 
              height: '100px', 
              top: '10%', 
              left: '10%',
              animationDelay: '0s'
            }}
          />
          <FloatingElement
            animate={floatingAnimation}
            style={{ 
              width: '150px', 
              height: '150px', 
              top: '60%', 
              right: '15%',
              animationDelay: '2s'
            }}
          />
          <FloatingElement
            animate={floatingAnimation}
            style={{ 
              width: '80px', 
              height: '80px', 
              bottom: '20%', 
              left: '20%',
              animationDelay: '4s'
            }}
          />
        </FloatingElements>

        <HeroSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroIcon
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <FaGithub />
          </HeroIcon>

          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Meu Perfil GitHub
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Descubra e explore perfis e repositórios do GitHub de forma simples e intuitiva
          </HeroSubtitle>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <StartButton
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/busca')}
            >
              Começar <FaArrowRight />
            </StartButton>
          </motion.div>
        </HeroSection>
      </HomeContainer>
    </Container>
  );
};

export default HomeScreen;
