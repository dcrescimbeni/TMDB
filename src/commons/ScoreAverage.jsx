import styled from 'styled-components/macro';

const ScoreAverage = ({ score, size }) => {
  if (!size) size = 1;
  return (
    <div>
      <ScoreWrapper size={size}>
        <Score size={size}>{score}</Score>
      </ScoreWrapper>
    </div>
  );
};

const ScoreWrapper = styled.div`
  ${(props) => {
    return `min-width: ${props.size * 2}rem;
    height: ${props.size * 2}rem;`;
  }}
  border-radius: 50%;
  border: 3px solid #9c1de7;
  background-color: #581b98;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const Score = styled.p`
  ${(props) => {
    return `font-size: ${props.size}rem;`;
  }}
  color: #e3e3e3;
  font-weight: bold;
`;

export default ScoreAverage;
