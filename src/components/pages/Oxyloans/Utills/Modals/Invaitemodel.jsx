import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Upload } from 'feather-icons-react/build/IconComponents';
import { useEffect, useState } from 'react';
// import '../file.css'
import Modal from 'react-bootstrap/Modal';


export default function Invaitemodel() {

    const [lgShow, setLgShow] = useState(true);
    const [UploadFile ,setUploadFile]=useState("")

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first selected file
        setUploadFile(file);
      };

      
 
 useEffect(()=>{
       const form=new FormData();
       const file=UploadFile[0]
       form.append("BULKINVITE",file)
       form.append("content",content)
       
 },[])
      return (
    <div> <Modal
    size="md"
    show={lgShow}
    onHide={() => setLgShow(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
      Upload Your Contact's File to Invite a Friends
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Passport
                                    {/* <span className="star-red">*</span> */}
                                  </p>
                                  <div className="settings-btn">
                                  <input
                                    type="file"
                                    id="file"
                                    name='file'
                                    className="hide-input"
                                    onChange={handleFileChange}
                                  />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>

{UploadFile && UploadFile.name}

                                </div>
        </Modal.Body>
  </Modal></div>
  )
}
