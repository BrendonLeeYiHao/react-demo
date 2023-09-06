import { MouseEvent, useState } from "react";




function ListGroup() {
  var items = ["New York", "San Franchisco", "Paris"];

  //Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);


  // items = [];
  //   const message = items.length === 0 ? <h3>No Data in List</h3> : null;

  //   const getMessage = () => {
  //     return items.length === 0 ? <h3>No Data in List</h3> : null;
  //   };

  //   if (items.length == 0) {
  //     return (
  //       <>
  //         <h1>List</h1>
  //         {message}
  //         {getMessage()}
  //         <h3>Empty List!</h3>
  //       </>
  //     );
  //   }

  //event handler
    // const handleClick = (event) => console.log(event);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No item found!</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
            key={item}
            onClick={() => {setSelectedIndex(index)}}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
