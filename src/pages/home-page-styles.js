import { css } from "lit-element";

export default css`
  h1 {
    font-size: 1.2rem;
  }

  .cards-container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; 
    gap: 20px;
  }

  .button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px ;
    border-radius: 5px;
    cursor: pointer;
      &:hover {
        background-color: #0056b3;
      }
  }

  .button-disabled {
    padding: 8px 18px;
  }
`