import {React,useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import ReactPaginate from 'react-paginate';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UnitCard from './UnitCard';
import Spinner from 'react-bootstrap/Spinner';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';




function Items({ currentItems, skills,units, weapons, infos}) {
  return (
    <Row>
      {currentItems &&
        currentItems.map((item) => (
          <Col xs='12' md='4' sm='6' key={item.mecha_id}>
            <UnitCard item={item} skills={skills} units={units} weapons={weapons} infos={infos}/>
          </Col>
        ))}
    </Row>
  );
}



function PaginatedItems({ itemsPerPage, results, skills, units, weapons, infos}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  let currentItems2 = results.slice(itemOffset, endOffset);
  if (itemOffset>=endOffset || itemOffset>results.length){
    currentItems2 = results.slice(0, itemsPerPage);
  }
  const currentItems = currentItems2;
  const pageCount = Math.ceil(results.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % results.length;
    setItemOffset(newOffset);
  };

  return (

    <Container>
      
      <Items key={"p"+itemOffset+"ages"+pageCount} currentItems={currentItems}  skills={skills} units={units} weapons={weapons} infos={infos}/>
     <Row><Col></Col>
     <Col>
      <ReactPaginate
      key={"pagination"+pageCount}
  breakLabel="..."
  nextLabel="N>"
  onPageChange={handlePageClick}
  pageRangeDisplayed={5}
  pageCount={pageCount}
  previousLabel="<P"
  renderOnZeroPageCount={null}
  containerClassName={'pagination'}
  pageClassName={'page-item'}
  pageLinkClassName={'page-link'}
  activeClassName={'active'}
  nextClassName={'page-item'}
  nextLinkClassName={'page-link'}
  previousClassName={'page-item'}
  previousLinkClassName={'page-link'}
  breakClassName={'page-item'}
  breakLinkClassName={'page-link'}
/></Col>
<Col></Col>
</Row>
</Container>
  );
}

const UnitsList = (props) => (
  (props.units!==null && props.skills!==null)?
  <Container>
    <PaginatedItems itemsPerPage={24} results={props.results === null ? [] : props.results} skills={props.skills} units={props.units} weapons={props.weapons} infos={props.infos}/>
  </Container>:<Container><Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></Container>
);




export default UnitsList;