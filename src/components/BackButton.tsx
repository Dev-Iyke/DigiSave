import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import CustomLoader from './CustomLoader';

const BackButton = ({
  startTransition,
  isTransitioning,
  route,
}: {
  startTransition: (f: () => void) => void;
  isTransitioning: boolean;
  route: string;
}) => {
  const router = useRouter();
  return (
    <Button
      variant={"ghostBorder"}
      size={"icon"}
      onClick={() => startTransition(() => router.push(route))}
    >
      {isTransitioning ? <CustomLoader color="gray" /> : <ChevronLeft />}
    </Button>
  );
};

export default BackButton