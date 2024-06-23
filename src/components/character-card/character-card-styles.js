import { css } from "lit-element";

export default css`

.card {
  width: 200px; 
  height: 300px; 
  margin-bottom: 20px; 
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-content-disposition {
  display: flex;
  flex-direction: column;
  height: 100%; 
}

.card-description-container-name{
  font-weight: bold;
  margin-bottom: 10px;
}

.card-description-container{
  margin: 2.5px 0px;
}

.card-image {
  width: 100%;
  height: 200px; 
  overflow: hidden; 
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.card-content {
  padding: 5px;
  // margin: 5px 0px;
  flex: 1; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}

.card-button {
  margin-top: 10px; 
  text-align: center; 
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }

  .button-remove {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #c82333;
    }
  }
`