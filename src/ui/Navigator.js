import {React, useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button,Badge } from 'react-bootstrap';
const RankName = ['N','C','B','A','S']
const RarityName  = ['无','限制(-)','普通( )','机密(S)','稀有(R)','变色(U)']

function AuthorButton() {
    const handleClick = () => {
      window.open('https://github.com/UBC-Hao/SDGundamDB', '_blank');
    }
  
    return (
      <Button variant="primary" onClick={handleClick}>
        查看源码 <Badge bg="secondary">Multiply</Badge>
        <span className="visually-hidden">unread messages</span>
      </Button>
    );
  }
  

const Navigator = (props) => {
    const [selectedRanks, setSelectedRanks] = useState([]);
    const [selectedRarities, setSelectedRarities] = useState([]);
    const [SearchStr, setSearchStr] = useState("");

    const handleRankChange = (rank) => {
        if (selectedRanks.includes(rank)) {
          setSelectedRanks(selectedRanks.filter((selectedRank) => selectedRank !== rank));
        } else {
          setSelectedRanks([...selectedRanks, rank]);
        }
      };
    
    const handleRarityChange = (rarity) => {
        if (selectedRarities.includes(rarity)) {
            setSelectedRarities(selectedRarities.filter((selectedRarity) => selectedRarity !== rarity));
        } else {
            setSelectedRarities([...selectedRarities, rarity]);
        }
    };

    useEffect(() => {
        props.onSearch(selectedRanks, selectedRarities,SearchStr);
      }, [selectedRanks, selectedRarities, SearchStr]);

    return (
        <div style={{ margin: '1rem 0' }}>
        <Container fluid>
            <Row>
                <Col xs ='10'>
            <Row>
            <Col>
            </Col>
            <Col xs="1"> <Form.Label>名称:</Form.Label></Col>
            <Col xs="6">
            <Form.Control 
                type="text" 
                placeholder="" 
                onChange={(e)=>{setSearchStr(e.target.value)}}
                />
            </Col>
            <Col></Col>
            </Row>
        <Row>
        <Col></Col>
        <Col xs='1'> <Form.Label>级别:</Form.Label></Col>
        <Col xs="6">
         {[1,2,3,4].map((rank,index)=> (
            <Form.Check
            key={"RANK"+index}
            type="checkbox"
            inline
            label={RankName[rank]}
            name="rank"
            onChange={() => handleRankChange(rank)}
            />
        )) }</Col>
        <Col></Col>
        </Row>
        <Row>
        <Col></Col>
        <Col xs='1'> <p>稀有:</p></Col>
        <Col xs="6">
         {[1,2,3,4,5].map((rarity,index)=> (
            <Form.Check
            key={"RARITY"+index}
            type="checkbox"
            inline
            label={RarityName[rarity]}
            name="rarity"
            onChange={() => handleRarityChange(rarity)}
            />
        )) }</Col>
        <Col></Col>
        </Row>
        </Col>
        <Col xs='2'>
        <AuthorButton/>
        </Col>
        </Row>
        </Container>
        </div>
    )
};

export default Navigator;