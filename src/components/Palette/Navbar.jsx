import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Slider, Select, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { colorLightnessValues } from '../../helpers/paletteGenerator';

const { Option } = Select;
const marks = colorLightnessValues.reduce((accum, next) => ({ ...accum, [next]: `${next}` }), {});

const openNotification = (placement) => {
  notification.info({
    message: 'Color Coding Changed',
    duration: 1,
    placement,
  });
};

const Header = styled(Layout.Header)`
  align-items: center;
  background-color: #ffffff;
  display: flex;
  height: 5vh;
  justify-content: space-between;
`;

const Navigation = styled.nav`
  align-items: center;
  display: flex;
`;

const LogoLink = styled.div`
  margin-right: 5%;
  color: #363636;
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5rem;
  cursor: pointer;
`;

const BackIcon = styled(ArrowLeftOutlined)`
  margin-right: 10px;
`;

const LightnessSlider = styled(Slider)`
  width: 80vw;
  @media (min-width: 1200px) {
    width: 30vw;
  }
  @media (min-width: 768px) {
    width: 50vw;
  }
`;

const ColorCodingSelector = styled(Select)`
  min-width: 250px;
`;

function Navbar({ setLightness, setColorCoding }) {
  const history = useHistory();
  return (
    <Header>
      <Navigation>
        <LogoLink onClick={() => history.goBack()}>
          <BackIcon />
          Recolor
        </LogoLink>
        <LightnessSlider
          min={colorLightnessValues[0]}
          max={colorLightnessValues[colorLightnessValues.length - 1]}
          marks={marks}
          step={null}
          defaultValue={500}
          tipFormatter={null}
          onChange={setLightness}
          dropdownMatchSelectWidth={false}
        />
      </Navigation>
      <Navigation>
        <ColorCodingSelector
          className="header__selector"
          defaultValue="hex"
          onChange={(value) => {
            setColorCoding(value);
            openNotification('bottomLeft');
          }}
        >
          <Option value="hex">HEX — #ffffff</Option>
          <Option value="rgb">RGB — rgb(255,255,255)</Option>
          <Option value="rgba">RGBA — rgba(255,255,255,1)</Option>
        </ColorCodingSelector>
      </Navigation>
    </Header>
  );
}

Navbar.propTypes = {
  setLightness: PropTypes.func.isRequired,
  setColorCoding: PropTypes.func.isRequired,
};

export default Navbar;
