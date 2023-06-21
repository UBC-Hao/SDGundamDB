import React from 'react';
import { Image, Tooltip, OverlayTrigger, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Print.css"

const Print = ({ item , infos, units, changeItem}) => {
    let des = [];
    if (infos["prints"]!==null && infos["prints"].filter((print)=>print.Out===item.mecha_id).length>0){
        let printInfo = infos["prints"].filter((print)=>print.Out===item.mecha_id)[0];
        if (printInfo.IN1!==0){
            let itemC = units.filter((unit)=>printInfo.IN1===unit.mecha_id)[0];
            des.push(<Col xs='2'><div className='imageC'>
                 <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>{itemC.name}</strong>
                    </Tooltip>
                }
                >
                <Image key={itemC.mecha_id} variant="left" src={itemC.standby_image} onClick={()=>changeItem(itemC)} fluid rounded/>
                 </OverlayTrigger>
                </div></Col>)
        } 
        if (printInfo.IN2!==0){
            let itemC = units.filter((unit)=>printInfo.IN2===unit.mecha_id)[0];
            des.push(<Col xs='2'><div className='imageC'>
                 <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>{itemC.name}</strong>
                    </Tooltip>
                }
                >
                <Image key={itemC.mecha_id} variant="left" src={itemC.standby_image} onClick={()=>changeItem(itemC)} fluid rounded/>
                 </OverlayTrigger>
                </div></Col>)
        } 
        if (printInfo.IN3!==0){
            let itemC = units.filter((unit)=>printInfo.IN3===unit.mecha_id)[0];
            des.push(<Col xs='2'><div className='imageC'>
                 <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>{itemC.name}</strong>
                    </Tooltip>
                }
                >
                <Image key={itemC.mecha_id} variant="left" src={itemC.standby_image} onClick={()=>changeItem(itemC)} fluid rounded/>
                 </OverlayTrigger>
                </div></Col>)
        } 
        if (printInfo.IN4!==0){
            let itemC = units.filter((unit)=>printInfo.IN4===unit.mecha_id)[0];
            des.push(<Col xs='2'><div className='imageC'>
                 <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>{itemC.name}</strong>
                    </Tooltip>
                }
                >
                <Image key={itemC.mecha_id} variant="left" src={itemC.standby_image} onClick={()=>changeItem(itemC)} fluid rounded/>
                 </OverlayTrigger>
                </div></Col>)
        } 
        if (printInfo.IN5!==0){
            let itemC = units.filter((unit)=>printInfo.IN5===unit.mecha_id)[0];
            des.push(<Col xs='2'><div className='imageC'>
                 <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>{itemC.name}</strong>
                    </Tooltip>
                }
                >
                <Image key={itemC.mecha_id} variant="left" src={itemC.standby_image} onClick={()=>changeItem(itemC)} fluid rounded/>
                 </OverlayTrigger>
                </div></Col>)
        } 
        
    }
    let des2 = [];

    if (infos["prints"]!==null){
        let visited = [];
        let willVisit = ["IN1","IN2","IN3","IN4","IN5"];
        willVisit.forEach((key)=>{
        infos["prints"].filter((print)=>print[key]===item.mecha_id).forEach((print)=>{
            if (visited[print.Out]===undefined){
            let itemC = units.filter((unit)=>print.Out===unit.mecha_id)[0];
            des2.push(<Col xs='2'><div className='imageC'>
            <OverlayTrigger
           key='top'
           placement='top'
           overlay={
               <Tooltip id={`tooltip-top`}>
                   <strong>{itemC.name}</strong>
               </Tooltip>
           }
           >
           <Image variant="left" src={itemC.standby_image} onClick={()=>changeItem(itemC)} fluid rounded/>
            </OverlayTrigger>
           </div></Col>)
            visited[print.Out]=1;  
         }
        })});
    }

    return (
        <Container>
            {des.length>=1 &&
            <div><Row><h6>合成途径</h6></Row>
            <Row>
            {des}
            </Row><hr/></div>}
            {des2.length>=1 && <div>
            <Row><h6>可用于合成</h6></Row>
            <Row>
            {des2}
            </Row>
            </div>
            }
        </Container>
        
    );
};


export { Print };