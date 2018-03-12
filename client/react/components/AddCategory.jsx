import React from 'react';
import './AddProduct.css';

export default props => {
  return (
    <div className="container addProduct-margin">
      <form onSubmit={props.submitForm}>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Add Category</label>
          <input
            name="name"
            value={props.name}
            type="text"
            onChange={props.handleChange}
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Category Name"
          />
        </div>
        <button type="submit" className="btn btn-secondary btn-lg">
          Submit
        </button>
      </form>
    </div>
  );
};
