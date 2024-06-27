// import React, { useState } from 'react';

// const AddArticleForm = ({ onSubmit, closeModal }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [categories, setCategories] = useState('');
//     const [author, setAuthor] = useState('');
//     const [imageUrl, setImageUrl] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const id = new Date().toISOString(); 
//         onSubmit({ id, imageUrl, title, description, categories: categories.split(','), author, pubDate: new Date().toISOString() });
//         setTitle('');
//         setDescription('');
//         setCategories('');
//         setAuthor('');
//         setImageUrl('');
//         closeModal(); 
//         console.log('gres')
//     };

    
//     return (
//         <form onSubmit={handleSubmit} className="add-article-form">
//             <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Article Title *"
//                 required
//                 className="form-input"
//             />
//             <input
//                 type="text"
//                 value={imageUrl}
//                 onChange={(e) => setImageUrl(e.target.value)}
//                 placeholder="Image URL *"
//                 className="form-input"
//                 required
//             />
//             <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Article Description *"
//                 required
//                 className="form-textarea"
//             />
//             <input
//                 type="text"
//                 value={categories}
//                 onChange={(e) => setCategories(e.target.value)}
//                 placeholder="Categories (comma-separated) *"
//                 required
//                 className="form-input"
//             />
//             <input
//                 type="text"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 placeholder="Author *"
//                 required
//                 className="form-input"
//             />
//             <div className="modal-footer">
//                 <button type="button" onClick={closeModal} className="form-button cancel-button">Cancel</button>
//                 <button type="submit" className="form-button">Add</button>
//             </div>
//         </form>
//     );
// };

// export default AddArticleForm;