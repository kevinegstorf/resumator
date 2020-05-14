import React from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";

const PreviewControls = ({ setShowPDFModal, goTo }) => {
  return (
    <TopSide>
      <div>
        <StyledButton
          onClick={() => goTo(`/overview`)}
          variant="contained"
          type="button"
        >
          Back to overview
        </StyledButton>
      </div>

      <div>
        <StyledButton variant="contained" type="button">
          Download
        </StyledButton>
        <StyledButton
          onClick={() => {
            setShowPDFModal(true);
          }}
          variant="contained"
          type="button"
        >
          Preview
        </StyledButton>

        <StyledButton variant="contained" type="button">
          Share
        </StyledButton>
        <StyledButton variant="contained" type="button">
          Save
        </StyledButton>
      </div>
    </TopSide>
  );
};

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const TopSide = styled.div`
  display: flex;
  grid-gap: 8px;
  padding: 16px;
  justify-content: space-between;
`;

export default PreviewControls;
