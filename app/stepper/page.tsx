"use client";

import Stepper, { Step } from "./_components/Stepper";

export default function Page() {
  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        console.log(step);
      }}
      onFinalStepCompleted={() => console.log("All steps completed!")}
      backButtonText="Previous"
      nextButtonText="Next"
    >
      <Step>
        <h2>Welcome to the React Bits stepper!</h2>
        <p>Check out the next step!</p>
      </Step>
      <Step>
        <h2>Step 2</h2>
        <img
          style={{
            height: "100px",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center -70px",
            borderRadius: "15px",
            marginTop: "1em",
          }}
          src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
        />
        <p>Custom step content!</p>
      </Step>
      <Step>
        <h2>How about an input?</h2>
      </Step>
      <Step>
        <h2>Final Step</h2>
        <p>You made it!</p>
      </Step>
    </Stepper>
  );
}
