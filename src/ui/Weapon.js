import {React, useState, useEffect  } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { Container } from 'react-bootstrap';
import {  Tooltip, OverlayTrigger } from 'react-bootstrap';


function convertF(value){
    if (value>0){
        return "+"+(value*100).toFixed(1)+"%";
    }else{
        return (value*100).toFixed(1)+"%";
    }
}

function convertI(value){
    if (value>0){
        return "+"+value;
    }else{
        return value;
    }
}


const dictionary = {
    1: '精密狙击',
    2: '鼠标反转',
    3: '弹药清零',
    4: '无限弹药',
    5: '气槽变为0',
    6: '推进燃料消耗为0',
    7: '瞬移',
    8: '攻击伤害最大化',
    9: '1号无线',
    10: '2号无限',
    11: '3号无限',
    12: '雷达',
    13: '必杀技觉醒',
    14: '疫苗',
    15: '反锁',
    16: '格斗术',
    17: '紧急整备',
    18: '武器的回血',
    19: '武器的海市蜃楼',
    20: '穿甲机枪',
    21: '无限隐身',
    22: '屏幕全白',
    23: '',
    24: '',
    25: '进入防御模式',
    26: '2号武器装填加满',
    27: '3号武器装填加满',
    28: '装填中的武器会立刻充满',
    29: '格斗反击',
    30: '射击反击',
    31: '死亡多1命',
    32: '伪装气球？',
    33: '龙爪连锁的',
    34: '减伤武器特效',
    35: '静止时隐身',
    36: '自己变为大将',
    37: '雷达干扰',
    38: '光束反射',
    39: '浮游炮侵蚀',
    40: '量子化',
    41: '被敌人雷达显示',
    51: '炸裂弹'
  };

const infomation = {
    59001: "4秒内移动，推进-7机动-4",
    59002: "使目标气槽清零。",
    59003: "3秒内鼠标翻转，移动推进-4",
    59004: "降低武器再装填速度",
    59005: "清空目标弹药",
    59006: "3秒内全武器减100%恢复速度",
    59007: "3秒内移动，推进，机动-10",
    59008: "使目标机体一时进入硬直状态. 定身",
    59009: "15秒内恢复4000HP",
    59010: "6秒内移动，推进+4，机动+1，攻击+10防御-20",
    59011: "5秒内恢复30000HP",
    59012: "3秒内移动，推进，机动-20",
    59013: "5秒内恢复2000HP",
    59014: "攻击+15防御-30",
    59015: "穿甲弹",
    59016: "3秒内移动，推进，机动-10",
    59017: "3秒内移动，推进，机动-10",
    59018: "6秒内移动，推进+4，机动+1，攻击+10防御-20",
    59019: "3秒内移动，推进，-124 。回气降低90%",
    59020: "3秒内移动，推进，机动-100",
    59021: "1秒内回复2000血",
    59022: "7秒内减伤40%",
    59023: "7秒内移动，推进+5，机动+3，攻击+15防御-30",
    59024: "机动-100",
    59025: "减4000SP",
    59026: "7秒内光束减伤80%",
    59027: "2秒内鼠标翻转",
    59028: "5秒内回复1000血",
    59029: "15秒内雷达上显示机体方位",
    59030: "7光束减伤75%",
    59031: "5秒内回复10000血",
    59032: "2秒内移动，推进-7，机动-4",
    59033: "1.5秒内自身全武器减100%恢复速度",
    59034: "3秒内移动，推进，机动-20",
    59035: "1.5秒内自身不能使用中,远程武器",
    59036: "7秒内移动，推进，机动+10.回气和气槽加100%",
    59037: "12秒内减光束80%",
    59038: "使自己瞬移",
    59039: "使他人瞬移",
    59040: "1秒内回复1400血",
    59041: "3秒内-10防御",
    59042: "3秒内-15攻击",
    59043: "3机动性下降，弹药装填速度降低",
    59044: "",
    59045: "10秒内攻击力提升30防御降低15 推进机动+20 移动+5 气槽+100%",
    59046: "雷达上显示机体方位",
    59047: "3秒内屏幕全白 机动 刀速-10 攻击-20",
    59048: "机动性下降，弹药装填速度降低"
  };
  
const specialFunctions = {
    59001: "机动力下降小",
    59002: "推进力下降",
    59003: "高能源脉冲",
    59004: "装填速度下降",
    59005: "枪械故障",
    59006: "装填速度下降",
    59007: "机动力下降中",
    59008: "控制回路冲击",
    59009: "修理",
    59010: "海市蜃楼系统",
    59011: "修理(NPC)",
    59012: "机能瘫痪",
    59013: "修理(自机)",
    59014: "海市蜃楼系统-",
    59015: "连射型高性能彻甲弹",
    59016: "机动力下降3",
    59017: "推进机能出力不足",
    59018: "海市蜃楼系统ECM",
    59019: "移动力下降（大）",
    59020: "连锁臂",
    59021: "修理(测试)",
    59022: "苍光壁",
    59023: "超级干扰器ECM",
    59024: "金恩 发射器",
    59025: "SP下降（NPC）",
    59026: "GN手榴弹",
    59027: "控制混乱",
    59028: "修理(至少)",
    59029: "染色弹",
    59030: "精神力场",
    59031: "修理(NPC)",
    59032: "缓慢",
    59033: "再装填下降 (自身)",
    59034: "晕眩",
    59035: "弹仓0 (自身)",
    59036: "推进增幅",
    59037: "光束涂层",
    59038: "瞬间移动",
    59039: "强制跳跃",
    59040: "修理",
    59041: "防御力下降",
    59042: "攻击力下降",
    59043: "机动力下降",
    59044: "离子爆发模式",
    59045: "阿赖耶识系统限制解除",
    59046: "赛克谬感应",
    59047: "掌心枪",
    59048: "ELS侵蚀"
  };
const WeaponType =["无","近距离","中距离","远距离","浮游","浮游刃"]
const SpecialName = ["无","乱舞必杀","全蛋必杀","地图炮"]
function WeaponImg({weapon}){
    const graypicStyle = {
        filter: 'brightness(0.5)',
      };
    return <img style={graypicStyle} src={weapon.icon+".png"} />
}
function Weapon({weapon, special,infos}){
    let comp = null;
    if(special){
        comp =  <Row><h6>{SpecialName[weapon.weapon_type]}</h6></Row>;
    }else{
        comp = <Row><h6>{weapon.weapon_name}</h6></Row>;
    }
    let tags = [];
    let desc = [];
    
    desc.push(<Col xs='4'><p>攻击力:{weapon.weapon_damage}</p></Col>);
    tags.push(<Badge bg="secondary">{WeaponType[weapon.weapon_type]}</Badge>)
    if(weapon.weapon_type!==1){
        desc.push(<Col xs='4'><p>射程:{weapon.weapon_damage}</p></Col>);
        if(weapon.weapon_type!==2) desc.push(<Col xs='4'><p>子弹速度:{weapon.bullet_speed}</p></Col>);
        desc.push(<Col xs='4'><p>攻击速度:{weapon.attack_speed.toFixed(2)}</p></Col>);
    }else{
        desc.push(<Col xs='4'><p>攻击速度:{weapon.attack_speed.toFixed(2)}</p></Col>);
        
    }
    if(special===false)desc.push(<Col xs='8'><p>判定盒:{weapon.x.toFixed(1)},{weapon.y.toFixed(1)},{weapon.z.toFixed(1)},{weapon.w.toFixed(1)}</p></Col>);
    if(weapon.unknown===3){
        tags.push(<Badge bg="light" text="dark">光束</Badge>)
        //desc.push(<Col xs='4'><p>子弹类型:光束</p></Col>);
    }
    if(weapon.unknown===2){
        tags.push(<Badge bg="light" text="dark">实弹</Badge>)
        //desc.push(<Col xs='4'><p>子弹类型:实弹</p></Col>);
    }
    if(weapon.weapon_type===1){
        desc.push(<Col xs='4'><p>格斗推进:{weapon.melee_thrust===0?"是":"否"}</p></Col>);
    }
    if(special===false) desc.push(<Col xs='4'><p>弹药数量:{weapon.ammo_quantity===0?"无限":weapon.ammo_quantity}</p></Col>);
    if(special===false) desc.push(<Col xs='8'><p>装填类型:{weapon.reload_type===0?"持续装填":"耗尽装填"}</p></Col>);
    if(weapon.ammo_quantity!==0&&special===false) desc.push(<Col xs='6'><p>弹药恢复:{(weapon.ammo_recovery_speed/60).toFixed(1)}秒</p></Col>);
    if(special===false&&weapon.weapon_type!==1) desc.push(<Col xs='4'><p>武器间隔:{weapon.weapon_interval}</p></Col>);
    if(special===false) desc.push(<Col xs='6'><p>倒地值:{weapon.down_1}/{weapon.down_2}</p></Col>);
    if(special===false&&weapon.beam_through===1&&weapon.unknown===3) tags.push( <Badge bg="success">光束穿透</Badge> );
    if(special===false&&weapon.weapon_type!==1&&weapon.can_move===0)tags.push( <Badge bg="danger">定自己 </Badge>);
    if(weapon.effect!==0&&infos["weapon_effects"]!==undefined)
    { 
  
        let sp = infos["weapon_effects"].filter((item)=>item.skill_id == weapon.effect)[0];
        let spComments =[];
        if(sp.object===0) spComments.push("对自己施加");
        else if(sp.object===1) spComments.push("对友方施加");
        else spComments.push("对敌方施加");
        if(sp.duration!==0) spComments.push(""+(sp.duration/60).toFixed(1)+"秒");
        if(sp.move_speed!==0) spComments.push("移动速度"+convertI(sp.move_speed)+",");
        if(sp.thrust_speed!==0) spComments.push("推进速度"+convertI(sp.thrust_speed)+",");
        if(sp.blade_thrust_speed!==0) spComments.push("刀推速度"+convertI(sp.blade_thrust_speed)+",");
        if(sp.maneuverability!==0) spComments.push("机动性"+convertI(sp.maneuverability)+",");
        if(sp.recharge!==0) spComments.push("回气能力"+convertF(sp.recharge-1)+",");
        if(sp.gas_increase_ratio!==0) spComments.push("气槽增加比例"+convertI(sp.gas_increase_ratio)+",");
        if(sp.attack!==0) spComments.push("攻击力"+convertI(sp.attack)+",");
        if(sp.defense!==0) spComments.push("防御力"+convertI(sp.defense)+",");
        if(sp.weapon_1!==0) spComments.push("1号武器装填"+convertF(sp.weapon_1)+",");
        if(sp.weapon_2!==0) spComments.push("2号武器装填"+convertF(sp.weapon_2)+",");
        if(sp.weapon_3!==0) spComments.push("3号武器装填"+convertF(sp.weapon_3)+",");
        if(sp.beam_defense_rate!==0) spComments.push("光束防御率"+convertF(sp.beam_defense_rate)+",");
        if(sp.all_damage_reduction!==0) spComments.push("全伤害减伤"+convertF(sp.all_damage_reduction)+",");
        if(sp.skill_trigger_probability!==0) spComments.push("技能发动概率"+convertI(sp.skill_trigger_probability)+",");
        if(sp.skill_damage_increase!==0) spComments.push("技能增伤"+convertI(sp.skill_damage_increase)+",");
        if(sp.rigid!==0) spComments.push("定身硬直"+convertI(sp.rigid)+",");
        if(sp.special_effect!==0) spComments.push("特殊: "+dictionary[sp.special_effect]+"");
        
        tags.push(
    
        <OverlayTrigger
        key='top'
        placement='top'
        overlay={
            <Tooltip id={`tooltip-top`}>
                <strong>{spComments}</strong>
            </Tooltip>
        }
    >
       <Badge bg="warning" text="dark">{sp.name}</Badge>
    </OverlayTrigger>
    ); 
    }
    return <Row><Col xs='3'><Row><WeaponImg weapon={weapon}/></Row>
    <Row>{tags}</Row>
    </Col><Col xs='9'>{comp}<Row>{desc}</Row></Col></Row>
}
export {Weapon};