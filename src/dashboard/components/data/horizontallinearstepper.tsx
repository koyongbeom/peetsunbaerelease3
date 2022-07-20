import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['정기일정 제출', '사감 승인', '학부모 승인'];

export default function HorizontalLinearStepper (props : any) {
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const isStepFailed = (step: number) => {
    return step === props.errorStep;
  };



  return (
    <Box sx={{ width: '100%', marginTop : "24px" }}>
      <Stepper activeStep={props.activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?:boolean;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                승인 거절
              </Typography>
            );
            labelProps.error = true;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                  <span style={{fontFamily : "Apple_B"}}>{label}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
