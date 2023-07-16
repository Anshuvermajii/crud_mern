import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import axios from "axios"
import Formedit from "./component/Formedit";

axios.defaults.baseURL = "http://localhost:8080/"

 function App() {

  const [addSection, setAddsection] = useState(false)//for the pop-up form
  const [edit, setEdit] = useState(false)//or the pop-up form

  const [formData, setformData] = useState({ // create data


    name: "",
    email: "",
    mobile: "",


  })
  // edit state 
  const [formDataEdit, setformDataEdit] = useState({


    name: "",
    email: "",
    mobile: "",
    _id: ""


  })

  const [dataList, setDataList] = useState('')//show data in list

  //handle on change
  const handleOnChange = (e) => {

    const { value, name } = e.target
    setformData((preve) => {
      return {

        ...preve,
        [name]: value
      }
    })

  }

  //handle submit
    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.success) {

      setAddsection(false)
      alert(data.data.message)
      getFetchData()

      setformData({
        name: "",
        email: "",
        mobile: ""

      })


    }


  }
  //show all data in list
  const getFetchData = async () => {


  const data = await axios.get("/")
  console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)


    }


  }
  //show Data
  useEffect(() => {
    getFetchData()

  }, [])

  //delete method
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    alert(data.data.message)
    if (data.data.success) {

      getFetchData()
    }
  }
  //update method
  const handleUpdate = async (e) => {
    e.preventDefault()

    const data = await axios.put("/update/", formDataEdit)
    alert(data.data.message)
    if (data.data.success) {
      setEdit(false)
      getFetchData()
      setformDataEdit({
        name: "",
        email: "",
        mobile: ""

      })

    }

  }

  //handle change form data
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target
    setformDataEdit((preve) => {
      return {

        ...preve,
        [name]: value
      }
    })
  }
  //handle edit form
  const handleEdit = (el) => {
    setformDataEdit(el)
    setEdit(true)
  }







  return (
    <>
      <div className="container">


        <button className="btn btn-add " onClick={() => setAddsection(true)} >Add</button>

        {
          addSection && (
            <>
              <Formedit
                handleSubmit={handleSubmit}
                handleOnChange={handleOnChange}         //props
                handleClose={() => setAddsection(false)}
                rest={formData}
              />

            </>
          )}
    

        {

          edit && (
            <>
              <Formedit
                handleSubmit={handleUpdate}
                handleOnChange={handleEditOnChange}
                handleClose={() => setEdit(false)}
                rest={formDataEdit}

              />

            </>

          )

        }



        <div className="tableContainer">

          <table className="table table-borderd ">

            <thead>
              <tr>
                <th>Name:
                </th>
                <th>Email:
                </th>
                <th>Mobile:

                </th>
                <th>Action</th>

              </tr>

            </thead>
            <tbody>

              {
                dataList[0] ? (
                  dataList &&
                  dataList.map((el) => {
                    console.log(el)
                    return (
                      <tr key={el._id}>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.mobile}</td>
                        <td><button style={Clr} onClick={(() => { handleEdit(el) }


                        )}>Edit</button>
                          <button style={{ color: "red" }} onClick={(() => { handleDelete(el._id) })} >Delete</button>

                        </td>

                      </tr>

                    )

                  }))

                  : (
                    <p>NO DATA </p>
                  )}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
}
const Clr = {

  backgroundColor: "orange",
  color: "white"

}

export default App;
