import React from 'react';
import AddArticleForm from '../../AddArticleForm';
import './AddArticleModal.css';

const AddArticleModal = ({ closeModal, handleAddArticle }) => {
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-active" onClick={(e) => e.stopPropagation()}>
                <div className="modal-close" onClick={closeModal}>&times;</div>
                <div className="modal-window">
                    <h2>Add New Article</h2>
                    <AddArticleForm onSubmit={handleAddArticle} closeModal={closeModal} />
                </div>
            </div>
        </div>
    );
};

export default AddArticleModal;
