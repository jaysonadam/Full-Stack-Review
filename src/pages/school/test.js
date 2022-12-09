import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "../../config/axios";

function Addmoreinput() {
  const [ inputList, setInputList ]= useState([{ user_id: '', homework_id: '' }]);

    console.log(inputList)

  const handleInputChange=(e, index)=>{
    const {name, value} = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);

  }
 
  const handleRemove = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  }

  const handleAddClick = () => { 
    setInputList([...inputList, { user_id: '', homework_id: '' }]);
  }

  // Add submit homework with forEach
  // const postResults = () => {

  //   try {
  //     inputList.forEach( async (input) => {
  //     try {
  //       const res = await axios.post('/submit/', {
  //           user_id: input.user_id,
  //           homework_id: input.homework_id
  //       });
        
  //     } catch (error) {
  //       console.log(alert(error.message));
  //     }
  //   })
    
  //   alert('Successfully added')
  //   } catch (error) {
  //     console.log(alert(error.message));
  //   }
  // };

  const postResults = async () => {

    try {
        const formData = new FormData();
        formData.append("input", JSON.stringify(inputList));
        console.log(formData)

        const res = await axios.post('/submit/', formData)
          
        alert('Successfully added')
        } catch (error) {
          console.log(alert(error.message));
    }

  };
  
  return (
    <Container className="content">
     <div className="row">
       <div className="col-sm-12">
         <h5 className="mt-3 mb-4 fw-bold">Dynamically add/remove inputs fields reactjs </h5>
         <button onClick={postResults}>Submit</button>
           
            { 
            inputList.map( (x, i) => {
              return(
              <div className="row mb-3">
                 <div class="form-group col-md-4">
                 <label >Student ID</label>
                  <input type="text" name="user_id" class="form-control" placeholder="Enter Student ID" onChange={ e => handleInputChange(e, i)} />
               </div>
               <div class="form-group col-md-4">
               <label >Homework ID</label>
                  <input type="text" name="homework_id" class="form-control" placeholder="Enter Homework ID" onChange={ e => handleInputChange(e, i) }/>
               </div>
               <div class="form-group col-md-2 mt-4">
               {
                  inputList.length!==1 &&
                  <button className="btn btn-danger mx-1" onClick={()=> handleRemove(i)}>Remove</button>
               }
               { inputList.length-1===i &&
               <button className="btn btn-success" onClick={ handleAddClick }>Add More</button>
               }
               </div>
            </div>
              );
             } )} 
    
       </div>
     </div>
    </Container>
  );

// const [valuesInput, setValuesInput] = useState({
//     title: "",
//     question: [{ text: "", values: "" }],
//     category: "",
//   });

//   console.log(valuesInput)

//   const submitFeedback = (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("feedback_title", valuesInput.title);
//     data.append("feedback_question", valuesInput.question);
//     data.append("kategori_feedback_id", valuesInput.category);

//     // ...
//     // post ke API
//   };

//   return (
//     <form onSubmit={submitFeedback} className="d-flex justify-content-center mt-5">
//       <label>Title</label>
//       <input
//         type="text"
//         value={valuesInput.title}
//         placeholder="title"
//         onChange={(e) => setValuesInput({
//           ...valuesInput,
//           title: e.target.value
//         })}
//       />
//       <label>Category</label>
//       <input
//         type="text"
//         value={valuesInput.category}
//         placeholder="category"
//         onChange={(e) => setValuesInput({
//           ...valuesInput,
//           category: e.target.value
//         })}
//       />
//       {valuesInput.question.map((question, key) => (
//         <div key={key}>
//           <input
//             value={valuesInput.question[key].text}
//             placeholder="Question text"
//             onChange={(e) => setValuesInput({
//               ...valuesInput,
//               question: [...valuesInput.question.map((item, i) => {
//                 if (i === key) {
//                   return {
//                     ...item,
//                     text: e.target.value
//                   }
//                 } else {
//                   return item
//                 }
//               })]
//             })}
//           />
//           <input
//             value={valuesInput.question[key].values}
//             placeholder="Question values"
//             onChange={(e) => setValuesInput({
//               ...valuesInput,
//               question: [...valuesInput.question.map((item, i) => {
//                 if (i === key) {
//                   return {
//                     ...item,
//                     values: e.target.value
//                   }
//                 } else {
//                   return item
//                 }
//               })]
//             })}
//           />
//         </div>
//       ))}
//       <button type="submit">Kirim</button>
//     </form>
//   );
}

export default Addmoreinput;