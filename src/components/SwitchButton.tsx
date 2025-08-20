import { ChevronLeft } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';

const SwitchButton = ({
  switchAction
}: {
  switchAction?: () => void
}) => {

  return (
    <Button
        variant={"ghostBorder"}
        size={"icon"}
        onClick={switchAction}
      >
        <ChevronLeft />
      </Button>
  );
};

export default SwitchButton