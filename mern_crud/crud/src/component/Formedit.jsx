
import "../App.css"
const Formedit=({handleSubmit,handleOnChange,handleClose,rest})=>{ //sending props
return(
    <>
      <div className="addcontainer">

<form onSubmit={handleSubmit}>
  <div className="close-btn" onClick={() => handleClose} >*</div>

  <label htmlFor="name">Name:</label>
  <input type="text" id="name" name="name" onChange={handleOnChange}  value={rest.name}/><br />

  <label htmlFor="email">Email:</label>
  <input type="text" id="email" name="email" onChange={handleOnChange}  value={rest.email}/><br />

  <label htmlFor="mobile">Mobile:</label>
  <input type="number" id="mobile" name="mobile" onChange={handleOnChange}   value={rest.mobile}/><br />

  <button className="btn">SUBMIT</button>

</form>

</div>
    
    </>
)


}
export default Formedit