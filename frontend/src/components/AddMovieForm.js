import { useState } from 'react';
import axios from 'axios';

const AddMovieForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        director: '',
        release_year: '',
        genres: '',
        imdb_rating: '',
        cast: '',
        url: '',
        status: 'draft'
    })

    const [confirmDialog, setConfirmDialog] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        const apiEndpoint = formData.status === 'draft' ? '/api/drafts' : '/api/movies';
        try {
            await axios.post(apiEndpoint, formData)
            console.log('Movie added successfully!')
            onSubmit(formData)
            setFormData({
                title: '',
                description: '',
                director: '',
                release_year: '',
                genres: '',
                imdb_rating: '',
                cast: '',
                url: '',
                status: 'draft'
            })
            window.location.reload()
        } catch (error) {
            console.error('Failed to add movie:', error)
        }
    }

    const handleStatusChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        if (value === 'published') {
            setConfirmDialog(true)
        } else {
            setConfirmDialog(false)
        }
    }

    const handleConfirmStatusChange = async () => {
        setConfirmDialog(false)
        await handleSubmit()
    }

    const handleCancelStatusChange = () => {
        setConfirmDialog(false)
    }

    return (
        // <div>
        //     <h3>Add New Movie</h3>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Title:</label>
        //             <input
        //                 type="text"
        //                 name="title"
        //                 value={formData.title}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Description:</label>
        //             <textarea
        //                 name="description"
        //                 value={formData.description}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Director:</label>
        //             <input
        //                 type="text"
        //                 name="director"
        //                 value={formData.director}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Release Year:</label>
        //             <input
        //                 type="number"
        //                 name="release_year"
        //                 value={formData.release_year}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Genres:</label>
        //             <input
        //                 type="text"
        //                 name="genres"
        //                 value={formData.genres}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>imdb:</label>
        //             <input
        //                 type="number"
        //                 name="imdb_rating"
        //                 value={formData.imdb_rating}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Cast:</label>
        //             <input
        //                 type="text"
        //                 name="cast"
        //                 value={formData.cast}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>URL:</label>
        //             <input
        //                 type="text"
        //                 name="url"
        //                 value={formData.url}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Status:</label>
        //             <select
        //                 name="status"
        //                 value={formData.status}
        //                 onChange={handleStatusChange}
        //                 required
        //             >
        //                 <option value="draft">Draft</option>
        //                 <option value="published">Published</option>
        //             </select>
        //         </div>
        <div>
        <div>
        <h2 className='bannernew'>ADMIN DASHBOARD</h2>
   <div className='flex-admin'>
   <div className='modal-content-admin '>
        <p className="text-container-title">Add New Movie</p>
       <form className="text-container-admin" onSubmit={handleSubmit}>
       
           
        
           <div className='form-title-all' >
               <p className="form-title">Title:</p>
               <input 
                   className="form-info-admin form-info-admin2"
                   type="text"
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   required
               />
               </div >
                   <div className='admin-wrap'>
                           <div className='form-title-all'>
                           <p className="form-title">Year:</p>
                           <input
                               className="form-info-admin"
                               type="number"
                               name="release_year"
                               value={formData.release_year}
                               onChange={handleChange}
                               required
                           />
                       </div>

                           <div className='form-title-all'>
                               <p className="form-title"label>Genres:</p>
                               <input
                                   className="form-info-admin "
                                   type="text"
                                   name="genres"
                                   value={formData.genres}
                                   onChange={handleChange}
                                   required
                               />
                           </div>
               <div className='form-title-all'>
                   <p className="form-title">Directed by</p>
                   <input
                       className="form-info-admin "
                       type="text"
                       name="director"
                       value={formData.director}
                       onChange={handleChange}
                       required
                   />
                   </div>
               <div className='form-title-all'>
                   <p className="form-title">imdb:</p>
                   <input
                       className="form-info-admin "
                       type="number"
                       name="imdb_rating"
                       value={formData.imdb_rating}
                       onChange={handleChange}
                       required
                   />
               </div>
               <div className='form-title-all'>
               <p className="form-title">Status:</p>
               <select
                   className="form-info-admin form-info-admin2"
                   name="status"
                   value={formData.status}
                   onChange={handleChange}
                   required
               >
                   <option className="form-info" value="draft">Draft</option>
                   <option className="form-info" value="published">Published</option>
               </select>
           </div>
           </div>
           <div className='form-title-all'>
               <p className="form-title">Cast:</p>
               <input
                   className="form-info-admin form-info-admin2"
                   type="text"
                   name="cast"
                   value={formData.cast}
                   onChange={handleChange}
                   required
               />
           </div>
           <div className='form-title-all'>
               <p className="form-title">URL:</p>
               <input
                   className="form-info-admin form-info-admin2"
                   type="text"
                   name="url"
                   value={formData.url}
                   onChange={handleChange}
                   required
               />
           </div>
           <div className='form-title-all'>
                    <p className="form-title">Description:</p>
                    <textarea 
                        className="form-info-admin form-info-admin2"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                {confirmDialog ? (
                    <div>
                        <p>Are you sure you want to publish the movie?</p>
                        <button  className='admin-submit' type="button" onClick={handleConfirmStatusChange}>Yes</button>
                        <button className='admin-submit' type="button" onClick={handleCancelStatusChange}>No</button>
                    </div>
                ) : (
                    <div>
                        <button className='admin-submit' type="submit" onClick={handleStatusChange}>Add Movie</button>
                    </div>   
                )}
            </form>
        </div>
     </div>
    </div>
   </div>
    )
}

export default AddMovieForm;
