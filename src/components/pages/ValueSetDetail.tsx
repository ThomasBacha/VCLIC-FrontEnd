import React from 'react';
import {Props} from "../../interface/Props.interface.ts";

const ValueSetDetail: React.FC<Props> = ({ valueSet }) => {
  if (!valueSet) return <div>Select a value set to see details.</div>;

  return (
    <div>
      <h2>Details for {valueSet.value_set_name}</h2>
      <p>Medications: {valueSet.medications.replace('|', ', ')}</p>
    </div>
  );
};

export default ValueSetDetail;
