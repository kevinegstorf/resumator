import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import isEqual from "lodash/isEqual";
import { formatDate } from "../../lib/date";
import Input from "../Input";
import AvatarSelector from "../FormComponents/AvatarSelector";
import { DATE_FIELD_DEFAULT_VALUE } from "../constants";
import EditModalWrapper from "./ModalWrapper";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
import { TooltipIconButton } from "../Material";
import { Section } from "./Section";
// Icons
import CakeIcon from "@material-ui/icons/CakeOutlined";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import EditIcon from "@material-ui/icons/Edit"
import PlaceIcon from "@material-ui/icons/PlaceOutlined";

interface TopSectionProps {
  personalia: {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    dateOfBirth: Date;
  };
  introduction: string;
  onSubmit: (key: string, values: any) => void;
}

const TopSection: FunctionComponent<TopSectionProps> = ({ personalia, introduction, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: { ...personalia },
  });

  const reset = methods.reset;
  const getValues = methods.getValues;

  useEffect(() => {
    if (!isEqual(personalia, getValues())) {
      reset(personalia);
    }
  }, [personalia, getValues, reset]);

  /**
   * Get first and last name.
   * Will return John / Jane Doe if the name is not filled in.
   */
  const getFirstName = () => personalia.firstName ? personalia.firstName : (+personalia.avatar > 4 ? "John" : "Jane");
  const getLastName = () => personalia.lastName ? personalia.lastName : "Doe";

  return (
    <Section>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
        <Box display="flex" flexDirection="row" flex={1}>
          <AvatarWrapper>
            <AvatarImg
              src={getAvatarDataUri(personalia.avatar)}
              alt="Avatar"
            />
          </AvatarWrapper>

          <Box marginRight={2}>
            <Typography variant="h3" align="left">
              {getFirstName()} {getLastName()}
            </Typography>
            <SubInfo>
              <EmailIcon />
              {personalia.email ? personalia.email : "---"}
            </SubInfo>
            <SubInfo>
              <PlaceIcon />
              {personalia.city ? personalia.city : "---"}
            </SubInfo>
            <SubInfo>
              <CakeIcon />
              {personalia.dateOfBirth ? formatDate(personalia.dateOfBirth) : "---"}
            </SubInfo>
          </Box>
        </Box>
        
        <Box display="flex" flexDirection="column" flex={1} marginTop={{ xs: 2, md: 0 }}>
          <Typography variant="h5" align="left">
            About {personalia.firstName}
          </Typography>
          <Typography variant="body2">
            {introduction
              ? introduction
              : `${getFirstName()} has nothing to tell you.`}
          </Typography>
        </Box>
      </Box>
    
      {/* <TooltipIconButton
        tooltip="Edit personal details"
        onClick={() => setIsEditing((prevState) => !prevState)}
      >
        <EditIcon fontSize="small" />
      </TooltipIconButton> */}

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        heading="Personal details"
        onPrimaryActionClicked={() => {
          onSubmit("personalia", methods.getValues());
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          reset();
          setIsEditing(false);
        }}
      >
        <Input
          as={TextField}
          name="email"
          label="Email"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="firstName"
          label="First Name"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="lastName"
          label="Last name"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="city"
          label="City"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={DatePicker}
          control={methods.control}
          rules={{ required: true }}
          onChange={([selected]: any) => {
            return selected;
          }}
          name="dateOfBirth"
          label="Date of birth"
          format="dd/MM/yyyy"
          defaultValue={DATE_FIELD_DEFAULT_VALUE}
        />

        <Input
          as={AvatarSelector}
          name="avatar"
          label="Avatar"
          control={methods.control}
        />
      </EditModalWrapper>
    </Section>
  );
};

const AVATAR_SIZE = 150;
const AvatarWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: ${AVATAR_SIZE}px;
  width: ${AVATAR_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(0, 0, 0, 0.7);
  margin-right: 32px;
`;

const AvatarImg = styled.img`
  width: 60%;
  margin-top: 50%;
  margin-left: 10%;
`;

const SubInfo = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  .MuiSvgIcon-root {
    margin-right: 8px;
  }
`;

export default TopSection;