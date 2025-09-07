"use client"

import * as React from "react"
// Removed vaul dependency

import { cn } from "@/lib/utils"

// Placeholder Drawer component (vaul removed)
const Drawer = (props: any) => {
  return <div {...props}>Drawer component placeholder</div>;
};
Drawer.displayName = "Drawer";

// Placeholders for Drawer subcomponents
const DrawerTrigger = (props: any) => <button {...props}>Open Drawer</button>;
const DrawerPortal = (props: any) => <div {...props}>Drawer Portal</div>;
const DrawerClose = (props: any) => <button {...props}>Close Drawer</button>;
const DrawerOverlay = React.forwardRef<any, any>((props, ref) => (
  <div ref={ref} {...props} style={{background: 'rgba(0,0,0,0.8)', position: 'fixed', inset: 0, zIndex: 50}} />
));
DrawerOverlay.displayName = "DrawerOverlay";
const DrawerContent = React.forwardRef<any, any>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <div ref={ref} className={cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className)} {...props}>
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </div>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<any, any>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
DrawerTitle.displayName = "DrawerTitle";
const DrawerDescription = React.forwardRef<any, any>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
