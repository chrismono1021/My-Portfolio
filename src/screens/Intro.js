import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';
import DisplacementSphere from '../components/DisplacementSphere';
import { Media } from '../utils/StyleUtils';
const disciplines = ['Developer', 'Animator', 'Illustrator', 'Modder'];

const Fragment = React.Fragment;

class Intro extends Component {
  state = {
    disciplineIndex: 0,
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const props = {};
    const sphere = new DisplacementSphere(threeCanvas, props);
    sphere.init();
    this.switchDiscipline();
  }

  switchDiscipline = () => {
    setInterval(() => {
      const { disciplineIndex } = this.state;
      const index = disciplineIndex >= disciplines.length - 1 ? 0 : disciplineIndex + 1;

      this.setState({
        disciplineIndex: index,
      });
    }, 5000);
  }

  render() {
    const { disciplineIndex } = this.state;

    return (
      <IntroWrapper>
        <Transition in={true} appear timeout={3000}>
          {(appearStatus) => (
            <Fragment>
              <IntroBackground
                innerRef={canvas => this.threeCanvas = canvas}
                status={appearStatus}
              />
              <IntroText>
                <IntroName>Hamish Williams</IntroName>
                <IntroTitle>
                  <IntroTitleRow>
                    <IntroTitleWord status={appearStatus} delay="0.2s">Designer</IntroTitleWord>
                    <IntroTitleLine status={appearStatus} />
                  </IntroTitleRow>
                  <TransitionGroup component={IntroTitleRow}>
                    {disciplines.map((item, index) => (
                      <Transition
                        appear
                        timeout={{enter: 3000, exit: 2000}}
                        key={`${item}_${index}`}
                        mountOnEnter
                        unmountOnExit
                      >
                        {(status) => (
                          <IntroTitleWord
                            plus
                            delay="0.5s"
                            status={status}
                          >
                            {item}
                          </IntroTitleWord>
                        )}
                      </Transition>
                    )).filter((item, index) => index === disciplineIndex)}
                  </TransitionGroup>
                </IntroTitle>
              </IntroText>
            </Fragment>
          )}
        </Transition>
      </IntroWrapper>
    );
  }
}

const IntroWrapper = styled.main`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 120px;

  @media (max-width: ${Media.tablet}) {
    padding-left: 60px;
  }

  @media (max-width: ${Media.mobile}) {
    padding-left: 0;
  }
`;

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const IntroBackground = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
    animation-duration: 3s;
    animation-delay: 0.5s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    opacity: 0;

    ${props => props.status === 'entering' &&`
      animation-name: ${AnimBackgroundFade};
    `}

    ${props => props.status === 'entered' &&`
      opacity: 1;
    `}
  }
`;

const IntroText = styled.section`
  max-width: 860px;
  width: 100%;
  position: relative;
  top: -20px;
  padding: 0 ${props => props.theme.spacingOuter.desktop};

  @media (max-width: ${Media.tablet}) {
    padding: 0 100px;
  }

  @media (max-width: ${Media.mobile}) {
    padding: 0 ${props => props.theme.spacingOuter.mobile};
    top: 0;
  }
`;

const IntroName = styled.h2`
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colorText(0.8)};
  margin-bottom: 60px;
  margin-top: 0;
  font-weight: 500;

  @media (max-width: 860px) {
    font-size: 18px;
    margin-bottom: 40px;
  }

  @media (max-width: 600px) {
    margin-bottom: 25px;
  }
`;

const IntroTitle = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 100px;
  margin: 0;
  letter-spacing: -0.005em;
  font-weight: 500;

  @media (max-width: 860px) {
    font-size: 80px;
  }

  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

const IntroTitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const AnimTextReveal = props => keyframes`
  0% { color: ${props.theme.colorText(0)}; }
  50% { color: ${props.theme.colorText(0)}; }
  60% { color: ${props.theme.colorText(1)}; }
  100% { color: ${props.theme.colorText(1)}; }
`;

const AnimTextRevealMask = keyframes`
  0% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
  }
  51% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: right;
  }
`;

const IntroTitleWord = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  color: ${props => props.theme.colorText(0)};
  transition: opacity 0.5s ease 0.4s;

  ${props => props.status === 'entering' &&`
    animation-name: ${AnimTextReveal(props)};
  `}

  ${props => props.status === 'entered' &&`
    color: ${props.theme.colorText(1)};
  `}

  ${props => props.status === 'exiting' &&`
    color: ${props.theme.colorText(1)};
    opacity: 0;
    position: absolute;
    top: 0;
    z-index: 0;
  `}

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colorPrimary(1)};
    opacity: 0;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    transform-origin: left;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    ${props => props.status === 'entering' &&`
      animation-name: ${AnimTextRevealMask};
    `}

    ${props => props.status === 'entered' &&`
      opacity: 1;
      transform: scaleX(0);
      transform-origin: right;
    `}
  }

  ${props => props.delay &&`
    animation-delay: ${props.delay};

    &:after {
      animation-delay: ${props.delay};
    }
  `}

  ${props => props.plus &&`
    &:before {
      content: '+';
      margin-right: 10px;
      opacity: 0.4;
    }
  `}
`;

const AnimLineIntro = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
`;

const IntroTitleLine = styled.div`
  content: '';
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  width: 120%;
  display: flex;
  margin-left: 20px;
  animation-duration: 0.8s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  transform-origin: left;
  opacity: 0;

  ${props => props.status === 'entering' &&`
    animation-name: ${AnimLineIntro};
  `}

  ${props => props.status === 'entered' &&`
    transform: scaleX(1);
    opacity: 1;
  `}
`;

export default Intro;
