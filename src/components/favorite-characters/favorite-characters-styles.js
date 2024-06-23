import { css } from "lit-element";

export default css`

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    overflow: auto;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .close-container{
    margin-bottom: 10px;
  }
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .cards-container {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; 
    gap: 20px;
  }

  .card {
    margin-bottom: 10px;
    padding: 10px;
  }

  .card-image img {
    width: 100%;
    border-radius: 8px;
  }
`

