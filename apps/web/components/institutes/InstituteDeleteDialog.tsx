"use client";

import { useId, useRef, useState } from "react";
import { deleteInstitute } from "@/action/institute";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@workspace/ui/components/button";
import {
  DialogDrawer,
  DialogDrawerBody,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerDescription,
  DialogDrawerFooter,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerTrigger,
} from "@workspace/ui/components/dialog-drawer";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useAction } from "@workspace/ui/hooks/useAction";

interface InstituteDeleteDialogProps {
  instituteId: string;
  instituteName: string;
}

export function InstituteDeleteDialog({
  instituteId,
  instituteName,
}: InstituteDeleteDialogProps) {
  const id = useId();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  const { execute, isLoading } = useAction(deleteInstitute, {
    onSuccess: (data) => {
      toast.success(`Institute ${data.name} deleted successfully`);
      ref.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id: instituteId });
  };

  return (
    <DialogDrawer>
      <DialogDrawerTrigger className="bg-destructive text-destructive-foreground hover:bg-destructive/90 ring-offset-background inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors">
        Delete
      </DialogDrawerTrigger>
      <DialogDrawerContent className="md:max-w-sm">
        <div
          className="border-border mx-auto mt-4 flex size-9 max-w-sm shrink-0 items-center justify-center rounded-full border md:mx-0 md:mt-0"
          aria-hidden="true"
        >
          <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
        </div>
        <DialogDrawerHeader className="mx-auto max-w-sm">
          <DialogDrawerTitle className="text-center md:text-start">
            Delete Institute
          </DialogDrawerTitle>
          <DialogDrawerDescription className="text-center md:text-start">
            This action cannot be undone. To confirm, please enter the institute
            name <span className="text-foreground">{instituteName}</span>
          </DialogDrawerDescription>
        </DialogDrawerHeader>
        <DialogDrawerBody className="mx-auto w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor={id}>Project name</Label>
            <Input
              id={id}
              type="text"
              placeholder="Type Origin UI to confirm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </DialogDrawerBody>
        <DialogDrawerFooter className="mx-auto grid w-full max-w-sm grid-cols-2">
          <DialogDrawerClose asChild>
            <Button
              ref={ref}
              type="button"
              onClick={() => setInputValue("")}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </DialogDrawerClose>
          <Button
            type="button"
            onClick={onDelete}
            variant="destructive"
            className="w-full"
            disabled={inputValue !== instituteName || isLoading}
          >
            Delete
          </Button>
        </DialogDrawerFooter>
      </DialogDrawerContent>
    </DialogDrawer>
  );
}
