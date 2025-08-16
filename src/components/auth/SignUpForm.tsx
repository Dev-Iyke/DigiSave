'use client'
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const SignUpForm = ({ setShowForm }: { setShowForm: (c: boolean) => void }) => {
  const [date, setDate] = useState<Date | null>()
  console.log(date)
  return (
    <div>
      <Button size={"icon"} onClick={() => setShowForm(false)}>
        <ChevronLeft />
      </Button>

      <input type="date" defaultValue={date?.toLocaleDateString()} value={date?.toLocaleDateString()} onChange={(e) => setDate(e.target.valueAsDate)}/>
    </div>
  );
};

export default SignUpForm;
