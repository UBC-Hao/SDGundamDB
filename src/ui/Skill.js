import React from 'react';
import { Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Skill.css"

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

function convert(value){
    let tag = "";
    if (value>0){
        tag = "+";
    }
    return tag+(value*100).toFixed(1)+"%";
}
function convertI(value){
    if (value>0){
        return "+"+value;
    }else{
        return value;
    }
}

const Skill = ({ skill,skills,infos }) => {
    let desc = [];
    if (skill.move_speed !== 0) desc.push(<p className='smallfont'>移动速度: {convertI(skill.move_speed)}</p>);
if (skill.thrust_speed !== 0) desc.push(<p className='smallfont'>推进速度: {convertI(skill.thrust_speed)}</p>);
if (skill.blade_thrust_speed !== 0) desc.push(<p className='smallfont'>刀推速度: {convertI(skill.blade_thrust_speed)}</p>);
if (skill.maneuverability !== 0) desc.push(<p className='smallfont'>机动力: {convertI(skill.maneuverability)}</p>);
if (skill.recharge !== 0) desc.push(<p className='smallfont'>回气: {convert(skill.recharge/2)}</p>);
if (skill.thrust_capacity !== 0) desc.push(<p className='smallfont'>推进量: +{(skill.thrust_capacity)}%</p>);
if (skill.attack_change !== 0) desc.push(<p className='smallfont'>攻击力变化: {convertI(skill.attack_change)}</p>);
if (skill.def_change !== 0) desc.push(<p className='smallfont'>防御力变化: {convertI(skill.def_change)}</p>);
if (skill.search_distance !== 0) desc.push(<p className='smallfont'>索敌距离: {convertI(skill.search_distance)}</p>);
if (skill.sp_acceleration !== 0) desc.push(<p className='smallfont'>SP积累加快: {convertI(skill.sp_acceleration)}</p>);

if (skill.special_effect_code !== 0 && infos["effects"]!==undefined){
    let effect = infos["effects"].find((e)=>e.id===skill.special_effect_code);
    
    if (effect.w1_coef_inc !== 0) 
    desc.push(<p className='smallfont'>1号武器系数: {convertI(effect.w1_coef_inc)}</p>);

if (effect.w2_coef_inc !== 0) 
    desc.push(<p className='smallfont'>2号武器系数: {convertI(effect.w2_coef_inc)}</p>);

if (effect.w3_coef_inc !== 0) 
    desc.push(<p className='smallfont'>3号武器系数: {convertI(effect.w3_coef_inc)}</p>);

if (effect.r1_coef_inc !== 0) 
    desc.push(<p className='smallfont'>R1号武器系数: {convertI(effect.r1_coef_inc)}</p>);

if (effect.r2_coef_inc !== 0) 
    desc.push(<p className='smallfont'>R2号武器系数: {convertI(effect.r2_coef_inc)}</p>);

if (effect.r3_coef_inc !== 0) 
    desc.push(<p className='smallfont'>R3号武器系数: {convertI(effect.r3_coef_inc)}</p>);

if (effect.w1_range_inc !== 0) 
    desc.push(<p className='smallfont'>1号武器射程: {convert(effect.w1_range_inc)}</p>);

if (effect.w2_range_inc !== 0) 
    desc.push(<p className='smallfont'>2号武器射程: {convert(effect.w2_range_inc)}</p>);

if (effect.w3_range_inc !== 0) 
    desc.push(<p className='smallfont'>3号武器射程: {convert(effect.w3_range_inc)}</p>);

if (effect.r1_range_inc !== 0) 
    desc.push(<p className='smallfont'>R1号武器射程: {convert(effect.r1_range_inc)}</p>);

if (effect.r2_range_inc !== 0) 
    desc.push(<p className='smallfont'>R2号武器射程: {convert(effect.r2_range_inc)}</p>);

if (effect.r3_range_inc !== 0) 
    desc.push(<p className='smallfont'>R3号武器射程: {convert(effect.r3_range_inc)}</p>);

if (effect.w1_reload_spd !== 0) 
    desc.push(<p className='smallfont'>1号武器装填: {convert(effect.w1_reload_spd)}</p>);

if (effect.w2_reload_spd !== 0) 
    desc.push(<p className='smallfont'>2号武器装填: {convert(effect.w2_reload_spd)}</p>);

if (effect.w3_reload_spd !== 0) 
    desc.push(<p className='smallfont'>3号武器装填: {convert(effect.w3_reload_spd)}</p>);

if (effect.r1_reload_spd !== 0) 
    desc.push(<p className='smallfont'>R1号武器装填: {convert(effect.r1_reload_spd)}</p>);

    if (effect.r2_reload_spd > 0) 
    desc.push(<p className='smallfont'>R2号武器装填: {convert(effect.r2_reload_spd)}</p>);

if (effect.r3_reload_spd > 0) 
    desc.push(<p className='smallfont'>R3号武器装填: {convert(effect.r3_reload_spd)}</p>);

if (effect.w1_atk_spd > 0) 
    desc.push(<p className='smallfont'>1号武器攻速: {convert(effect.w1_atk_spd/2)}</p>);

if (effect.w2_atk_spd > 0) 
    desc.push(<p className='smallfont'>2号武器攻速: {convert(effect.w2_atk_spd/2)}</p>);

if (effect.w3_atk_spd > 0) 
    desc.push(<p className='smallfont'>3号武器攻速: {convert(effect.w3_atk_spd/2)}</p>);

if (effect.r1_atk_spd > 0) 
    desc.push(<p className='smallfont'>R1号武器攻速: {convert(effect.r1_atk_spd/2)}</p>);

if (effect.r2_atk_spd > 0) 
    desc.push(<p className='smallfont'>R2号武器攻速提升: {convert(effect.r2_atk_spd/2)}</p>);

if (effect.r3_atk_spd > 0) 
    desc.push(<p className='smallfont'>R3号武器攻速提升: {convert(effect.r3_atk_spd/2)}</p>);

    
}

if (skill.beam_defense_rate !== 0) desc.push(<p className='smallfont'>对光束防御率: {convert(skill.beam_defense_rate)}</p>);
if (skill.shell_defense_rate !== 0) desc.push(<p className='smallfont'>对实弹防御率: {convert(skill.shell_defense_rate)}</p>);
if (skill.short_distance_damage_reduction !== 0) desc.push(<p className='smallfont'>近距离减伤: {convert(skill.short_distance_damage_reduction)}</p>);
if (skill.medium_distance_damage_reduction !== 0) desc.push(<p className='smallfont'>中距离减伤: {convert(skill.medium_distance_damage_reduction)}</p>);
if (skill.long_distance_damage_reduction !== 0) desc.push(<p className='smallfont'>远距离减伤: {convert(skill.long_distance_damage_reduction)}</p>);
if (skill.total_damage_reduction !== 0) desc.push(<p className='smallfont'>全减伤: {convert(skill.total_damage_reduction)}</p>);
if (skill.knockdown_increase !== 0) desc.push(<p className='smallfont'>倒地值增加: +{(1250*skill.knockdown_increase).toFixed(1)}</p>);
if (skill.skill_probability !== 0) desc.push(<p className='smallfont'>技能发动概率: {(skill.skill_probability)}</p>);
if (skill.damage_increase_melee != 0) desc.push(<p className='smallfont'>近战伤害增加量: +{(skill.damage_increase_melee)}</p>);

if (skill.special_buff !== 0) desc.push(<p className='smallfont'>特殊: {dictionary[skill.special_buff]}</p>);
if (skill.is_team_aura !== 0) desc.push(<p className='smallfont'>是否是团队光环: {skill.is_team_aura===1?"是":"否"}</p>);
if (skill.linked_skill !== 0){
    let skill2 = skills.find((s)=>s.skill_id===skill.linked_skill);
    desc.push(<p className='smallfont'>关联技能:<SkillMiniDetailed skill={skill2} infos={infos} fluid/></p>);
} 

    return (
        <div className="skill">
            <Row>
            <Col xs='2'><Image src={"skillicon/"+skill.skill_icon_number+".png"} />
            </Col>

            <Col xs='10'>
                <Row>
            <h6>{skill.name}</h6>
            <p>{skill.skill_description}</p></Row>
            <Row>{desc.map((d) => <Col xs='3'>{d}</Col>)}
            </Row>
            </Col>

            </Row>
            <hr />
        </div>
    );
};

const SkillMini = ({ skill }) => {
    return (
        <OverlayTrigger
            key='top'
            placement='top'
            overlay={
                <Tooltip id={`tooltip-top`}>
                    <strong>{skill.skill_description}</strong>
                </Tooltip>
            }
        >
            <Image src={"skillicon/"+skill.skill_icon_number+".png"}  fluid/>
        </OverlayTrigger>
    );
};

const SkillMiniDetailed = ({ skill ,infos}) => {
    let desc = [];
    if (skill.move_speed !== 0) desc.push(<p className='smallfont'>移动速度: {convertI(skill.move_speed)}</p>);
    if (skill.thrust_speed !== 0) desc.push(<p className='smallfont'>推进速度: {convertI(skill.thrust_speed)}</p>);
    if (skill.blade_thrust_speed !== 0) desc.push(<p className='smallfont'>刀推速度: {convertI(skill.blade_thrust_speed)}</p>);
    if (skill.maneuverability !== 0) desc.push(<p className='smallfont'>机动力: {convertI(skill.maneuverability)}</p>);
    if (skill.recharge !== 0) desc.push(<p className='smallfont'>回气: {convert(skill.recharge/2)}</p>);
    if (skill.thrust_capacity !== 0) desc.push(<p className='smallfont'>推进量: +{(skill.thrust_capacity)}%</p>);
    if (skill.attack_change !== 0) desc.push(<p className='smallfont'>攻击力变化: {convertI(skill.attack_change)}</p>);
    if (skill.def_change !== 0) desc.push(<p className='smallfont'>防御力变化: {convertI(skill.def_change)}</p>);
    if (skill.search_distance !== 0) desc.push(<p className='smallfont'>索敌距离: {convertI(skill.search_distance)}</p>);
    if (skill.sp_acceleration !== 0) desc.push(<p className='smallfont'>SP积累加快: {convertI(skill.sp_acceleration)}</p>);
    
    if (skill.special_effect_code !== 0 && infos["effects"]!==undefined){
        let effect = infos["effects"].find((e)=>e.id===skill.special_effect_code);
        
        if (effect.w1_coef_inc !== 0) 
        desc.push(<p className='smallfont'>1号武器系数: {convertI(effect.w1_coef_inc)}</p>);
    
    if (effect.w2_coef_inc !== 0) 
        desc.push(<p className='smallfont'>2号武器系数: {convertI(effect.w2_coef_inc)}</p>);
    
    if (effect.w3_coef_inc !== 0) 
        desc.push(<p className='smallfont'>3号武器系数: {convertI(effect.w3_coef_inc)}</p>);
    
    if (effect.r1_coef_inc !== 0) 
        desc.push(<p className='smallfont'>R1号武器系数: {convertI(effect.r1_coef_inc)}</p>);
    
    if (effect.r2_coef_inc !== 0) 
        desc.push(<p className='smallfont'>R2号武器系数: {convertI(effect.r2_coef_inc)}</p>);
    
    if (effect.r3_coef_inc !== 0) 
        desc.push(<p className='smallfont'>R3号武器系数: {convertI(effect.r3_coef_inc)}</p>);
    
    if (effect.w1_range_inc !== 0) 
        desc.push(<p className='smallfont'>1号武器射程: {convert(effect.w1_range_inc)}</p>);
    
    if (effect.w2_range_inc !== 0) 
        desc.push(<p className='smallfont'>2号武器射程: {convert(effect.w2_range_inc)}</p>);
    
    if (effect.w3_range_inc !== 0) 
        desc.push(<p className='smallfont'>3号武器射程: {convert(effect.w3_range_inc)}</p>);
    
    if (effect.r1_range_inc !== 0) 
        desc.push(<p className='smallfont'>R1号武器射程: {convert(effect.r1_range_inc)}</p>);
    
    if (effect.r2_range_inc !== 0) 
        desc.push(<p className='smallfont'>R2号武器射程: {convert(effect.r2_range_inc)}</p>);
    
    if (effect.r3_range_inc !== 0) 
        desc.push(<p className='smallfont'>R3号武器射程: {convert(effect.r3_range_inc)}</p>);
    
    if (effect.w1_reload_spd !== 0) 
        desc.push(<p className='smallfont'>1号武器装填: {convert(effect.w1_reload_spd)}</p>);
    
    if (effect.w2_reload_spd !== 0) 
        desc.push(<p className='smallfont'>2号武器装填: {convert(effect.w2_reload_spd)}</p>);
    
    if (effect.w3_reload_spd !== 0) 
        desc.push(<p className='smallfont'>3号武器装填: {convert(effect.w3_reload_spd)}</p>);
    
    if (effect.r1_reload_spd !== 0) 
        desc.push(<p className='smallfont'>R1号武器装填: {convert(effect.r1_reload_spd)}</p>);
    
        if (effect.r2_reload_spd > 0) 
        desc.push(<p className='smallfont'>R2号武器装填: {convert(effect.r2_reload_spd)}</p>);
    
    if (effect.r3_reload_spd > 0) 
        desc.push(<p className='smallfont'>R3号武器装填: {convert(effect.r3_reload_spd)}</p>);
    
    if (effect.w1_atk_spd > 0) 
        desc.push(<p className='smallfont'>1号武器攻速: {convert(effect.w1_atk_spd/2)}</p>);
    
    if (effect.w2_atk_spd > 0) 
        desc.push(<p className='smallfont'>2号武器攻速: {convert(effect.w2_atk_spd/2)}</p>);
    
    if (effect.w3_atk_spd > 0) 
        desc.push(<p className='smallfont'>3号武器攻速: {convert(effect.w3_atk_spd/2)}</p>);
    
    if (effect.r1_atk_spd > 0) 
        desc.push(<p className='smallfont'>R1号武器攻速: {convert(effect.r1_atk_spd/2)}</p>);
    
    if (effect.r2_atk_spd > 0) 
        desc.push(<p className='smallfont'>R2号武器攻速提升: {convert(effect.r2_atk_spd/2)}</p>);
    
    if (effect.r3_atk_spd > 0) 
        desc.push(<p className='smallfont'>R3号武器攻速提升: {convert(effect.r3_atk_spd/2)}</p>);
    
        
    }
    
    if (skill.beam_defense_rate !== 0) desc.push(<p className='smallfont'>对光束防御率: {convert(skill.beam_defense_rate)}</p>);
    if (skill.shell_defense_rate !== 0) desc.push(<p className='smallfont'>对实弹防御率: {convert(skill.shell_defense_rate)}</p>);
    if (skill.short_distance_damage_reduction !== 0) desc.push(<p className='smallfont'>近距离减伤: {convert(skill.short_distance_damage_reduction)}</p>);
    if (skill.medium_distance_damage_reduction !== 0) desc.push(<p className='smallfont'>中距离减伤: {convert(skill.medium_distance_damage_reduction)}</p>);
    if (skill.long_distance_damage_reduction !== 0) desc.push(<p className='smallfont'>远距离减伤: {convert(skill.long_distance_damage_reduction)}</p>);
    if (skill.total_damage_reduction !== 0) desc.push(<p className='smallfont'>全减伤: {convert(skill.total_damage_reduction)}</p>);
    if (skill.knockdown_increase !== 0) desc.push(<p className='smallfont'>倒地值增加: +{(1250*skill.knockdown_increase).toFixed(1)}</p>);
    if (skill.skill_probability !== 0) desc.push(<p className='smallfont'>技能发动概率: {(skill.skill_probability)}</p>);
    if (skill.damage_increase_melee != 0) desc.push(<p className='smallfont'>近战伤害增加量: +{(skill.damage_increase_melee)}</p>);
    if (skill.special_buff !== 0) desc.push(<p className='smallfont'>特殊: {dictionary[skill.special_buff]}</p>);
    //if (skill.is_team_aura !== 0) desc.push(<p className='smallfont'>是否是团队光环: {skill.is_team_aura===1?"是":"否"}</p>);
    if (desc.length===0) return <>{skill.skill_id}</>;
    return (
        <OverlayTrigger
            key='top'
            placement='top'
            overlay={
                <Tooltip id={`tooltip-top`}>
                    {desc}
                </Tooltip>
            }
        >
            <Image src={"skillicon/"+skill.skill_icon_number+".png"}  fluid/>
        </OverlayTrigger>
    );
};


export { Skill, SkillMini };