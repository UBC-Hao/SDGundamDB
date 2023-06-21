import {React, useState, useEffect  } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import {Skill, SkillMini} from './Skill';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import {Weapon} from './Weapon';
import {Print} from './Print';

import "./Card.css"


const CenteredRow = styled(Row)`
  display: flex;
  justify-content: center;
`;

const options = {
  scales: {
      r: {
          angleLines: {
              display: false
          },
          suggestedMin: 0,
          suggestedMax: 1
      }
  }
};

const terrains = ["万能","宇宙","地面","水中","沙漠","空中"];


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler
  );
  
function StatusInfo({item, units}){
  return <Container>
    <Row>
      <Col xs='4'><p className="statusfont_focus">HP: {item.mecha_hp}</p></Col>
      <Col xs='4'><p className="statusfont">MA: {item.ma_property===1?"是":"否"}</p></Col>
      <Col xs='4'><p className="statusfont">战斗类型: {item.mecha_type===0?"近":(item.mecha_type===1?"中":"远")}</p></Col>
    </Row>
    <Row>
      <Col xs='4'><p className="statusfont">复活时间: {item.resurrection_time}</p></Col>
      <Col xs='4'><p className="statusfont">盾牌HP: {item.shield_defense}</p></Col>
      <Col xs='4'><p className="statusfont">盾防类型: {item.defense_type===0?"全防":(item.mecha_type===1?"格斗防御":(item.mecha_type===2?"实弹防御":"光束防御"))}</p></Col>
    </Row>
    <Row>
      <Col xs='4'><p className="statusfont">盾抗百分比: {item.block_percent+"%"}</p></Col>
      <Col xs='4'><p className="statusfont">移动速度: {item.move_speed}</p></Col>
      <Col xs='4'><p className="statusfont_focus">推进速度: {item.thrust_speed}</p></Col>
    </Row>
    <Row>
      <Col xs='4'><p className="statusfont">刀推速度: {item.blade_thrust_speed}</p></Col>
      <Col xs='4'><p className="statusfont_focus">机动能力: {item.maneuverability}</p></Col>
      <Col xs='4'><p className="statusfont">霸体: {item.dominance==1?"否":"是"}</p></Col>
    </Row>
    <Row>
      <Col xs='4'><p className="statusfont">耗气速度: {item.gas_consumption}</p></Col>
      <Col xs='4'><p className="statusfont_focus">攻击: {item.attack}</p></Col>
      <Col xs='4'><p className="statusfont_focus">防御: {item.defense}</p></Col>
    </Row>

    <Row>
      <Col xs='4'><p className="statusfont">地形适应: {terrains[item.terrain_adaptation]}</p></Col>
      <Col xs='4'><p className="statusfont">索敌距离: {item.search_distance}</p></Col>
      <Col xs='4'><p className="statusfont">机体代码:{toHexLittleEndian(item.mecha_id)}</p></Col>
    </Row>

    
  </Container>
}

function WeaponInfo({item, weapons,infos}){
  let ret = [];
  ret.push(item.weapon_code_1!==0&&<Weapon infos={infos} key={"w"+item.weapon_code_1} special={false} weapon={weapons.filter((weapon) => weapon.weapon_id === item.weapon_code_1)[0]}/>);
  ret.push(<hr/>)
  ret.push(item.weapon_code_2!==0&&<Weapon infos={infos}  key={"w"+item.weapon_code_2} special={false} weapon={weapons.filter((weapon) => weapon.weapon_id === item.weapon_code_2)[0]}/>);
  ret.push(<hr/>)
  ret.push(item.weapon_code_3!==0&&<Weapon infos={infos}   key={"w"+item.weapon_code_3} special={false} weapon={weapons.filter((weapon) => weapon.weapon_id === item.weapon_code_3)[0]}/>);
  ret.push(<hr/>)
  ret.push(item.ultimate_code!==0&&<Weapon infos={infos}   key={"w"+item.ultimate_code} special={true} weapon={weapons.filter((weapon) => weapon.weapon_id === item.ultimate_code)[0]}/>);
  
  return <div>{ret}</div>;
}

function normalize(item, index, min, max) {
    return (item[index] - min) / (max - min)>1?1:(item[index] - min) / (max - min);
}

function toHexLittleEndian(num) {
  // 将数字转换为16进制，并且移除 '0x'
  let hex = num.toString(16).replace('0x', '');
  
  // 如果十六进制长度为奇数，则在最前面添加 '0'
  if (hex.length % 2 !== 0) {
      hex = '0' + hex;
  }

  // 将十六进制字符串拆分为数组并翻转
  const hexArray = hex.match(/.{1,2}/g).reverse();

  // 将翻转后的数组元素连接为字符串
  return hexArray.join('');
}

function InformationTabs({item, skills, units,weapons,infos}){
  let extraInfos = infos["extra"].filter((info) => info.id === item.mecha_id);
  if (extraInfos.length!==0){
    extraInfos = extraInfos[0];
  }
  console.log(extraInfos);
  return <Tabs defaultActiveKey="skills" id="uncontrolled-tab-example">
        <Tab eventKey="skills" title="技能">
          <Container>
            {skills && <Skill infos={infos} skills={skills} skill={skills.filter((skill) => skill.skill_id === item.skill_1)[0]}/>}
            {skills && <Skill infos={infos} skills={skills} skill={skills.filter((skill) => skill.skill_id === item.skill_2)[0]}/>}
          </Container>
        </Tab>
        <Tab eventKey="status" title={item.r_mecha_id===0?"属性":"属性(R前)"}>
          <Container>
          <StatusInfo item={item} units={units}/>
          </Container>
        </Tab>
        {units && item.r_mecha_id!==0 && <Tab eventKey="R_status" title="属性(R后)">
          <Container>
          <StatusInfo item={units.filter((unit) => unit.mecha_id === item.r_mecha_id)[0]} units={units}/>
          </Container>
        </Tab>}
        <Tab eventKey="ability4" title={item.r_mecha_id===0?"武器":"武器(R前)"}>
          <Container>
            <WeaponInfo item={item} weapons={weapons} infos={infos}/>
          </Container>
        </Tab>
        {units && item.r_mecha_id!==0 && <Tab eventKey="R_ability4" title="武器(R后)">
          <Container>
            <WeaponInfo infos={infos} item={units.filter((unit) => unit.mecha_id === item.r_mecha_id)[0]} weapons={weapons}/>
          </Container>
        </Tab>}

        {extraInfos["urls"] !== undefined && (
  <Tab eventKey="video" title="其他">
    {extraInfos["name"]!==undefined&&<p>别名: {extraInfos["name"]} <hr/></p>}
    {extraInfos["info"]!==undefined&&<p>注释: {extraInfos["info"]} <hr/></p>}
    
   
    {extraInfos["urls"].map((url, index) => (
      <div key={index}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          视频{index+1}
        </a>
      </div>
    ))}

  </Tab>
)}





      </Tabs>
}

function ItemModal({ item,show,onHide,skills,units,weapons,changeItem,infos}) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg"
    aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title>{GetColoredName(item)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>{/*unit information*/}
          <Col xs='2'>
            <Row><Image variant="left" src={item.standby_image}  fluid/></Row>
            <Row>
              
              <Badge className="toppadding" pill bg="primary">
        机体得分: ??
      </Badge>
      
     
              <Badge className="toppadding" pill bg="success">
        机体胜率: ??
      </Badge>
      
      </Row>
      
      </Col>
          <Col xs='10'>
            <Row><InformationTabs item={item} skills={skills} units={units} weapons={weapons} infos={infos}/>
            </Row>
            <Row>
              <Print item={item} infos={infos} units={units} changeItem={changeItem}/>
            </Row>
            </Col>
        </Row>
       

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          关闭
        </Button>
      </Modal.Footer>
    </Modal>
  );
}




function GetColoredName(item){
    if (item.mecha_quality===3){
      return <span style={{color: '#E00000'}}>{item.name}</span>;
    }else if (item.mecha_quality===4){
      return <span style={{color: '#FFA000'}}>{item.name}</span>;
    }else if (item.mecha_quality===5){
      return <span style={{color: '#00D700'}}>{item.name}</span>;
    }else{
      return item.name;
    }
  }

  const UnitCard = ({ item , skills, units, weapons, infos}) => {
    const [modalShow, setModalShow] = useState(false);
    const [src, setSrc] = useState(item.standby_image);
    const [hoverImage, setHoverImage] = useState(null);
    const [defaultitem, setItem] = useState(item);

    useEffect(() => {
        fetch(item.selected_image);
        setHoverImage(item.selected_image);
    }, [item.selected_image]);

    const handleMouseEnter = () => {
        if (hoverImage) {
            setSrc(hoverImage);
        }
    }

    const handleMouseLeave = () => {
        setSrc(item.standby_image);
    }

    const handleCardClick = () => {
      setItem(item);
      setModalShow(true);
    }

    return <div><Card onClick={handleCardClick}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={"item"+item.mecha_id} border="light" className="card mb-2 bg-body rounded" body style={{ cursor: 'pointer' }}>
              <Row>
                <Col xs='4'>
                  <Row>
                    <Image variant="left" src={src}  fluid/>
                  </Row>
                  <Row>
                    <h6>{GetColoredName(item)}</h6>
                    <p style={{ color: 'gray', fontSize: 'small' }}>ID: {item.mecha_id}</p>
                  </Row>
                  <Row>
                <Col xs='6'>
                {skills && <SkillMini skill={skills.filter((skill) => skill.skill_id === item.skill_1)[0]}/>}
                </Col>
                <Col xs='6'>
                {skills && <SkillMini skill={skills.filter((skill) => skill.skill_id === item.skill_2)[0]}/>}
                </Col>
                </Row>
                </Col>
                <Col xs='8'>
                  <Radar 
                    options={options}
                    data={{
                      labels: ['HP'+item.mecha_hp, '攻击'+item.attack, '防御'+item.defense, '刀推'+item.thrust_speed, '机动'+item.maneuverability, '索敌'+item.search_distance],
                      datasets: [{
                        //label: 'Item Attributes',
                        data: [
                          normalize(item, "mecha_hp", 6000, 17000),
                          normalize(item, "attack", 80, 150),
                          normalize(item, "defense", 80, 150),
                          normalize(item, "thrust_speed", 30, 100),
                          normalize(item, "maneuverability", 40, 85),
                          normalize(item, "search_distance", 1000, 6000),
                        ],
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: 'rgba(75,192,192,1)',
                        borderWidth: 1
                      }]
                    }}
                  />
                </Col>
                
              </Row>
            </Card>
            <ItemModal item={defaultitem} show={modalShow} onHide={() => setModalShow(false)} skills={skills} units={units} weapons={weapons} changeItem={setItem} infos={infos}/>
            </div>
};
export default UnitCard;