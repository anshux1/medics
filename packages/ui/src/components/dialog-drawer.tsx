"use client";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import { useMediaQuery } from "@workspace/ui/hooks/useMediaQuery";
import { cn } from "@workspace/ui/lib/utils";

interface BaseProps {
  children: React.ReactNode;
}

interface RootDialogDrawerProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogDrawerProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 768px)";

const DialogDrawer = ({ children, ...props }: RootDialogDrawerProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DialogDrawer = isDesktop ? Dialog : Drawer;

  return <DialogDrawer {...props}>{children}</DialogDrawer>;
};

const DialogDrawerTrigger = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DialogDrawerTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <DialogDrawerTrigger className={className} {...props}>
      {children}
    </DialogDrawerTrigger>
  );
};

const DialogDrawerClose = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DialogDrawerClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <DialogDrawerClose className={className} {...props}>
      {children}
    </DialogDrawerClose>
  );
};

const DialogDrawerContent = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DialogDrawerContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <DialogDrawerContent className={className} {...props}>
      {children}
    </DialogDrawerContent>
  );
};

const DialogDrawerDescription = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DialogDrawerDescription = isDesktop
    ? DialogDescription
    : DrawerDescription;

  return (
    <DialogDrawerDescription className={className} {...props}>
      {children}
    </DialogDrawerDescription>
  );
};

const DialogDrawerHeader = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DialogDrawerHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <DialogDrawerHeader className={className} {...props}>
      {children}
    </DialogDrawerHeader>
  );
};

const DialogDrawerTitle = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DialogDrawerTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <DialogDrawerTitle className={className} {...props}>
      {children}
    </DialogDrawerTitle>
  );
};

const DialogDrawerBody = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const DialogDrawerFooter = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DialogDrawerFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <DialogDrawerFooter className={className} {...props}>
      {children}
    </DialogDrawerFooter>
  );
};

export {
  DialogDrawer,
  DialogDrawerTrigger,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerDescription,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerBody,
  DialogDrawerFooter,
};
