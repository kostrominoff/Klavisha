"use client";

import Button from "@/components/ui/button";
import { useDeleteInstitution } from "@/hooks/institutions.hooks";

type Props = {
  institutionId: number;
};

const DeleteInstitution = ({ institutionId }: Props) => {
  const { mutate, isLoading } = useDeleteInstitution();
  return (
    <Button
      onClick={() => mutate(institutionId)}
      loading={isLoading}
      variant="secondary"
    >
      Удалить
    </Button>
  );
};

export default DeleteInstitution;
