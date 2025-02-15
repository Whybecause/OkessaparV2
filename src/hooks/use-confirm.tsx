import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

// Odd way to do but very userful coz hook is reuable easily for all confirmation modals we need
export const useConfirm = (
  title: string,
  message: string
): [() => React.JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => { //eslint-disable-line
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const ConfirmDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-2">
          <div className="flex flex-col md:flex-row gap-2">

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
            variant="outline"
            >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm();
            }}
            >
            Confirm
          </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDialog, confirm];
};
